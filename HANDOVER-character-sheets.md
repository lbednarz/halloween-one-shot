# Handover: Character Sheets on the Website

How the character pages work, how to add a character's stats from a D&D Beyond PDF,
and what's left to do. (The story itself lives in `lore/`; see the end of this file.)

## Status

| | Characters |
|---|---|
| **Stats done** (8) | Sorceress, Exiled, Squire, Bird Keeper, Stargazer, Relentless, Knight-errant, Swordsaint |
| **Waiting on a sheet** (7) | Flagellant, Wretched, Summoner, Guttersnipe, Stalwart, Pomander, Wall |

Every character is level 7. The **Wretched** still carries leftover example stats (an
old Eldritch Knight placeholder); they get replaced when his sheet arrives. The **Wall's**
class is still undecided.

## Files

| File | What it holds | Rebuild needed? |
|---|---|---|
| `characters.js` | Every character's mechanics: stats, attacks, actions, resources, spells, items. Array order = roster order. | No, just refresh |
| `spells.js` | Spell popup text, keyed by exact spell name (124 spells). | No |
| `lore/<id>.md` | Name, epithet, `aka` (real name), public lore, `## Secret`. | Yes: `python3 build.py` |
| `character sheets/*.pdf` | The D&D Beyond exports the stats came from. Never served. | n/a |
| `character images/*.jpg` | Portraits. | No |
| `index.html` / `style.css` | The page itself and its rendering logic. | No |
| `homebrew/<id>.md` | Custom (sub)class features: level, sheet section, uses. Public. | Yes: `python3 build.py` |
| `lore.js` | **Generated**; secrets inside are encrypted. Never edit it. | n/a |

## Adding a character from a PDF

There's no automatic importer, by choice: D&D Beyond's PDF layout interleaves columns,
and the useful parts (choosing spells, one-line summaries) need judgment.

1. Drop the export into `character sheets/the <name>.pdf`.
2. Pull out the text: `pdftotext -layout "character sheets/the <name>.pdf" -`
3. Replace the character's `stub("<id>", "the <name>.jpg")` line in `characters.js` with a
   full entry (copy an existing one, such as the Relentless for a martial or the Sorceress for a caster).
4. Add any spell that's missing from `spells.js` (see the check below).
5. Refresh the page and look it over.

**Gotchas found so far**
- Sheets mix 2014 and 2024 rules and list duplicate spells. Merge the duplicates. Summaries follow the 2024 rules.
- Proficiency markers ("P") sometimes land on a different line from their skill. Check the
  math: a proficient skill = ability modifier + 3.
- Check attunement. Unattuned magic items don't count; the Squire's ring was a miss.
- Third-party spells get `{ name, note: "3rd-party" }` and no popup, because their text isn't known.
- **Take mechanics from the sheet and keep the lore as written.** Small differences (background,
  weapon flavor) are expected because of D&D Beyond's limits. Only flag core conflicts, like a
  subclass that doesn't match the lore epithet.

## The data format (`characters.js`)

```js
{
  id: "relentless",                         // matches lore/relentless.md and the URL #/relentless
  image: "character images/the relentless.jpg",
  stats: { level: 7, hp: 60, ac: 18, speed: "35 ft", initiative: 7, passivePerception: 15 },
  abilities: { str: { score: 12, save: 4 }, /* dex con int wis cha */ },  // save = total bonus
  saves: ["str", "dex", "wis"],             // proficient saves (marked ●)
  savesNote: "…",                           // optional line under the ability row
  skills: ["Stealth +8", "…"],              // proficient skills only
  attacks: [{ name, hit: 9, damage: "1d6+6 piercing", notes }],   // hit can be a string, e.g. "DC 16"
  actions: [{ name, text }], bonusActions: [...], reactions: [...], feats: [...],  // "Feats & Traits"
  resources: [{ name: "Curse Creature", max: 3, recharge: "long" }],   // or "short"
  items: [{ name, qty: 2, text }],          // consumables: never refill on a rest (Bird Keeper's potions)
  spellcasting: {
    dc: 13, attack: 5, slots: { 1: 4, 2: 3 },
    byLevel: { 0: ["Light"], 1: ["Bless", { name: "Misty Step", note: "always" }] },
    quickList: ["…"],                       // optional: adds the Quick list / All spells toggle
  },
}
```

