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
      { name: "Feed the Hunger", text: "Bonus action: take 2d6 + 2 psychic damage that can't be reduced in any way, and regain 2 sorcery points." },
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
  {
    id: "exiled",
    image: "character images/the exiled.jpg",
    // From character sheets/the exiled.pdf (D&D Beyond export).
    stats: { level: 7, hp: 75, ac: 15, speed: "45 ft", initiative: 2, passivePerception: 15 },
    abilities: {
      str: { score: 18, save: 7 }, dex: { score: 14, save: 2 }, con: { score: 16, save: 6 },
      int: { score: 10, save: 0 }, wis: { score: 14, save: 2 }, cha: { score: 10, save: 0 },
    },
    saves: ["str", "con"],
    savesNote: "Advantage on initiative. Advantage on DEX saves against effects he can see (Danger Sense).",
    skills: ["Athletics +7", "Intimidation +3", "Nature +3", "Perception +5", "Survival +5"],
    attacks: [
      { name: "Greatsword of Wounding", hit: 7, damage: "2d6+4 slashing", notes: "+1d4 necrotic. +2 damage while raging. Graze: on a miss, still deal 4 damage." },
      { name: "Dagger of Venom (×3)", hit: 8, damage: "1d4+5 piercing", notes: "Thrown 20/60 ft. Nick. Once a day, coat it: +2d10 poison and the target is poisoned (CON save, DC 15)." },
      { name: "Cursed Claws", hit: 7, damage: "1d6+4 slashing", notes: "Unarmed strike. Can trigger Curse Creature." },
    ],
    actions: [
      { name: "Extra Attack", text: "Attack twice when he takes the Attack action." },
      { name: "Reckless Attack", text: "On his first attack of the turn: advantage on STR melee attacks this turn, but attacks against him have advantage until his next turn." },
    ],
    bonusActions: [
      { name: "Rage (4 / long rest)", text: "For 1 minute: advantage on STR checks and saves, +2 damage with STR melee weapons, resistance to bludgeoning, piercing and slashing. Can't cast or concentrate on spells. Can't be charmed or frightened while raging." },
      { name: "Frenzy", text: "If he chooses to frenzy when he rages: one extra melee weapon attack as a bonus action each turn after. When the rage ends, he gains a level of exhaustion." },
    ],
    reactions: [
      { name: "Grey Balance (1 / long rest)", text: "When he fails a saving throw, succeed instead; he then has disadvantage on d20 tests until the end of his next turn." },
      { name: "Ring of Evasion (3 charges)", text: "When he fails a DEX save, spend a charge to succeed instead. Regains 1d3 charges at dawn." },
      { name: "Opportunity Attack", text: "Strike a creature that leaves his reach." },
    ],
    feats: [
      { name: "Unarmored Defense", text: "AC 10 + DEX + CON while not wearing armor (15)." },
      { name: "Feral Instinct", text: "Advantage on initiative; if surprised, he can still act on his first turn by raging before anything else." },
      { name: "Savage Attacker", text: "Once per turn, roll a weapon's damage dice twice and use either result." },
      { name: "Curse Creature (3 / long rest)", text: "When his claws hit, the target has disadvantage on d20 tests until the start of his next turn." },
      { name: "Cloak of Elvenkind", text: "Hood up: advantage on Stealth checks, and Perception checks to see him have disadvantage." },
      { name: "Fast Movement & Darkvision", text: "+10 ft speed without heavy armor (included). Darkvision 60 ft." },
    ],
    resources: [
      { name: "Rage", max: 4, recharge: "long" },
      { name: "Curse Creature", max: 3, recharge: "long" },
      { name: "Grey Balance", max: 1, recharge: "long" },
      { name: "Ring of Evasion", max: 3, recharge: "long" },
      { name: "Dagger of Venom", max: 1, recharge: "long" },
    ],
    spellcasting: null,
  },
  {
    id: "squire",
    image: "character images/the squire.jpg",
    // From character sheets/the squire.pdf (D&D Beyond export).
    stats: { level: 7, hp: 67, ac: 20, speed: "30 ft", initiative: 7, passivePerception: 13 },
    abilities: {
      str: { score: 10, save: 4 }, dex: { score: 18, save: 5 }, con: { score: 16, save: 7 },
      int: { score: 10, save: 1 }, wis: { score: 10, save: 1 }, cha: { score: 14, save: 3 },
    },
    saves: ["str", "con"],
    savesNote: "Saves include +1 from her Ring of Protection. Shield Master: +2 to DEX saves against effects that target only her.",
    skills: ["Deception +5", "Insight +3", "Perception +3", "Performance +5", "Persuasion +8", "Sleight of Hand +7", "Stealth +7"],
    attacks: [
      { name: "Shortsword +1", hit: 8, damage: "1d8+7 piercing", notes: "Includes Dueling +2. Vex: after a hit, advantage on her next attack against that target." },
    ],
    actions: [
      { name: "Extra Attack", text: "Attack twice when she takes the Attack action." },
      { name: "Action Surge (1 / short rest)", text: "Take one additional action on her turn." },
      { name: "Trip Attack (superiority die)", text: "On a hit, add the d6 to damage; a Large or smaller target must make a STR save (DC 15) or fall prone." },
    ],
    bonusActions: [
      { name: "Second Wind & Rallying Cry (1 / short rest)", text: "She regains 1d10 + 7 HP, and up to three allies within 60 ft who can see or hear her regain 7 HP." },
      { name: "Rally (superiority die)", text: "A friendly creature who can see or hear her gains temp HP equal to the d6 + 2." },
      { name: "Shield Master Shove", text: "After taking the Attack action, shove a creature within 5 ft with her shield." },
    ],
    reactions: [
      { name: "Shield Master Evasion", text: "When an effect lets her save for half damage and she succeeds, she takes none instead." },
      { name: "Opportunity Attack", text: "Strike a creature that leaves her reach." },
    ],
    feats: [
      { name: "Alert", text: "+3 to initiative (included). After rolling initiative, she can swap with a willing ally." },
      { name: "Savage Attacker", text: "Once per turn, roll a weapon's damage dice twice and use either result." },
      { name: "Royal Envoy", text: "Double proficiency on Persuasion (included)." },
      { name: "Resourceful", text: "Gains Heroic Inspiration after every long rest: reroll one die, once." },
      { name: "Martial Adept", text: "Knows the Rally and Trip Attack maneuvers, fueled by one d6 superiority die per short rest." },
      { name: "Ring of Protection", text: "+1 to AC and saving throws (already counted)." },
    ],
    resources: [
      { name: "Second Wind", max: 1, recharge: "short" },
      { name: "Action Surge", max: 1, recharge: "short" },
      { name: "Superiority Die (d6)", max: 3, recharge: "short" },
      { name: "Heroic Inspiration", max: 1, recharge: "long" },
    ],
    spellcasting: null,
  },
  {
    id: "bird-keeper",
    image: "character images/the bird keeper.jpg",
    // From character sheets/the bird keeper.pdf (D&D Beyond export). Spell list = her full artificer list.
    stats: { level: 7, hp: 59, ac: 16, speed: "30 ft", initiative: 3, passivePerception: 11 },
    abilities: {
      str: { score: 8, save: -1 }, dex: { score: 16, save: 3 }, con: { score: 16, save: 6 },
      int: { score: 18, save: 7 }, wis: { score: 12, save: 1 }, cha: { score: 10, save: 0 },
    },
    saves: ["con", "int"],
    savesNote: "Tool Expertise: double proficiency with tools (e.g. +10 with alchemist's supplies). Passive Investigation 17.",
    skills: ["Animal Handling +4", "Arcana +7", "History +7", "Investigation +7", "Medicine +4"],
    attacks: [
      { name: "Shortbow +1", hit: 7, damage: "1d6+4 piercing", notes: "80/320 ft. Vex: after a hit, advantage on her next attack against that target." },
      { name: "Ray of Sickness", hit: 7, damage: "2d8 poison", notes: "1st-level slot. 60 ft. Target makes a CON save (DC 15) or is poisoned until the end of her next turn." },
      { name: "Shortsword +1", hit: 4, damage: "1d6+4 piercing", notes: "Not proficient. Vex." },
    ],
    actions: [
      { name: "Experimental Elixir (2 / long rest)", text: "After a long rest she brews two elixirs, rolling a d6 for each: healing (2d4 + 4 HP), swiftness (+10 ft speed), resilience (+1 AC), boldness (+1d4 to attacks and saves), flight (10 ft fly speed), or transformation (alter appearance)." },
      { name: "Infuse Item (3 items)", text: "After a long rest she infuses up to three objects with her artificer infusions, making them magic items." },
      { name: "Magical Tinkering", text: "Imbue a tiny object with a light, a short recorded message, a smell or sound, or a still image (up to 4 at a time)." },
    ],
    bonusActions: [
      { name: "Healing Word", text: "1st-level slot. A creature within 60 ft regains 2d4 + 4 HP (+4 more with Alchemical Savant)." },
    ],
    reactions: [
      { name: "Flash of Genius (4 / long rest)", text: "When she or a creature within 30 ft makes an ability check or saving throw, add +4 to the roll." },
    ],
    feats: [
      { name: "Alchemical Savant", text: "Casting with alchemist's supplies, add +4 to one healing roll or one acid, fire, necrotic or poison damage roll of the spell." },
      { name: "Lucky (3 / long rest)", text: "Spend a luck point to roll an extra d20 on an attack, check or save, or on an attack against her, and choose which to use." },
      { name: "The Right Tool for the Job", text: "With an hour's work, conjure a set of artisan's tools." },
    ],
    resources: [
      { name: "Flash of Genius", max: 4, recharge: "long" },
      { name: "Luck Points", max: 3, recharge: "long" },
      { name: "Experimental Elixirs", max: 2, recharge: "long" },
    ],
    // Consumables: pips tick off and don't refill on a rest.
    items: [
      { name: "Potion of Healing (Superior)", qty: 2, text: "Drink to regain 8d4 + 8 HP." },
      { name: "Potion of Poison", qty: 3, text: "Looks, smells and tastes like a healing potion. Whoever drinks it takes poison damage and may be poisoned (CON save, DC 13)." },
      { name: "Potion of Fire Breath", qty: 1, text: "For 1 hour, as a bonus action, exhale fire at a target within 30 ft: DEX save (DC 13) or 4d6 fire damage, half on a success. Three breaths before it wears off." },
      { name: "Potion of Fire Giant Strength", qty: 1, text: "Strength becomes 25 for 1 hour." },
      { name: "Potion of Growth", qty: 1, text: "Grow one size larger, as Enlarge, for 1d4 hours." },
      { name: "Potion of Invisibility", qty: 1, text: "Invisible for 1 hour. Ends early if she attacks or casts a spell." },
      { name: "Potion of Climbing", qty: 1, text: "Climb speed equal to walking speed for 1 hour, and advantage on Athletics checks to climb." },
      { name: "Potion of Animal Friendship", qty: 1, text: "For 1 hour she can cast Animal Friendship (DC 13) at will." },
      { name: "Philter of Love", qty: 1, text: "The drinker is charmed for 1 hour by the next creature it sees within 10 minutes." },
      { name: "Wytchwood Sap", qty: 1, text: "Effect unknown. Ask the DM." },
    ],
    spellcasting: {
      dc: 15, attack: 7, slots: { 1: 4, 2: 3 },
      // Quick list: what the page shows by default ("All spells" shows everything in byLevel).
      // A suggested day's preparation: her 7 prepared spells (INT +4, half her level), plus the
      // always-prepared Alchemist spells and both cantrips.
      quickList: [
        "Guidance", "Mending",
        "Healing Word", "Ray of Sickness", "Faerie Fire", "Grease", "Absorb Elements",
        "Acid Arrow", "Flaming Sphere", "Web", "Heat Metal", "Aid", "Lesser Restoration",
      ],
      byLevel: {
        0: ["Guidance", "Mending"],
        1: [{ name: "Healing Word", note: "always" }, { name: "Ray of Sickness", note: "always" }, "Cure Wounds", "Faerie Fire", "Grease", "Disguise Self",
            "Absorb Elements", "Alarm", "Catapult", "Detect Magic", "Expeditious Retreat", "False Life", "Feather Fall", "Identify", "Jump",
            "Longstrider", "Purify Food and Drink", "Sanctuary", "Snare", { name: "Quick Clothier", note: "3rd-party" }],
        2: [{ name: "Acid Arrow", note: "always" }, { name: "Flaming Sphere", note: "always" }, "Aid", "Lesser Restoration", "Web", "Heat Metal",
            "Invisibility", "Enlarge/Reduce", "Blur", "Alter Self", "Arcane Lock", "Continual Flame", "Darkvision", "Enhance Ability", "Levitate",
            "Magic Mouth", "Magic Weapon", "Protection from Poison", "Pyrotechnics", "Rope Trick", "See Invisibility", "Skywrite", "Spider Climb",
            { name: "Tortoise Shell", note: "3rd-party" }, { name: "Conjure Tools", note: "3rd-party" }],
      },
    },
  },
  {
    id: "stargazer",
    image: "character images/the stargazer.jpg",
    // From character sheets/the stargazer.pdf (D&D Beyond export). Spell list = his full cleric list.
    stats: { level: 7, hp: 52, ac: 16, speed: "30 ft", initiative: 2, passivePerception: 15 },
    abilities: {
      str: { score: 10, save: 0 }, dex: { score: 14, save: 2 }, con: { score: 14, save: 2 },
      int: { score: 15, save: 2 }, wis: { score: 20, save: 8 }, cha: { score: 12, save: 4 },
    },
    saves: ["wis", "cha"],
    savesNote: "Deep Roots: advantage on checks and saves against being moved against his will or knocked prone. Passive Insight 18.",
    skills: ["History +5", "Insight +8", "Medicine +8", "Religion +5"],
    attacks: [
      { name: "Sacred Flame", hit: "DC 16", damage: "2d8 radiant", notes: "60 ft, DEX save. The target gets no benefit from cover." },
      { name: "Guiding Bolt", hit: 8, damage: "4d6 radiant", notes: "1st-level slot. 120 ft. The next attack against the target has advantage." },
      { name: "Staff of Birdcalls", hit: 3, damage: "1d6 bludgeoning", notes: "Versatile (1d8). Topple: a target he hits makes a CON save or falls prone." },
    ],
    actions: [
      { name: "Radiance of the Dawn (Channel Divinity)", text: "Dispel magical darkness within 30 ft; each hostile creature within 30 ft takes 2d10+7 radiant damage (CON save DC 16 for half)." },
      { name: "Turn Undead (Channel Divinity)", text: "Undead within 30 ft make a WIS save (DC 16) or are turned for 1 minute. Those of CR 1/2 or lower are destroyed outright." },
    ],
    bonusActions: [
      { name: "Grasping Branches (1 / short rest)", text: "A Large or smaller creature within 30 ft makes a STR save (DC 13) or is restrained for 1 minute (repeats the save each turn). On a success, its speed is halved until its next turn ends." },
      { name: "Root Sense (1 / short rest)", text: "Gain tremorsense out to 60 ft for 10 minutes." },
      { name: "Healing Word", text: "1st-level slot. A creature within 60 ft regains 2d4 + 5 HP." },
      { name: "Spiritual Weapon", text: "2nd-level slot. A floating spectral weapon makes a melee spell attack (+8) for 1d8 + 5 force, and can attack again each turn." },
    ],
    reactions: [
      { name: "Warding Flare (5 / long rest)", text: "When a creature within 30 ft attacks him or another creature, impose disadvantage on the attack roll." },
    ],
    feats: [
      { name: "Gnarlborn", text: "He is a Plant, not a Humanoid. Advantage on checks to escape a grapple." },
      { name: "Elderwood Whispers", text: "After each long rest, he gains proficiency in one skill or tool of his choice until the next long rest." },
      { name: "Magic Initiate (Cleric)", text: "Can cast Inflict Wounds once per long rest without a slot." },
      { name: "Ring of Mind Shielding", text: "His thoughts can't be read, his lies can't be magically detected, and his creature type can't be magically discerned." },
      { name: "Staff of Birdcalls (10 charges)", text: "Spend charges to create birdsong effects: mimic a bird, call a flock, or create a distracting cacophony." },
    ],
    resources: [
      { name: "Channel Divinity", max: 2, recharge: "short" },
      { name: "Warding Flare", max: 5, recharge: "long" },
      { name: "Grasping Branches", max: 1, recharge: "short" },
      { name: "Root Sense", max: 1, recharge: "short" },
      { name: "Free Inflict Wounds", max: 1, recharge: "long" },
      { name: "Staff of Birdcalls", max: 10, recharge: "long" },
    ],
    spellcasting: {
      dc: 16, attack: 8, slots: { 1: 4, 2: 3, 3: 3, 4: 1 },
      // Quick list: what the page shows by default ("All spells" shows everything in byLevel).
      // A suggested day's preparation: his 12 prepared spells (WIS +5, level 7), plus the
      // always-prepared Light Domain spells, his free Inflict Wounds, and his best cantrips.
      quickList: [
        "Sacred Flame", "Guidance", "Light", "Spare the Dying",
        "Burning Hands", "Faerie Fire", "Healing Word", "Guiding Bolt", "Bless", "Command", "Inflict Wounds",
        "Flaming Sphere", "Scorching Ray", "Spiritual Weapon", "Lesser Restoration", "Hold Person",
        "Daylight", "Fireball", "Spirit Guardians", "Revivify", "Mass Healing Word", "Dispel Magic", "Remove Curse",
        "Guardian of Faith", "Wall of Fire", "Death Ward",
      ],
      byLevel: {
        0: ["Guidance", "Light", "Sacred Flame", "Thaumaturgy", "Spare the Dying", "Mending"],
        1: [{ name: "Burning Hands", note: "always" }, { name: "Faerie Fire", note: "always" }, "Bless", "Cure Wounds", "Guiding Bolt", "Healing Word", "Shield of Faith",
            "Bane", "Command", "Create or Destroy Water", "Detect Evil and Good", "Detect Magic", "Detect Poison and Disease",
            { name: "Inflict Wounds", note: "1 free / LR" }, "Protection from Evil and Good", "Purify Food and Drink", "Sanctuary", "Ceremony",
            { name: "Ancestral Communion", note: "3rd-party" }, { name: "Captivate Undead", note: "3rd-party" }],
        2: [{ name: "Flaming Sphere", note: "always" }, { name: "Scorching Ray", note: "always" }, "Spiritual Weapon", "Hold Person", "Lesser Restoration",
            "Prayer of Healing", "Aid", "Augury", "Blindness/Deafness", "Calm Emotions", "Continual Flame", "Enhance Ability", "Find Traps",
            "Gentle Repose", "Locate Object", "Protection from Poison", "Silence", "Warding Bond", "Zone of Truth",
            { name: "Chorus of the Lost", note: "3rd-party" }, { name: "Summer Winds", note: "3rd-party" }, { name: "Searing Orb", note: "3rd-party" }],
        3: [{ name: "Daylight", note: "always" }, { name: "Fireball", note: "always" }, "Spirit Guardians", "Revivify", "Beacon of Hope", "Mass Healing Word",
            "Dispel Magic", "Remove Curse", "Bestow Curse", "Animate Dead", "Clairvoyance", "Create Food and Water", "Feign Death", "Glyph of Warding",
            "Life Transference", "Magic Circle", "Meld into Stone", "Protection from Energy", "Sending", "Speak with Dead", "Tongues", "Water Walk",
            { name: "Harvest Moonglow", note: "3rd-party" }, { name: "Martyr", note: "3rd-party" }, { name: "Sanctum of the Flock", note: "3rd-party" }, { name: "Scarlet Dawn", note: "3rd-party" }, { name: "Astral Flood", note: "3rd-party" }],
        4: [{ name: "Guardian of Faith", note: "always" }, { name: "Wall of Fire", note: "always" }, "Banishment", "Death Ward", "Aura of Life",
            "Freedom of Movement", "Control Water", "Divination", "Locate Creature", "Stone Shape",
            { name: "Sacrificial Siphon", note: "3rd-party" }, { name: "Sanctum of the Shepherd", note: "3rd-party" }, { name: "Sticks to Snakes", note: "3rd-party" }],
      },
    },
  },
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
