#!/usr/bin/env python3
"""Compile lore/*.md into lore.js for index.html.

    python3 build.py                   build once
    python3 build.py --watch           rebuild whenever a lore file changes
    python3 build.py --serve           build, then host the site for phones/laptops on your LAN
    python3 build.py --serve --watch   both (handy while editing lore at the table)

--serve options:
    --port N    port to listen on (default 8000)
    --local     only this computer (127.0.0.1), not the rest of the network

Each .md file may start with a frontmatter block of `key: value` lines between
`---` fences. lore/premise.md is the intro page; every other file is a
character whose id is the filename (lore/leper.md -> index.html#/leper).
lore/dm-notes.md is the DM-only notes page (index.html#/dm-notes).
Files starting with "_" (like lore/_template.md) are skipped.
Anything below a `## Secret` heading is hidden on the page behind a reveal toggle.
A `summary:` line (a sentence or two, public lore only) is shown on the relationships page.

homebrew/<id>.md holds custom (sub)class features for that character; see
homebrew/_template.md for the format. They're public, never encrypted.

Two characters are related when either one's lore names the other ("the Squire"). The
relationships page draws a solid line if the mention is in public lore, dashed if it's only
in a secret. Which characters are linked is public; what the secret says stays encrypted.

Secrets and the DM notes are encrypted (AES-GCM) before they go into lore.js:
each can be unlocked with that character's password or the DM master password,
both kept in passwords.json (created with random passwords on first build; never served).

With --serve, friends can rank their top 3 characters from the home page. Ballots are
stored in votes.db (SQLite, never served); one per name, and resubmitting replaces it.
    POST /api/vote     {"name": ..., "picks": [id1, id2, id3]}
    GET  /api/voters   names of everyone who has voted
    POST /api/results  {"password": <DM master>} -> point totals (3/2/1) and every ballot

--serve also hosts the prowl clock: clock.html is the players' display (put it on the TV),
clock-dm.html is the DM's control page (unlocked with the DM master password).
    GET  /api/clock    the clock's state
    POST /api/clock    {"password": <DM master>, "action": "set" | "start" | "pause" | "tick" | "reset" | "status", ...}
With --soundboard URL, its tick and breach sounds go through the tabletop soundboard
(POST URL/api/pad {"id": "prowl-tick" | "prowl-breach"}); if that's unset or unreachable,
the display page plays its own.
"""
import argparse
import base64
import os
import secrets
import functools
import hashlib
import hmac
import json
import re
import socket
import sqlite3
import threading
import time
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

import markdown
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

ROOT = Path(__file__).parent
LORE = ROOT / "lore"
HOMEBREW = ROOT / "homebrew"
OUT = ROOT / "lore.js"
SECRET = re.compile(r"^##\s*Secret\s*$", re.M | re.I)
PASSWORDS = ROOT / "passwords.json"
PBKDF2_ITERATIONS = 200_000
VOTES_DB = ROOT / "votes.db"

WORDS = """candle raven thorn lantern hollow moth bramble crow ember ash bone grave
wick hemlock thistle owl cellar spire rook fog mire willow nettle cauldron
lichen tallow omen vesper briar marrow pyre cinder gloam yew sexton acorn
sparrow wolf moon sap root barrow tomb lamp vigil hush shroud""".split()


def frontmatter(text):
    """Split `key: value` lines between leading `---` fences from the rest of the file."""
    meta = {}
    if text.startswith("---"):
        _, front, text = text.split("---", 2)
        for line in front.strip().splitlines():
            if ":" in line:
                key, value = line.split(":", 1)
                meta[key.strip()] = value.strip()
    return meta, text


def parse(path):
    meta, text = frontmatter(path.read_text(encoding="utf-8"))
    body, secret = (SECRET.split(text, maxsplit=1) + [""])[:2]
    meta["html"] = render(body)
    if secret.strip():
        meta["secret"] = render(secret)
    return meta


def render(md):
    return markdown.markdown(md.strip(), extensions=["smarty", "tables"])


# Where a homebrew feature shows up on the sheet: `section:` value -> characters.js list.
SECTIONS = {"attack": "attacks", "action": "actions", "bonus action": "bonusActions", "reaction": "reactions", "trait": "feats"}
FEATURE = re.compile(r"^##\s+(.+?)\s*$", re.M)
TAG = re.compile(r"^(level|section|uses|replaces|hit|damage)\s*:\s*(.+?)\s*$", re.I)
USES = re.compile(r"^(\d+)\s*/\s*(short|long)(?: rest)?$", re.I)