- An action, bonus action or reaction whose `name` exactly matches a `spells.js` key becomes a clickable popup.
- `resources` with `max` ≤ 10 show as pips; larger ones (Lay on Hands 35) show a number with −5/−1/+1 buttons.
- **Quick lists** are for prepared casters, who see their whole class list (Stargazer 88 → 26,
  Bird Keeper 47 → 13). Known-spell casters (Sorceress; expect the Summoner too) have short lists already.
- Missing spells check:
  ```bash
  node -e 'const fs=require("fs");eval(fs.readFileSync("spells.js","utf8")+fs.readFileSync("characters.js","utf8")+";globalThis.S=SPELLS;globalThis.C=CHARACTERS");for(const c of C)for(const l of Object.values(c.spellcasting?.byLevel||{}))for(const s of l){const n=s.name||s;if(s.note!=="3rd-party"&&!S[n])console.log(c.id,n)}'
  ```

## Homebrew features (`homebrew/<id>.md`)

For custom subclasses and other features D&D Beyond can't express. Copy `homebrew/_template.md`.
Each `## Feature` heading is one feature, and its first lines are tags:

```
## Lineage Guard
level: 3                  required; it goes on the sheet once stats.level reaches this
section: reaction         attack | action | bonus action | reaction | trait (default: trait)
hit: 7                    attacks only, with damage: (the description becomes the Notes)
uses: 2 / short rest      optional; adds pips named after the feature
replaces: Manifest Echo   optional; hides imported features, attacks, resources or items with
                          these names. "Spellcasting" drops the whole spell list

Description in markdown.
```

Features above the character's level stay off the sheet. A bad tag stops the build
with the file and feature named. `replaces` works on single spells only by removing
the whole list (`Spellcasting`).

## Character-specific mechanics

- **Sorceress: Feed the Hunger** (bonus action: take 2d6 + 2 unreducible psychic damage, regain
  2 sorcery points). Each use also earns 1 Corruption, which the DM tracks secretly and which is
  deliberately not on the sheet. See her entry in `lore/dm-notes.md`.
- **Stargazer** is a Plant, not a Humanoid (his Gnarlborn species).
- **Bird Keeper:** "Wytchwood Sap" is a custom potion whose effect is still TBD.
- **Exiled:** his sheet uses Unarmored Defense (AC 15), not the scale mail from his lore, and the
  2014 Berserker's Frenzy (exhaustion when the rage ends). Both were left as-is.

## What players can do on a sheet

- **HP tracker:** type an amount, then press Damage / Heal / Temp HP. Temp HP absorbs damage first and doesn't stack.
- **Pips:** click to spend or restore spell slots and resources. **Short rest** refills short-rest
  resources. **Long rest** refills everything except consumable items.
- **Spell popups:** click any underlined spell.
- All of this is saved **per browser** (`localStorage`). It doesn't sync between devices or players.

## Secrets, passwords and the server

- `## Secret` sections and the DM notes are **encrypted** at build time. Each secret unlocks with
  that character's password or the master password, both kept in `passwords.json`. That file is
  git-ignored and never served; edit it, then rebuild. New characters get a random password automatically.
- Unlocking needs HTTPS or localhost (the Tailscale Funnel link works; a plain LAN IP doesn't).
- Hosting: `python3 build.py --serve` (port 8000), with Funnel pointed at the **port**. The server
  only hands out the site's own files: `lore/`, the PDFs, `passwords.json`, `votes.db` and `.git` all return 404.
- **Voting:** friends rank their top 3 on the home page. Ballots go to `votes.db` (SQLite), and
  results are at `#/votes` behind the master password. Delete `votes.db` to reset.
- After changing `build.py`, restart the server.

## Story files (for planning, not mechanics)

`lore/dm-notes.md` is the canon (truth, places, people, character threads, open questions).
Each `lore/<id>.md` holds public lore, then a `## Secret` containing only what that character knows.
