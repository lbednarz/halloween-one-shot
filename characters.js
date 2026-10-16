// Mechanics only: images and stats. Names, epithets and descriptions live in
// lore/<id>.md (run build.py after editing). Array order = roster order.

const CHARACTERS = [
  // ---- Remaining roster: fill in as I go ----
  {
    id: "sorceress",
    image: "character images/the sorceress.jpg",
    // From character sheets/the sorceress.pdf (D&D Beyond export).
    stats: { level: 7, hp: 44, ac: 15, speed: "30 ft", initiative: 3, passivePerception: 9 },
    abilities: {
      str: { score: 8, save: 0 }, dex: { score: 16, save: 4 }, con: { score: 14, save: 6 },
      int: { score: 12, save: 2 }, wis: { score: 8, save: 0 }, cha: { score: 18, save: 8 },
    },
    saves: ["con", "cha"],
    savesNote: "Saves include +1 from her Cloak of Protection. Advantage on saves against spells and being charmed.",
    skills: ["Arcana +4", "Deception +7", "History +4", "Persuasion +7"],
    attacks: [
      { name: "Fire Bolt", hit: 8, damage: "2d10 fire", notes: "120 ft. Unholy Flames: +3 fire damage." },
      { name: "Chill Touch", hit: 8, damage: "2d10 necrotic", notes: "Touch. Target can't regain HP until the end of her next turn." },
    ],
    actions: [
      { name: "Magic", text: "Cast a spell with a casting time of an action (see Spellcasting below)." },
    ],
    bonusActions: [
      { name: "Font of Magic", text: "Turn sorcery points into a spell slot (1st: 2 pts, 2nd: 3, 3rd: 5, 4th: 6), or spend a slot to gain points equal to its level." },
    ],
    reactions: [
      { name: "Shield", text: "When hit by an attack: +5 AC until the start of her next turn (1st-level slot)." },
    ],
    feats: [
      { name: "Empowered Spell (1 sorcery point)", text: "Reroll up to 4 of a spell's damage dice; use the new rolls." },
      { name: "Heightened Spell (3 sorcery points)", text: "One target of her spell has disadvantage on its first save against it." },
      { name: "Unholy Flames", text: "When her spell deals fire damage, add +3 fire damage, or make that fire damage ignore resistance." },
      { name: "Brimstone Affinity", text: "Resistant to fire. Spend 2 sorcery points to cast a fire spell one level higher." },
      { name: "Cthonic Legacy", text: "Resistant to necrotic damage. Darkvision 60 ft." },
      { name: "Fiendish Origin", text: "Speaks Abyssal; advantage on Charisma checks with fiends who speak it." },
      { name: "Magic items", text: "Cloak of Protection (+1 AC and saves) and Wand of the War Mage +1 (+1 spell attacks), both already counted." },
    ],
    resources: [
      { name: "Sorcery Points", max: 7, recharge: "long" },
      { name: "Free Chromatic Orb", max: 1, recharge: "long" },
      { name: "Free False Life", max: 1, recharge: "long" },
      { name: "Free Ray of Enfeeblement", max: 1, recharge: "long" },
    ],
    spellcasting: {
      dc: 15, attack: 8, slots: { 1: 4, 2: 3, 3: 3, 4: 1 },
      byLevel: {
        0: ["Fire Bolt", "Chill Touch", "Mage Hand", "Message", "Mending", "Friends", "Minor Illusion", "Thaumaturgy"],
        1: ["Burning Hands", "Shield", "Thunderwave", { name: "Chromatic Orb", note: "1 free / LR" }, { name: "False Life", note: "1 free / LR" }],
        2: ["Flaming Sphere", "Scorching Ray", { name: "Ray of Enfeeblement", note: "1 free / LR" }],
        3: ["Blink", "Fireball"],
        4: ["Wall of Fire"],
      },
    },
  },
  stub("exiled", "the exiled.jpg"),
  stub("squire", "the squire.jpg"),
  stub("bird-keeper", "the bird keeper.jpg"),
  stub("stargazer", "the stargazer.jpg"),
  stub("swordsaint", "the swordsaint.jpg"),
  {
    id: "relentless",
    image: "character images/the relentless.jpg",
    // From character sheets/the relentless.pdf (D&D Beyond export).
    stats: { level: 7, hp: 60, ac: 18, speed: "35 ft", initiative: 7, passivePerception: 15 },
    abilities: {
      str: { score: 12, save: 4 }, dex: { score: 20, save: 8 }, con: { score: 15, save: 2 },
      int: { score: 10, save: 0 }, wis: { score: 14, save: 5 }, cha: { score: 10, save: 0 },
    },
    saves: ["str", "dex", "wis"],
    skills: ["Animal Handling +5", "Investigation +3", "Nature +3", "Perception +5", "Stealth +8", "Survival +5"],
    attacks: [
      { name: "Shortsword +1", hit: 9, damage: "1d6+6 piercing", notes: "Vex: after a hit, advantage on his next attack against that target." },
      { name: "Dagger +1", hit: 9, damage: "1d4+6 piercing", notes: "Thrown 20/60 ft. Nick: his off-hand attack is part of the Attack action, not a bonus action." },
      { name: "Longbow +1", hit: 9, damage: "1d8+6 piercing", notes: "150/600 ft. Slow: a target he hits loses 10 ft of speed until his next turn." },
      { name: "Cursed Claws", hit: 8, damage: "1d6+5 slashing", notes: "Unarmed strike. Can trigger Curse Creature." },
    ],
    actions: [
      { name: "Extra Attack", text: "Attack twice when he takes the Attack action." },
      { name: "Two-Weapon Fighting", text: "Adds his DEX modifier to the damage of his off-hand attack." },
      { name: "Primeval Awareness", text: "Spend a spell slot to sense aberrations, celestials, dragons, elementals, fey, fiends or undead within 1 mile (6 in his favored terrain) for 1 minute per slot level." },
    ],
    bonusActions: [
      { name: "Hunter's Mark", text: "1st-level slot. Mark a creature: +1d6 force damage when he hits it. Concentration." },
      { name: "Ensnaring Strike", text: "1st-level slot. After a weapon hit, thorny vines restrain the target (STR save, DC 13). Concentration." },
    ],
    reactions: [
      { name: "Grey Balance (1 / long rest)", text: "When he fails a saving throw, succeed instead; he then has disadvantage on d20 tests until the end of his next turn." },
      { name: "Opportunity Attack", text: "Strike a creature that leaves his reach." },
    ],
    feats: [
      { name: "Dread Ambusher", text: "On his first turn of each combat: +10 ft speed, and one extra weapon attack that deals +1d8 damage on a hit. Initiative already includes his WIS." },
      { name: "Umbral Sight", text: "Darkvision 90 ft. In darkness, he's invisible to creatures relying on darkvision to see him." },
      { name: "Curse Creature (3 / long rest)", text: "When his claws hit, the target has disadvantage on d20 tests until the start of his next turn." },
      { name: "Favored Enemies: Aberrations & Monstrosities", text: "Advantage on Survival checks to track them and Intelligence checks to recall lore about them." },
      { name: "Natural Explorer: Forest & Swamp", text: "Double proficiency on related INT/WIS checks; can't get lost, travels stealthily at normal pace alone, and learns exact numbers and sizes when tracking." },
      { name: "Iron Mind", text: "Proficient in Wisdom saving throws." },
    ],
    resources: [
      { name: "Curse Creature", max: 3, recharge: "long" },
      { name: "Grey Balance", max: 1, recharge: "long" },
    ],
    spellcasting: {
      dc: 13, attack: 5, slots: { 1: 4, 2: 3 },
      byLevel: {
        1: ["Hunter's Mark", "Ensnaring Strike", "Cure Wounds", "Speak with Animals", { name: "Disguise Self", note: "always" }],
        2: ["Pass without Trace", { name: "Rope Trick", note: "always" }],
      },
    },
  },
  stub("flagellant", "the flagellant.jpg"),
   {
    id: "wretched",
    image: "character images/the wretched.jpg",
    stats: {
      level: 5,
      hp: 44,
      ac: 17,
      speed: "30 ft",
    },
    skills: ["Athletics +6", "Intimidation +2", "Perception +4", "Religion +1"],
    actions: [
      { name: "Extra Attack", text: "Attack twice when you take the Attack action." },
      { name: "Greatsword", text: "+6 to hit, 2d6 + 3 slashing." },
      { name: "Action Surge (1/rest)", text: "Take one additional action this turn." },
    ],
    reactions: [
      { name: "Shield (spell)", text: "+5 AC until the start of your next turn, including against the triggering attack." },
    ],
    feats: [
      { name: "Great Weapon Master", text: "Take −5 to hit for +10 damage. Bonus-action attack after a crit or a kill." },
    ],
  },
  stub("summoner", "the summoner.jpg"),
  stub("guttersnipe", "the guttersnipe.jpg"),
  stub("stalwart", "the stalwart.jpg"),
  stub("pomander", "the pomander.jpg"),
  {
    id: "knight-errant",
    image: "character images/the knight errant.jpg",
    // From character sheets/the knight-errant.pdf (D&D Beyond export).
    stats: { level: 7, hp: 60, ac: 16, speed: "30 ft", initiative: 0, passivePerception: 13 },
    // save = total saving throw bonus as printed on the sheet (includes Aura of Protection +2).
    abilities: {
      str: { score: 20, save: 7 }, dex: { score: 11, save: 2 }, con: { score: 15, save: 4 },
      int: { score: 10, save: 2 }, wis: { score: 10, save: 5 }, cha: { score: 14, save: 7 },
    },
    saves: ["wis", "cha"],
    savesNote: "Saves include +2 from her Aura of Protection.",
    skills: ["Athletics +8", "Intimidation +5", "Medicine +3", "Perception +3", "Persuasion +5"],
    attacks: [
      { name: "Greatsword +1", hit: 9, damage: "2d6+6 slashing", notes: "Reroll 1s and 2s on damage. Graze: on a miss, still deal 5 damage." },
      { name: "Spear", hit: 8, damage: "1d6+5 piercing", notes: "Thrown 20/60 ft. Sap: a target she hits has disadvantage on its next attack." },
      { name: "Ray of Frost", hit: 3, damage: "2d8 cold", notes: "60 ft. Target's speed drops by 10 ft until her next turn." },
    ],
    actions: [
      { name: "Extra Attack", text: "Attack twice when she takes the Attack action." },
      { name: "Lay on Hands (35 HP / long rest)", text: "Touch a creature to restore any number of HP from the pool, or spend 5 to cure a disease or poison." },
      { name: "Nature's Wrath (Channel Divinity, 1 / short rest)", text: "Spectral vines restrain a creature within 10 ft (STR or DEX save, DC 13; repeats the save each turn)." },
      { name: "Turn the Faithless (Channel Divinity, shares the use)", text: "Each fey or fiend within 30 ft that can hear her is turned for 1 minute (WIS save, DC 13)." },
      { name: "Divine Sense (3 / long rest)", text: "Until the end of her next turn, sense celestials, fiends and undead within 60 ft." },
    ],
    bonusActions: [
      { name: "Divine Smite", text: "After a melee hit, spend a spell slot: +2d8 radiant, +1d8 per slot level above 1st, +1d8 more against undead or fiends." },
      { name: "Misty Step", text: "Teleport up to 30 ft on her spirit-like wings. Free once per long rest, otherwise a 2nd-level slot." },
      { name: "Ensnaring Strike", text: "1st-level slot. Her next hit makes thorny vines restrain the target (STR save, DC 13). Concentration." },
      { name: "Shield of Faith", text: "1st-level slot. A creature within 60 ft gains +2 AC. Concentration." },
    ],
    reactions: [
      { name: "Opportunity Attack", text: "Strike a creature that leaves her reach." },
    ],
    feats: [
      { name: "Aura of Protection", text: "While conscious, she and allies within 10 ft add +2 to all saving throws." },
      { name: "Aura of Warding", text: "She and allies within 10 ft resist damage from spells." },
      { name: "Savage Attacker", text: "Once per turn, roll a weapon's damage dice twice and use either result." },
      { name: "Fey Ancestry", text: "Advantage on saves to avoid or end being charmed." },
      { name: "Elven Trance & Divine Health", text: "Immune to disease; magic can't put her to sleep. Darkvision 60 ft." },
    ],
    resources: [
      { name: "Lay on Hands", max: 35, recharge: "long" },
      { name: "Channel Divinity", max: 1, recharge: "short" },
      { name: "Divine Sense", max: 3, recharge: "long" },
      { name: "Free Misty Step", max: 1, recharge: "long" },
    ],
    spellcasting: {
      dc: 13, attack: 5, slots: { 1: 4, 2: 3 },
      byLevel: {
        0: ["Ray of Frost"],
        1: [{ name: "Ensnaring Strike", note: "always" }, { name: "Speak with Animals", note: "always" }, "Bless", "Cure Wounds", "Shield of Faith"],
        2: [{ name: "Misty Step", note: "always" }, { name: "Moonbeam", note: "always" }, "Aid", "Lesser Restoration"],
      },
    },
  },
  stub("wall", "the wall.jpg"),
];

// Placeholder builder so unfinished characters still render a full sheet.
function stub(id, imageFile) {
  return {
    id,
    image: `character images/${imageFile}`,
    stats: { level: 7, hp: "—", ac: "—", speed: "—", initiative: "—", passivePerception: "—" },
    abilities: null,
    saves: [],
    skills: [],
    attacks: [],
    actions: [],
    bonusActions: [],
    reactions: [],
    feats: [],
    resources: [],
    spellcasting: null,
  };
}