def parse_homebrew(path):
    """A homebrew file: frontmatter (name, class), an optional intro, then one `## Feature`
    per feature. Each feature starts with tag lines, then its description in markdown:
        level: 3                       character level it's gained at (required)
        section: bonus action          attack | action | bonus action | reaction | trait (default trait)
        hit: 7    damage: 1d6+4 fire   attacks only (each on its own line); hit can be text, e.g. DC 15
        uses: 2 / short rest           adds a resource tracker named after the feature
        replaces: Manifest Echo        hides an imported feature, attack, resource or item with this
                                       name (comma-separate several); "Spellcasting" drops the spell list"""
    meta, text = frontmatter(path.read_text(encoding="utf-8"))
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    intro, *parts = FEATURE.split(text)
    features = []
    for name, body in zip(parts[::2], parts[1::2]):
        where = f"{path.name}, '{name}'"
        lines = body.strip().splitlines()
        tags = {}
        while lines and (m := TAG.match(lines[0])):
            tags[m[1].lower()] = m[2]
            lines.pop(0)
        if not tags.get("level", "").isdigit():
            raise ValueError(f"{where}: needs a `level: N` line")
        section = tags.get("section", "trait").lower()
        if section not in SECTIONS:
            raise ValueError(f"{where}: section must be one of {', '.join(SECTIONS)}")
        feature = {"name": name, "level": int(tags["level"]), "section": SECTIONS[section], "html": render("\n".join(lines))}
        if section == "attack":
            if not ("hit" in tags and "damage" in tags):
                raise ValueError(f"{where}: attacks need `hit:` and `damage:` lines")
            feature["hit"] = int(tags["hit"]) if re.fullmatch(r"[+-]?\d+", tags["hit"]) else tags["hit"]
            feature["damage"] = tags["damage"]
        if "uses" in tags:
            if not (m := USES.match(tags["uses"])):
                raise ValueError(f"{where}: uses should look like `2 / short rest` or `1 / long rest`")
            feature["uses"] = {"max": int(m[1]), "recharge": m[2].lower()}
        if "replaces" in tags:
            feature["replaces"] = [r.strip() for r in tags["replaces"].split(",") if r.strip()]
        features.append(feature)
    features.sort(key=lambda f: f["level"])
    return {"name": meta.get("name", ""), "class": meta.get("class", ""), "html": render(intro), "features": features}


def b64(data):
    return base64.b64encode(data).decode()


def new_password():
    return "-".join(secrets.SystemRandom().sample(WORDS, 3))


def load_passwords(character_ids):
    """Read passwords.json, adding a random password for anything missing."""
    data = json.loads(PASSWORDS.read_text()) if PASSWORDS.exists() else {}
    changed = not PASSWORDS.exists()
    if not data.get("master"):
        data["master"], changed = new_password(), True
    chars = data.setdefault("characters", {})
    for cid in character_ids:
        if not chars.get(cid):
            chars[cid], changed = new_password(), True
    if changed:
        PASSWORDS.write_text(json.dumps(data, indent=2) + "\n")
        print(f"wrote new passwords to {PASSWORDS.name}")
    return data


def encrypt(html, passwords):
    """Encrypt html with a random key, then wrap that key once per (who, password)."""
    key = AESGCM.generate_key(bit_length=256)
    iv = os.urandom(12)
    slots = []
    for who, password in passwords:
        salt, wrap_iv = os.urandom(16), os.urandom(12)
        kek = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, PBKDF2_ITERATIONS, 32)
        slots.append({"who": who, "salt": b64(salt), "iv": b64(wrap_iv), "key": b64(AESGCM(kek).encrypt(wrap_iv, key, None))})
    return {"iter": PBKDF2_ITERATIONS, "iv": b64(iv), "ct": b64(AESGCM(key).encrypt(iv, html.encode(), None)), "slots": slots}


def character_ids():
    return [p.stem for p in sorted(LORE.glob("*.md")) if p.stem not in ("premise", "dm-notes") and not p.stem.startswith("_")]


def relations(characters):
    """Pairs of characters whose lore names each other: [{"a", "b", "secret"}], where
    secret is true when every mention is below a `## Secret` heading."""
    def mentions(html, name):
        core = re.sub(r"^the\s+", "", name, flags=re.I)
        text = re.sub(r"<!--.*?-->", "", html, flags=re.S)  # skip design notes
        return re.search(rf"\b[Tt]he\s+{re.escape(core)}\b", text) is not None
    found = {}
    for cid, c in characters.items():
        for other, o in characters.items():
            if other == cid:
                continue
            pair = tuple(sorted((cid, other)))
            if mentions(c["html"], o["name"]):
                found[pair] = False
            elif mentions(c.get("secret", ""), o["name"]):
                found.setdefault(pair, True)
    return [{"a": a, "b": b, "secret": secret} for (a, b), secret in sorted(found.items())]


def build():
    premise = parse(LORE / "premise.md")
    notes_path = LORE / "dm-notes.md"
    notes = parse(notes_path) if notes_path.exists() else None
    characters = {cid: parse(LORE / f"{cid}.md") for cid in character_ids()}

    rels = relations(characters)  # before the secrets are encrypted

    # Replace every plaintext secret (and the DM notes) with its encrypted form.
    pw = load_passwords([cid for cid, c in characters.items() if "secret" in c])
    for cid, c in characters.items():
        if "secret" in c:
            c["secret"] = encrypt(c["secret"], [("character", pw["characters"][cid]), ("master", pw["master"])])
    if notes:
        notes["html"] = encrypt(notes["html"], [("master", pw["master"])])

    homebrew = {p.stem: parse_homebrew(p) for p in sorted(HOMEBREW.glob("*.md")) if not p.stem.startswith("_")}
    for cid in homebrew.keys() - characters.keys():
        print(f"warning: homebrew/{cid}.md has no matching lore/{cid}.md")

    data = {"premise": premise, "dmNotes": notes, "characters": characters, "relations": rels, "homebrew": homebrew}
    OUT.write_text(
        "// GENERATED by build.py from lore/*.md. Do not edit by hand.\n"
        f"const LORE = {json.dumps(data, indent=2, ensure_ascii=False)};\n",
        encoding="utf-8",
    )
    print(f"{time.strftime('%H:%M:%S')}  built lore.js ({len(characters)} characters, {len(homebrew)} homebrew)")


def snapshot():
    files = [*LORE.glob("*.md"), *HOMEBREW.glob("*.md"), *([PASSWORDS] if PASSWORDS.exists() else [])]
    return {p: p.stat().st_mtime for p in files}


def lan_ip():
    """This machine's address on the local network (no packets are actually sent)."""
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        try:
            s.connect(("10.255.255.255", 1))
            return s.getsockname()[0]
        except OSError:
            return None


# Only the files the site needs are served. Everything else (lore/*.md with the
# secrets in plain text, character sheet PDFs, build.py, .git) gets a 404.
PUBLIC_FILES = {"/", "/index.html", "/style.css", "/lore.js", "/characters.js", "/spells.js", "/party.js",
                "/clock.html", "/clock-dm.html"}
PUBLIC_DIRS = ("/character images/",)


# ---------- voting ----------
db_lock = threading.Lock()


def db():
    conn = sqlite3.connect(VOTES_DB)
    conn.execute("""CREATE TABLE IF NOT EXISTS votes (
        name_key TEXT PRIMARY KEY, name TEXT NOT NULL,
        first TEXT NOT NULL, second TEXT NOT NULL, third TEXT NOT NULL,
        submitted TEXT NOT NULL)""")
    return conn


def record_vote(body):
    """Validate a ballot and store it, replacing any earlier ballot under the same name."""
    name = " ".join(str(body.get("name", "")).split())[:40]
    picks = body.get("picks")
    valid = set(character_ids())
    if not name:
        return 400, {"error": "Please enter your name."}
    if not (isinstance(picks, list) and len(picks) == 3 and all(p in valid for p in picks)):
        return 400, {"error": "Please pick three characters."}
    if len(set(picks)) != 3:
        return 400, {"error": "Pick three different characters."}
    with db_lock, db() as conn:
        replaced = conn.execute("SELECT 1 FROM votes WHERE name_key = ?", (name.casefold(),)).fetchone() is not None
        conn.execute("INSERT OR REPLACE INTO votes VALUES (?, ?, ?, ?, ?, ?)",
                     (name.casefold(), name, *picks, time.strftime("%Y-%m-%d %H:%M")))
    return 200, {"ok": True, "replaced": replaced}


def voter_names():
    with db() as conn:
        return [r[0] for r in conn.execute("SELECT name FROM votes ORDER BY submitted, name")]


def is_dm(body):
    master = json.loads(PASSWORDS.read_text()).get("master", "") if PASSWORDS.exists() else ""
    return bool(master) and hmac.compare_digest(str(body.get("password", "")), master)


def results(body):
    if not is_dm(body):
        return 403, {"error": "That's not the DM password."}
    with db() as conn:
        rows = conn.execute("SELECT name, first, second, third, submitted FROM votes ORDER BY submitted").fetchall()
    tally = {cid: {"id": cid, "points": 0, "first": 0, "second": 0, "third": 0} for cid in character_ids()}
    for _, *picks, _ in rows:
        for rank, (cid, points) in enumerate(zip(picks, (3, 2, 1))):
            if cid in tally:
                tally[cid]["points"] += points
                tally[cid][("first", "second", "third")[rank]] += 1
    ranked = sorted(tally.values(), key=lambda t: (-t["points"], -t["first"], -t["second"]))
    ballots = [{"name": n, "picks": [a, b, c], "submitted": s} for n, a, b, c, s in rows]
    return 200, {"tally": ranked, "ballots": ballots}


# ---------- prowl clock ----------
class ProwlClock:
    """The visible prowl clock for the current haven. It fills one segment every `interval`
    seconds while running, and whenever the DM adds ticks; when full, the prowlers break in.
    Timed ticks are worked out whenever the state is read, so nothing runs in the background."""

    def __init__(self):
        self.lock = threading.Lock()
        self.soundboard = None       # base URL of the tabletop soundboard, if any
        self.soundboard_down_until = 0
        self.sound = {"seq": 0, "pad": None, "local": True}
        self.configure("The Barracks", 8, 15 * 60)

    def configure(self, name, size, interval):
        self.name, self.size, self.interval = name, size, interval
        self.filled, self.running = 0, False
        self.paused_progress = 0.0   # seconds into the current tick while paused
        self.tick_started = 0.0      # monotonic time the current tick began, while running

    def advance(self, now):
        while self.running and self.interval and now - self.tick_started >= self.interval:
            self.tick_started += self.interval
            self.add(1)

    def add(self, n):
        was_full = self.filled >= self.size
        self.filled = max(0, min(self.size, self.filled + n))
        if n > 0 and not was_full:
            if self.filled >= self.size:
                self.running = False
                self.paused_progress = 0.0
                self.emit("prowl-breach")
            else:
                self.emit("prowl-tick")

    def emit(self, pad):
        """Play a sound on the soundboard, or flag it for the display page to play itself."""
        self.sound = {"seq": self.sound["seq"] + 1, "pad": pad, "local": not self.play_on_soundboard(pad)}

    def play_on_soundboard(self, pad):
        if not self.soundboard or time.monotonic() < self.soundboard_down_until:
            return False
        req = urllib.request.Request(self.soundboard.rstrip("/") + "/api/pad", method="POST",
                                     data=json.dumps({"id": pad}).encode(),
                                     headers={"Content-Type": "application/json"})
        try:
            with urllib.request.urlopen(req, timeout=0.5):
                return True
        except OSError as e:
            # Fall back to the display's own sounds, and leave the soundboard alone for a while.
            self.soundboard_down_until = time.monotonic() + 30
            print(f"soundboard unreachable ({e}); the clock display will play its own sounds")
            return False

    def state(self):
        with self.lock:
            now = time.monotonic()
            self.advance(now)
            progress = now - self.tick_started if self.running else self.paused_progress
            if not self.soundboard:
                soundboard = "off"
            else:
                soundboard = "down" if now < self.soundboard_down_until else "on"
            return {
                "name": self.name, "size": self.size, "filled": self.filled,
                "interval": self.interval, "running": self.running,
                "breached": self.filled >= self.size,
                "nextTickIn": max(0.0, self.interval - progress) if self.interval else None,
                "sound": dict(self.sound), "soundboard": soundboard,
            }

    def control(self, body):
        if not is_dm(body):
            return 403, {"error": "That's not the DM password."}
        action = body.get("action")
        with self.lock:
            now = time.monotonic()
            self.advance(now)
            if action == "set":
                try:
                    name = " ".join(str(body.get("name", "")).split())[:40] or "The Prowl"
                    size = int(body.get("size", 6))
                    minutes = float(body.get("minutes", 0))
                except (TypeError, ValueError):
                    return 400, {"error": "Bad clock settings."}
                if not (1 <= size <= 12 and 0 <= minutes <= 120):
                    return 400, {"error": "Use 1-12 segments and 0-120 minutes."}
                self.configure(name, size, minutes * 60)
            elif action == "start":
                if not self.running and self.filled < self.size:
                    self.running, self.tick_started = True, now - self.paused_progress
            elif action == "pause":
                if self.running:
                    self.running, self.paused_progress = False, now - self.tick_started
            elif action == "tick":
                try:
                    n = int(body.get("n", 1))
                except (TypeError, ValueError):
                    return 400, {"error": "Bad tick count."}
                self.add(max(-12, min(12, n)))
            elif action == "reset":
                self.configure(self.name, self.size, self.interval)
            elif action != "status":  # "status" just checks the password
                return 400, {"error": "Unknown clock action."}
        return 200, self.state()


clock = ProwlClock()


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def send_json(self, status, payload):
        data = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        path = urlsplit(self.path).path
        if path not in ("/api/vote", "/api/results", "/api/clock"):
            return self.send_error(404)
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(min(length, 4096)) or b"{}")
            if not isinstance(body, dict):
                raise ValueError
        except ValueError:
            return self.send_json(400, {"error": "Bad request."})
        handler = {"/api/vote": record_vote, "/api/results": results, "/api/clock": clock.control}[path]
        self.send_json(*handler(body))

    def is_public(self):
        path = unquote(urlsplit(self.path).path)
        if ".." in path:
            return False
        return path in PUBLIC_FILES or (path.startswith(PUBLIC_DIRS) and not path.endswith("/"))

    def do_GET(self):
        if urlsplit(self.path).path == "/api/voters":
            return self.send_json(200, {"voters": voter_names()})
        if urlsplit(self.path).path == "/api/clock":
            return self.send_json(200, clock.state())
        if not self.is_public():
            return self.send_error(404)
        super().do_GET()

    def do_HEAD(self):
        if not self.is_public():
            return self.send_error(404)
        super().do_HEAD()

    def end_headers(self):
        # Always fetch fresh files so lore edits show up on a plain reload.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def serve(port, local):
    host = "127.0.0.1" if local else "0.0.0.0"
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = ThreadingHTTPServer((host, port), handler)
    print(f"serving at http://localhost:{port}/")
    ip = None if local else lan_ip()
    if ip:
        print(f"  on your network: http://{ip}:{port}/")
    elif not local:
        print("  (couldn't detect a LAN address; check your network connection)")
    base = f"http://{ip or 'localhost'}:{port}"
    print(f"  prowl clock: {base}/clock.html (players' display), {base}/clock-dm.html (DM controls)")
    return server


def watch():
    print("watching lore/ and homebrew/ (Ctrl+C to stop)")
    seen = snapshot()
    while True:
        time.sleep(0.5)
        now = snapshot()
        if now != seen:
            seen = now
            try:
                build()
            except Exception as e:  # keep watching through a half-saved file
                print("build failed:", e)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Compile lore/*.md into lore.js and optionally host the site.")
    ap.add_argument("--watch", action="store_true", help="rebuild whenever a lore or homebrew file changes")
    ap.add_argument("--serve", action="store_true", help="host the site on your LAN")
    ap.add_argument("--port", type=int, default=8000, help="port for --serve (default 8000)")
    ap.add_argument("--local", action="store_true", help="with --serve, only accept connections from this computer")
    ap.add_argument("--soundboard", metavar="URL", help="with --serve, play prowl clock sounds through the tabletop soundboard at URL")
    args = ap.parse_args()

    build()
    try:
        if args.serve:
            clock.soundboard = args.soundboard
            server = serve(args.port, args.local)
            if args.watch:
                threading.Thread(target=server.serve_forever, daemon=True).start()
                watch()
            else:
                print("Ctrl+C to stop")
                server.serve_forever()
        elif args.watch:
            watch()
    except KeyboardInterrupt:
        print()
