// Spell reference shown in the popup when a spell is clicked on a character page.
// Keyed by the exact name used in characters.js. Summaries follow the 2024 rules.
// level 0 = cantrip. Any spell or action whose name matches a key here becomes clickable.

const SPELLS = {
  "Ray of Frost": {
    level: 0, school: "Evocation", time: "Action", range: "60 ft", components: "V, S", duration: "Instantaneous",
    text: "Make a ranged spell attack. On a hit, the target takes 1d8 cold damage and its speed drops by 10 ft until the start of your next turn.",
    higher: "Damage increases to 2d8 at character level 5, 3d8 at 11, and 4d8 at 17.",
  },
  "Bless": {
    level: 1, school: "Enchantment", time: "Action", range: "30 ft", components: "V, S, M (holy water)", duration: "Concentration, up to 1 minute",
    text: "Up to three creatures of your choice add 1d4 to their attack rolls and saving throws for the duration.",
    higher: "One additional creature for each slot level above 1st.",
  },
  "Cure Wounds": {
    level: 1, school: "Abjuration", time: "Action", range: "Touch", components: "V, S", duration: "Instantaneous",
    text: "A creature you touch regains 2d8 + your spellcasting modifier hit points.",
    higher: "+2d8 healing for each slot level above 1st.",
  },
  "Divine Smite": {
    level: 1, school: "Evocation", time: "Bonus action, right after hitting with a melee weapon or unarmed strike", range: "Self", components: "V", duration: "Instantaneous",
    text: "The target takes an extra 2d8 radiant damage, or 3d8 if it's a fiend or undead.",
    higher: "+1d8 damage for each slot level above 1st.",
  },
  "Ensnaring Strike": {
    level: 1, school: "Conjuration", time: "Bonus action, right after hitting with a weapon", range: "Self", components: "V", duration: "Concentration, up to 1 minute",
    text: "Thorny vines grasp the target: it must succeed on a STR save or be restrained (Large or bigger creatures have advantage). While restrained, it takes 1d6 piercing damage at the start of each of its turns. It or a creature next to it can use an action to try to tear free with a STR (Athletics) check against your save DC.",
    higher: "+1d6 damage for each slot level above 1st.",
  },
  "Shield of Faith": {
    level: 1, school: "Abjuration", time: "Bonus action", range: "60 ft", components: "V, S, M (a prayer scroll)", duration: "Concentration, up to 10 minutes",
    text: "A shimmering field surrounds a creature of your choice, granting it +2 AC for the duration.",
  },
  "Speak with Animals": {
    level: 1, school: "Divination", ritual: true, time: "Action", range: "Self", components: "V, S", duration: "10 minutes",
    text: "You can understand and speak with beasts for the duration. Most know little beyond their surroundings and survival, but may share what they've seen in the last day.",
  },
  "Aid": {
    level: 2, school: "Abjuration", time: "Action", range: "30 ft", components: "V, S, M (a strip of white cloth)", duration: "8 hours",
    text: "Up to three creatures each increase their hit point maximum and current hit points by 5 for the duration.",
    higher: "+5 hit points for each slot level above 2nd.",
  },
  "Lesser Restoration": {
    level: 2, school: "Abjuration", time: "Bonus action", range: "Touch", components: "V, S", duration: "Instantaneous",
    text: "End one condition on a creature you touch: Blinded, Deafened, Paralyzed, or Poisoned.",
  },
  "Misty Step": {
    level: 2, school: "Conjuration", time: "Bonus action", range: "Self", components: "V", duration: "Instantaneous",
    text: "Teleport up to 30 ft to an unoccupied space you can see.",
  },
  "Moonbeam": {
    level: 2, school: "Evocation", time: "Action", range: "120 ft", components: "V, S, M (a moonseed leaf)", duration: "Concentration, up to 1 minute",
    text: "A 5-ft-radius, 40-ft-high cylinder of pale light appears. A creature that enters it for the first time on a turn or ends its turn there makes a CON save, taking 2d10 radiant damage on a failure or half on a success. Shapechangers have disadvantage and revert to their true form. On later turns, you can use a Magic action to move the beam up to 60 ft.",
    higher: "+1d10 damage for each slot level above 2nd.",
  },
  // ---- The Sorceress ----
  "Fire Bolt": {
    level: 0, school: "Evocation", time: "Action", range: "120 ft", components: "V, S", duration: "Instantaneous",
    text: "Make a ranged spell attack. On a hit, the target takes 1d10 fire damage. Flammable objects that aren't being worn or carried catch fire.",
    higher: "Damage increases to 2d10 at character level 5, 3d10 at 11, and 4d10 at 17.",
  },
  "Chill Touch": {
    level: 0, school: "Necromancy", time: "Action", range: "Touch", components: "V, S", duration: "Instantaneous",
    text: "Make a melee spell attack. On a hit, the target takes 1d10 necrotic damage and can't regain hit points until the end of your next turn.",
    higher: "Damage increases to 2d10 at character level 5, 3d10 at 11, and 4d10 at 17.",
  },
  "Mage Hand": {
    level: 0, school: "Conjuration", time: "Action", range: "30 ft", components: "V, S", duration: "1 minute",
    text: "A spectral floating hand appears. As a Magic action you can use it to manipulate an object, open an unlocked door or container, or carry up to 10 lb. It can't attack or activate magic items, and vanishes if it goes more than 30 ft from you.",
  },
  "Message": {
    level: 0, school: "Transmutation", time: "Action", range: "120 ft", components: "S, M (a copper wire)", duration: "1 round",
    text: "Whisper a message to a creature you can see or know is nearby. Only it hears you, and it can whisper a reply only you hear. The spell passes around corners but is blocked by 1 ft of stone, 1 inch of metal, thin lead, or 3 ft of wood.",
  },
  "Mending": {
    level: 0, school: "Transmutation", time: "1 minute", range: "Touch", components: "V, S, M (two lodestones)", duration: "Instantaneous",
    text: "Repair a single break or tear in an object, such as a broken chain link, a torn cloak, or a leaking wineskin, no larger than 1 ft in any dimension.",
  },
  "Friends": {
    level: 0, school: "Enchantment", time: "Action", range: "Self", components: "S, M (makeup)", duration: "Concentration, up to 1 minute",
    text: "You have advantage on Charisma checks against one creature that isn't hostile toward you. When the spell ends, the creature realizes you used magic on it and may become hostile.",
  },
  "Minor Illusion": {
    level: 0, school: "Illusion", time: "Action", range: "30 ft", components: "S, M (a bit of fleece)", duration: "1 minute",
    text: "Create a sound or an image of an object no larger than a 5-ft cube. The image can't make sound, light, or smell, and physical contact reveals it. A creature can study it with an Investigation check against your save DC to see through it.",
  },
  "Thaumaturgy": {
    level: 0, school: "Transmutation", time: "Action", range: "30 ft", components: "V", duration: "Up to 1 minute",
    text: "Create a minor wonder: your voice booms three times louder, flames flicker or change color, the ground trembles harmlessly, a sound rings out, an unlocked door or window flies open or slams shut, or your eyes change appearance. Up to three effects at once.",
  },
  "Burning Hands": {
    level: 1, school: "Evocation", time: "Action", range: "Self (15-ft cone)", components: "V, S", duration: "Instantaneous",
    text: "Flames sweep out in a 15-ft cone. Each creature there makes a DEX save, taking 3d6 fire damage on a failure or half on a success. Flammable objects not being worn or carried catch fire.",
    higher: "+1d6 damage for each slot level above 1st.",
  },
  "Shield": {
    level: 1, school: "Abjuration", time: "Reaction, when you're hit by an attack or targeted by Magic Missile", range: "Self", components: "V, S", duration: "1 round",
    text: "You gain +5 AC until the start of your next turn, including against the triggering attack, and take no damage from Magic Missile.",
  },
  "Thunderwave": {
    level: 1, school: "Evocation", time: "Action", range: "Self (15-ft cube)", components: "V, S", duration: "Instantaneous",
    text: "A wave of thunder sweeps out from you. Each creature in a 15-ft cube makes a CON save, taking 2d8 thunder damage and being pushed 10 ft away on a failure, or half damage and no push on a success. The boom is audible 300 ft away.",
    higher: "+1d8 damage for each slot level above 1st.",
  },
  "Chromatic Orb": {
    level: 1, school: "Evocation", time: "Action", range: "90 ft", components: "V, S, M (a diamond worth 50+ gp)", duration: "Instantaneous",
    text: "Hurl an orb of acid, cold, fire, lightning, poison, or thunder (your choice). Make a ranged spell attack; on a hit, the target takes 3d8 damage of that type. If two or more of the d8s roll the same number, the orb leaps to a different creature within 30 ft: make a new attack roll against it.",
    higher: "+1d8 damage for each slot level above 1st, and the orb can leap one more time per slot level above 1st.",
  },
  "False Life": {
    level: 1, school: "Necromancy", time: "Action", range: "Self", components: "V, S, M (a drop of alcohol)", duration: "Instantaneous",
    text: "You gain 2d4 + 4 temporary hit points.",
    higher: "+5 temporary hit points for each slot level above 1st.",
  },
  "Flaming Sphere": {
    level: 2, school: "Conjuration", time: "Action", range: "60 ft", components: "V, S, M (a ball of wax)", duration: "Concentration, up to 1 minute",
    text: "A 5-ft-diameter sphere of fire appears and sheds bright light in 20 ft. Any creature that ends its turn within 5 ft of it makes a DEX save, taking 2d6 fire damage on a failure or half on a success. As a bonus action you can move it up to 30 ft; if you ram it into a creature, that creature makes the save and the sphere stops.",
    higher: "+1d6 damage for each slot level above 2nd.",
  },
  "Scorching Ray": {
    level: 2, school: "Evocation", time: "Action", range: "120 ft", components: "V, S", duration: "Instantaneous",
    text: "Fire three rays at one target or several. Make a ranged spell attack for each; each hit deals 2d6 fire damage.",
    higher: "One extra ray for each slot level above 2nd.",
  },
  "Ray of Enfeeblement": {
    level: 2, school: "Necromancy", time: "Action", range: "60 ft", components: "V, S", duration: "Concentration, up to 1 minute",
    text: "The target makes a CON save. On a failure, it has disadvantage on Strength-based d20 tests and subtracts 1d8 from all its damage rolls; it repeats the save at the end of each of its turns, ending the spell on a success. On a success, it has disadvantage on its next attack roll before the start of your next turn.",
  },
  "Blink": {
    level: 3, school: "Transmutation", time: "Action", range: "Self", components: "V, S", duration: "1 minute",
    text: "At the end of each of your turns, roll a d6. On a 4 to 6, you vanish into the Ethereal Plane until the start of your next turn, then reappear in an unoccupied space within 10 ft of where you vanished. While ethereal you can only affect, and be affected by, other things on that plane.",
  },
  "Fireball": {
    level: 3, school: "Evocation", time: "Action", range: "150 ft", components: "V, S, M (a ball of bat guano and sulfur)", duration: "Instantaneous",
    text: "A bead of flame bursts into a 20-ft-radius sphere. Each creature there makes a DEX save, taking 8d6 fire damage on a failure or half on a success. Flammable objects not being worn or carried catch fire.",
    higher: "+1d6 damage for each slot level above 3rd.",
  },
  "Wall of Fire": {
    level: 4, school: "Evocation", time: "Action", range: "120 ft", components: "V, S, M (a piece of charcoal)", duration: "Concentration, up to 1 minute",
    text: "Create an opaque wall of fire up to 60 ft long, 20 ft high, and 1 ft thick, or a ring up to 20 ft across. Creatures in it when it appears make a DEX save, taking 5d8 fire damage or half on a success. One side (your choice) burns: a creature takes 5d8 fire damage when it enters the wall or comes within 10 ft of that side for the first time on a turn, or ends its turn there.",
    higher: "+1d8 damage for each slot level above 4th.",
  },

  // ---- The Relentless ----
  "Hunter's Mark": {
    level: 1, school: "Divination", time: "Bonus action", range: "90 ft", components: "V", duration: "Concentration, up to 1 hour",
    text: "Mark a creature you can see. Whenever you hit it with an attack roll, it takes an extra 1d6 force damage, and you have advantage on Perception and Survival checks to find it. If it drops to 0 HP, you can use a bonus action on a later turn to move the mark to a new creature.",
    higher: "Lasts up to 8 hours with a 3rd- or 4th-level slot, and 24 hours with 5th or higher.",
  },
  "Disguise Self": {
    level: 1, school: "Illusion", time: "Action", range: "Self", components: "V, S", duration: "1 hour",
    text: "You make yourself, including your clothing, armor, and gear, look different: up to 1 ft shorter or taller, thinner or heavier, but with the same basic body shape. It's only visual; touch reveals it. A creature can see through it with an Investigation check against your save DC.",
  },
  "Pass without Trace": {
    level: 2, school: "Abjuration", time: "Action", range: "Self (30-ft emanation)", components: "V, S, M (ashes from burned mistletoe)", duration: "Concentration, up to 1 hour",
    text: "You and allies within 30 ft of you have +10 to Stealth checks and leave no tracks. You can't be tracked except by magical means.",
  },
  "Rope Trick": {
    level: 2, school: "Transmutation", time: "Action", range: "Touch", components: "V, S, M (a segment of rope)", duration: "1 hour",
    text: "A rope you touch rises upright, and at its top an invisible entrance opens into an extradimensional space that can hold up to eight Medium or smaller creatures. The rope can be pulled up inside. Nothing can see, attack, or cast spells through the entrance. When the spell ends, everything inside drops out.",
  },

  // ---- The Stargazer ----
  "Guidance": {
    level: 0, school: "Divination", time: "Action", range: "Touch", components: "V, S", duration: "Concentration, up to 1 minute",
    text: "Choose a skill. Until the spell ends, a willing creature you touch adds 1d4 to ability checks using that skill.",
  },
  "Light": {
    level: 0, school: "Evocation", time: "Action", range: "Touch", components: "V, M (a firefly or phosphorescent moss)", duration: "1 hour",
    text: "An object no larger than 10 ft sheds bright light in a 20-ft radius and dim light 20 ft beyond. Covering it with something opaque blocks the light.",
  },
  "Sacred Flame": {
    level: 0, school: "Evocation", time: "Action", range: "60 ft", components: "V, S", duration: "Instantaneous",
    text: "Flame-like radiance descends on a creature: it makes a DEX save or takes 1d8 radiant damage. It gains no benefit from cover.",
    higher: "2d8 at character level 5, 3d8 at 11, 4d8 at 17.",
  },
  "Spare the Dying": {
    level: 0, school: "Necromancy", time: "Action", range: "15 ft", components: "V, S", duration: "Instantaneous",
    text: "A creature with 0 hit points becomes stable.",
    higher: "The range doubles at character levels 5, 11 and 17.",
  },
  "Guiding Bolt": {
    level: 1, school: "Evocation", time: "Action", range: "120 ft", components: "V, S", duration: "1 round",
    text: "Make a ranged spell attack. On a hit, the target takes 4d6 radiant damage, and the next attack roll against it before the end of your next turn has advantage.",
    higher: "+1d6 damage for each slot level above 1st.",
  },
  "Healing Word": {
    level: 1, school: "Abjuration", time: "Bonus action", range: "60 ft", components: "V", duration: "Instantaneous",
    text: "A creature you can see regains 2d4 + your spellcasting modifier hit points.",
    higher: "+2d4 healing for each slot level above 1st.",
  },
  "Faerie Fire": {
    level: 1, school: "Evocation", time: "Action", range: "60 ft (20-ft cube)", components: "V", duration: "Concentration, up to 1 minute",
    text: "Objects in the cube are outlined in colored light, and so is each creature that fails a DEX save. Outlined creatures shed dim light, can't benefit from being invisible, and attack rolls against them have advantage.",
  },
  "Bane": {
    level: 1, school: "Enchantment", time: "Action", range: "30 ft", components: "V, S, M (a drop of blood)", duration: "Concentration, up to 1 minute",
    text: "Up to three creatures make CHA saves. Each that fails subtracts 1d4 from its attack rolls and saving throws for the duration.",
    higher: "One additional creature for each slot level above 1st.",
  },
  "Command": {
    level: 1, school: "Enchantment", time: "Action", range: "60 ft", components: "V", duration: "Instantaneous",
    text: "Speak a one-word command to a creature, which makes a WIS save or follows it on its next turn: Approach, Drop, Flee, Grovel (falls prone), or Halt.",
    higher: "One additional creature for each slot level above 1st.",
  },
  "Create or Destroy Water": {
    level: 1, school: "Transmutation", time: "Action", range: "30 ft", components: "V, S, M (a mix of water and sand)", duration: "Instantaneous",
    text: "Create up to 10 gallons of clean water in a container or as rain in a 30-ft cube (putting out exposed flames), or destroy that much water or fog.",
    higher: "+10 gallons and +5 ft of cube for each slot level above 1st.",
  },
  "Detect Evil and Good": {
    level: 1, school: "Divination", time: "Action", range: "Self", components: "V, S", duration: "Concentration, up to 10 minutes",
    text: "Sense the location of any aberration, celestial, elemental, fey, fiend or undead within 30 ft, and any place or object within 30 ft that has been magically consecrated or desecrated.",
  },
  "Detect Magic": {
    level: 1, school: "Divination", ritual: true, time: "Action", range: "Self", components: "V, S", duration: "Concentration, up to 10 minutes",
    text: "Sense the presence of magic within 30 ft. You can see a faint aura around any visible magical creature or object there and learn its school of magic.",
  },
  "Detect Poison and Disease": {
    level: 1, school: "Divination", ritual: true, time: "Action", range: "Self", components: "V, S, M (a yew leaf)", duration: "Concentration, up to 10 minutes",
    text: "Sense the location of poisons, poisonous or venomous creatures, and magical contagions within 30 ft, and identify each kind.",
  },
  "Inflict Wounds": {
    level: 1, school: "Necromancy", time: "Action", range: "Touch", components: "V, S", duration: "Instantaneous",
    text: "A creature you touch makes a CON save, taking 2d10 necrotic damage on a failure or half on a success.",
    higher: "+1d10 damage for each slot level above 1st.",
  },
  "Protection from Evil and Good": {
    level: 1, school: "Abjuration", time: "Action", range: "Touch", components: "V, S, M (holy water)", duration: "Concentration, up to 10 minutes",
    text: "Aberrations, celestials, elementals, fey, fiends and undead have disadvantage on attacks against the target, and can't possess, charm or frighten it.",
  },
  "Purify Food and Drink": {
    level: 1, school: "Transmutation", ritual: true, time: "Action", range: "10 ft", components: "V, S", duration: "Instantaneous",
    text: "Remove poison and rot from all nonmagical food and drink in a 5-ft-radius sphere.",
  },
  "Sanctuary": {
    level: 1, school: "Abjuration", time: "Bonus action", range: "30 ft", components: "V, S, M (a shard of glass)", duration: "1 minute",
    text: "Ward a creature. Anyone who targets it with an attack or harmful spell must first make a WIS save or pick a new target or lose the attack. The ward ends if the protected creature attacks, deals damage, or casts a spell that affects an enemy.",
  },
  "Ceremony": {
    level: 1, school: "Abjuration", ritual: true, time: "1 hour", range: "Touch", components: "V, S, M (25 gp of powdered silver, consumed)", duration: "Instantaneous",
    text: "Perform a sacred rite with a small magical benefit: atonement, bless water, coming of age, dedication, funeral rite, or wedding.",
  },
  "Spiritual Weapon": {
    level: 2, school: "Evocation", time: "Bonus action", range: "60 ft", components: "V, S", duration: "Concentration, up to 1 minute",
    text: "A floating spectral weapon appears. Make a melee spell attack against a creature within 5 ft of it: 1d8 + your spellcasting modifier force damage. On later turns, as a bonus action, move it up to 20 ft and attack again.",
    higher: "+1d8 damage for each slot level above 2nd.",
  },
  "Hold Person": {
    level: 2, school: "Enchantment", time: "Action", range: "60 ft", components: "V, S, M (a straight piece of iron)", duration: "Concentration, up to 1 minute",
    text: "A humanoid makes a WIS save or is paralyzed. It repeats the save at the end of each of its turns, ending the effect on a success.",
    higher: "One additional humanoid for each slot level above 2nd.",
  },
  "Prayer of Healing": {
    level: 2, school: "Abjuration", time: "10 minutes", range: "30 ft", components: "V", duration: "Instantaneous",
    text: "Up to five creatures each regain 2d8 + your spellcasting modifier hit points.",
    higher: "+1d8 healing for each slot level above 2nd.",
  },
  "Augury": {
    level: 2, school: "Divination", ritual: true, time: "1 minute", range: "Self", components: "V, S, M (specially marked tokens worth 25+ gp)", duration: "Instantaneous",
    text: "Receive an omen about a specific course of action you plan within the next 30 minutes: Weal, Woe, Weal and woe, or Indifference.",
  },
  "Blindness/Deafness": {
    level: 2, school: "Transmutation", time: "Action", range: "120 ft", components: "V", duration: "1 minute",
    text: "A creature makes a CON save or is blinded or deafened (your choice). It repeats the save at the end of each of its turns.",
    higher: "One additional creature for each slot level above 2nd.",
  },
  "Calm Emotions": {
    level: 2, school: "Enchantment", time: "Action", range: "60 ft", components: "V, S", duration: "Concentration, up to 1 minute",
    text: "Humanoids in a 20-ft-radius sphere make CHA saves. On a failure, either suppress any charm or fear on them, or make them indifferent to creatures they were hostile toward (ends if they're harmed).",
  },
  "Continual Flame": {
    level: 2, school: "Evocation", time: "Action", range: "Touch", components: "V, S, M (ruby dust worth 50 gp, consumed)", duration: "Until dispelled",
    text: "A heatless flame as bright as a torch burns from an object you touch. It can be covered but not smothered.",
  },
  "Enhance Ability": {
    level: 2, school: "Transmutation", time: "Action", range: "Touch", components: "V, S, M (fur or a feather)", duration: "Concentration, up to 1 hour",
    text: "Choose an ability. The creature you touch has advantage on ability checks using it.",
    higher: "One additional creature for each slot level above 2nd.",
  },
  "Find Traps": {
    level: 2, school: "Divination", time: "Action", range: "120 ft", components: "V, S", duration: "Instantaneous",
    text: "Sense whether any trap is within range and line of sight. You learn that it's there and its general nature, not its exact location.",
  },
  "Gentle Repose": {
    level: 2, school: "Necromancy", ritual: true, time: "Action", range: "Touch", components: "V, S, M (salt and a copper piece)", duration: "10 days",
    text: "A corpse is protected from decay and can't become undead. Days under this spell don't count toward the time limit on spells like Raise Dead.",
  },
  "Locate Object": {
    level: 2, school: "Divination", time: "Action", range: "Self", components: "V, S, M (a forked twig)", duration: "Concentration, up to 10 minutes",
    text: "Sense the direction of an object you're familiar with, or the nearest object of a kind you name, within 1,000 ft. Lead blocks it.",
  },
  "Protection from Poison": {
    level: 2, school: "Abjuration", time: "Action", range: "Touch", components: "V, S", duration: "1 hour",
    text: "End the poisoned condition on a creature you touch. For the duration it has advantage on saves against being poisoned and resistance to poison damage.",
  },
  "Silence": {
    level: 2, school: "Illusion", ritual: true, time: "Action", range: "120 ft", components: "V, S", duration: "Concentration, up to 10 minutes",
    text: "No sound can be made within or pass through a 20-ft-radius sphere. Creatures inside are deafened, immune to thunder damage, and can't cast spells with verbal components.",
  },
  "Warding Bond": {
    level: 2, school: "Abjuration", time: "Action", range: "Touch", components: "V, S, M (a pair of platinum rings worth 50+ gp each, worn by you both)", duration: "1 hour",
    text: "While within 60 ft of you, the target gets +1 AC and saving throws and resistance to all damage. Each time it takes damage, you take the same amount.",
  },
  "Zone of Truth": {
    level: 2, school: "Enchantment", time: "Action", range: "60 ft", components: "V, S", duration: "10 minutes",
    text: "Creatures in a 15-ft-radius sphere make a CHA save when they enter or start their turn there. On a failure, they can't deliberately lie while inside. You know who succeeded.",
  },
  "Daylight": {
    level: 3, school: "Evocation", time: "Action", range: "60 ft", components: "V, S", duration: "1 hour",
    text: "A 60-ft-radius sphere of bright light (and dim light 60 ft beyond) spreads from a point or object. It dispels any magical darkness of 3rd level or lower it touches.",
  },
  "Spirit Guardians": {
    level: 3, school: "Conjuration", time: "Action", range: "Self (15-ft emanation)", components: "V, S, M (a prayer scroll)", duration: "Concentration, up to 10 minutes",
    text: "Protective spirits surround you. Enemies of your choice in the area have their speed halved, and when one enters it or ends its turn there, it makes a WIS save, taking 3d8 radiant damage on a failure or half on a success.",
    higher: "+1d8 damage for each slot level above 3rd.",
  },
  "Revivify": {
    level: 3, school: "Necromancy", time: "Action", range: "Touch", components: "V, S, M (a diamond worth 300+ gp, consumed)", duration: "Instantaneous",
    text: "A creature that died within the last minute returns to life with 1 hit point. It can't undo death from old age or restore missing body parts.",
  },
  "Beacon of Hope": {
    level: 3, school: "Abjuration", time: "Action", range: "30 ft", components: "V, S", duration: "Concentration, up to 1 minute",
    text: "Any number of creatures have advantage on WIS saves and death saves, and regain the maximum possible hit points from any healing.",
  },
  "Mass Healing Word": {
    level: 3, school: "Abjuration", time: "Bonus action", range: "60 ft", components: "V", duration: "Instantaneous",
    text: "Up to six creatures each regain 2d4 + your spellcasting modifier hit points.",
    higher: "+1d4 healing for each slot level above 3rd.",
  },
  "Dispel Magic": {
    level: 3, school: "Abjuration", time: "Action", range: "120 ft", components: "V, S", duration: "Instantaneous",
    text: "End every spell of 3rd level or lower on one creature, object or magical effect. For each higher-level spell, make a spellcasting ability check (DC 10 + its level) to end it.",
    higher: "Automatically ends spells of a level up to the slot used.",
  },
  "Remove Curse": {
    level: 3, school: "Abjuration", time: "Action", range: "Touch", components: "V, S", duration: "Instantaneous",
    text: "End all curses affecting a creature or object. A cursed magic item keeps its curse, but its owner's attunement breaks so it can be removed.",
  },
  "Bestow Curse": {
    level: 3, school: "Necromancy", time: "Action", range: "Touch", components: "V, S", duration: "Concentration, up to 1 minute",
    text: "A creature makes a WIS save or is cursed. Choose: disadvantage on checks and saves with one ability; disadvantage on attacks against you; a WIS save each turn or it wastes its action; or +1d8 necrotic damage from your attacks and spells.",
    higher: "Higher slots extend the duration, up to permanent with a 9th-level slot.",
  },
  "Animate Dead": {
    level: 3, school: "Necromancy", time: "1 minute", range: "10 ft", components: "V, S, M (a drop of blood, a piece of flesh, and bone dust)", duration: "Instantaneous",
    text: "Raise a skeleton or zombie from a pile of bones or a corpse. As a bonus action, command your undead within 60 ft. Recast within 24 hours to keep control, or it turns on you.",
    higher: "Two more undead for each slot level above 3rd.",
  },
  "Clairvoyance": {
    level: 3, school: "Divination", time: "10 minutes", range: "1 mile", components: "V, S, M (a focus worth 100+ gp)", duration: "Concentration, up to 10 minutes",
    text: "Create an invisible sensor at a place you know, or an obvious location, within 1 mile. You can see or hear through it.",
  },
  "Create Food and Water": {
    level: 3, school: "Conjuration", time: "Action", range: "30 ft", components: "V, S", duration: "Instantaneous",
    text: "Create 45 pounds of bland, nourishing food and 30 gallons of fresh water, enough for fifteen creatures for a day. Uneaten food spoils after 24 hours.",
  },
  "Feign Death": {
    level: 3, school: "Necromancy", ritual: true, time: "Action", range: "Touch", components: "V, S, M (a pinch of graveyard dirt)", duration: "1 hour",
    text: "A willing creature appears dead. It's blinded and incapacitated with speed 0, but has resistance to all damage except psychic.",
  },
  "Glyph of Warding": {
    level: 3, school: "Abjuration", time: "1 hour", range: "Touch", components: "V, S, M (powdered diamond worth 200+ gp, consumed)", duration: "Until dispelled or triggered",
    text: "Inscribe a nearly invisible glyph that triggers when conditions you set are met. Explosive Runes: a 20-ft sphere of 5d8 damage of a type you choose (DEX save for half). Spell Glyph: store a spell of 3rd level or lower to go off when triggered.",
    higher: "+1d8 explosive damage for each slot level above 3rd.",
  },
  "Life Transference": {
    level: 3, school: "Necromancy", time: "Action", range: "30 ft", components: "V, S", duration: "Instantaneous",
    text: "You take 4d8 necrotic damage, which can't be reduced, and one creature of your choice regains twice that many hit points.",
    higher: "+1d8 for each slot level above 3rd.",
  },
  "Magic Circle": {
    level: 3, school: "Abjuration", time: "1 minute", range: "10 ft", components: "V, S, M (salt and powdered silver worth 100+ gp, consumed)", duration: "1 hour",
    text: "A 10-ft-radius, 20-ft-tall cylinder wards against celestials, elementals, fey, fiends or undead (choose). They can't willingly enter it by nonmagical means, have disadvantage on attacks against those inside, and can't charm, frighten or possess them. Can be reversed to trap one inside.",
    higher: "+1 hour for each slot level above 3rd.",
  },
  "Meld into Stone": {
    level: 3, school: "Transmutation", ritual: true, time: "Action", range: "Touch", components: "V, S", duration: "8 hours",
    text: "Step into a stone object or surface large enough to hold you. You can hear outside but not see; if the stone is destroyed, you're expelled and take damage.",
  },
  "Protection from Energy": {
    level: 3, school: "Abjuration", time: "Action", range: "Touch", components: "V, S", duration: "Concentration, up to 1 hour",
    text: "A willing creature has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder.",
  },
  "Sending": {
    level: 3, school: "Divination", time: "Action", range: "Unlimited", components: "V, S, M (a copper wire)", duration: "Instantaneous",
    text: "Send a message of 25 words or fewer to a creature you're familiar with. It hears you, recognizes you, and can reply in 25 words. Messages to other planes may fail.",
  },
  "Speak with Dead": {
    level: 3, school: "Necromancy", time: "Action", range: "10 ft", components: "V, S, M (burning incense)", duration: "10 minutes",
    text: "A corpse with a mouth answers up to five questions with what it knew in life. It isn't compelled to tell the truth.",
  },
  "Tongues": {
    level: 3, school: "Divination", time: "Action", range: "Touch", components: "V, M (a miniature ziggurat)", duration: "1 hour",
    text: "The target understands any spoken or signed language it hears, and any creature that knows a language understands it.",
  },
  "Water Walk": {
    level: 3, school: "Transmutation", ritual: true, time: "Action", range: "30 ft", components: "V, S, M (a piece of cork)", duration: "1 hour",
    text: "Up to ten willing creatures can move across any liquid surface, even acid or lava, as if it were harmless solid ground.",
  },
  "Guardian of Faith": {
    level: 4, school: "Conjuration", time: "Action", range: "30 ft", components: "V", duration: "8 hours",
    text: "A Large spectral guardian appears. Any enemy that moves within 10 ft of it for the first time on a turn, or starts its turn there, makes a DEX save, taking 20 radiant damage on a failure or half on a success. It vanishes after dealing 60 damage.",
  },
  "Banishment": {
    level: 4, school: "Abjuration", time: "Action", range: "30 ft", components: "V, S, M (a pentacle)", duration: "Concentration, up to 1 minute",
    text: "A creature makes a CHA save or is banished to a harmless demiplane, incapacitated. If it's native to another plane and the spell lasts the full minute, it doesn't come back.",
    higher: "One additional creature for each slot level above 4th.",
  },
  "Death Ward": {
    level: 4, school: "Abjuration", time: "Action", range: "Touch", components: "V, S", duration: "8 hours",
    text: "The first time the target would drop to 0 hit points, it drops to 1 instead, or an effect that would kill it instantly is negated. Then the spell ends.",
  },
  "Aura of Life": {
    level: 4, school: "Abjuration", time: "Action", range: "Self (30-ft emanation)", components: "V", duration: "Concentration, up to 10 minutes",
    text: "You and allies in the aura have resistance to necrotic damage and their hit point maximums can't be reduced. An ally at 0 hit points who starts its turn there regains 1 hit point.",
  },
  "Freedom of Movement": {
    level: 4, school: "Abjuration", time: "Action", range: "Touch", components: "V, S, M (a leather strap)", duration: "1 hour",
    text: "Difficult terrain doesn't slow the target, and magic can't reduce its speed, paralyze it or restrain it. It can spend 5 ft of movement to escape nonmagical bonds or grapples, and moves and attacks normally underwater.",
  },
  "Control Water": {
    level: 4, school: "Transmutation", time: "Action", range: "300 ft", components: "V, S, M (water and dust)", duration: "Concentration, up to 10 minutes",
    text: "Control freestanding water in up to a 100-ft cube: flood the area, part the water, redirect its flow, or form a whirlpool.",
  },
  "Divination": {
    level: 4, school: "Divination", ritual: true, time: "Action", range: "Self", components: "V, S, M (incense worth 25+ gp, consumed)", duration: "Instantaneous",
    text: "Ask your god one question about a goal, event or activity within the next 7 days and receive a truthful reply, perhaps a short phrase, a rhyme, or an omen.",
  },
  "Locate Creature": {
    level: 4, school: "Divination", time: "Action", range: "Self", components: "V, S, M (fur from a bloodhound)", duration: "Concentration, up to 1 hour",
    text: "Sense the direction of a creature you're familiar with, or the nearest creature of a kind you name, within 1,000 ft. Running water at least 10 ft wide blocks it.",
  },
  "Stone Shape": {
    level: 4, school: "Transmutation", time: "Action", range: "Touch", components: "V, S, M (soft clay)", duration: "Instantaneous",
    text: "Reshape a Medium or smaller stone object, or a 5-ft cube of stone, into any form: a crude weapon, a coffer, a passage, a sealed door.",
  },

  // ---- The Bird Keeper ----
  "Ray of Sickness": {
    level: 1, school: "Necromancy", time: "Action", range: "60 ft", components: "V, S", duration: "Instantaneous",
    text: "Make a ranged spell attack. On a hit, the target takes 2d8 poison damage and must succeed on a CON save or be poisoned until the end of your next turn.",
    higher: "+1d8 damage for each slot level above 1st.",
  },
  "Grease": {
    level: 1, school: "Conjuration", time: "Action", range: "60 ft", components: "V, S, M (a bit of pork rind or butter)", duration: "1 minute",
    text: "Slick grease covers a 10-ft square, making it difficult terrain. A creature there when it appears, or that enters it or ends its turn there, makes a DEX save or falls prone.",
  },
  "Absorb Elements": {
    level: 1, school: "Abjuration", time: "Reaction, when you take acid, cold, fire, lightning or thunder damage", range: "Self", components: "S", duration: "1 round",
    text: "You have resistance to the triggering damage type until the start of your next turn, and your first melee hit on your next turn deals an extra 1d6 damage of that type.",
    higher: "+1d6 damage for each slot level above 1st.",
  },
  "Alarm": {
    level: 1, school: "Abjuration", ritual: true, time: "1 minute", range: "30 ft", components: "V, S, M (a bell and silver wire)", duration: "8 hours",
    text: "Ward a door, window, or area up to a 20-ft cube. When a creature you didn't exclude enters it, you get a mental ping (which wakes you) or an audible bell heard 60 ft away.",
  },
  "Catapult": {
    level: 1, school: "Transmutation", time: "Action", range: "60 ft", components: "S", duration: "Instantaneous",
    text: "Hurl an unattended object of 1 to 5 pounds up to 90 ft. The first creature in its path makes a DEX save or takes 3d8 bludgeoning damage.",
    higher: "+1d8 damage and heavier objects for each slot level above 1st.",
  },
  "Expeditious Retreat": {
    level: 1, school: "Transmutation", time: "Bonus action", range: "Self", components: "V, S", duration: "Concentration, up to 10 minutes",
    text: "Take the Dash action now, and again as a bonus action on each of your turns until the spell ends.",
  },
  "Feather Fall": {
    level: 1, school: "Transmutation", time: "Reaction, when you or a creature within 60 ft falls", range: "60 ft", components: "V, M (a small feather)", duration: "1 minute",
    text: "Up to five falling creatures descend at 60 ft per round and take no falling damage when they land.",
  },
  "Identify": {
    level: 1, school: "Divination", ritual: true, time: "1 minute", range: "Touch", components: "V, S, M (a pearl worth 100+ gp)", duration: "Instantaneous",
    text: "Learn a magic item's properties, how to use them, its charges, and whether it needs attunement. Or learn which spells are affecting a creature or object you touch.",
  },
  "Jump": {
    level: 1, school: "Transmutation", time: "Bonus action", range: "Touch", components: "V, S, M (a grasshopper's leg)", duration: "1 minute",
    text: "Once on each of its turns, the target can jump up to 30 ft by spending 10 ft of movement.",
    higher: "One additional creature for each slot level above 1st.",
  },
  "Longstrider": {
    level: 1, school: "Transmutation", time: "Action", range: "Touch", components: "V, S, M (a pinch of dirt)", duration: "1 hour",
    text: "The target's speed increases by 10 ft.",
    higher: "One additional creature for each slot level above 1st.",
  },
  "Snare": {
    level: 1, school: "Abjuration", time: "1 minute", range: "Touch", components: "S, M (25 ft of rope, consumed)", duration: "8 hours",
    text: "Set a nearly invisible trap in a 5-ft circle (an Investigation check against your DC spots it). A creature that enters makes a DEX save or is hoisted upside down 3 ft in the air and restrained. It can repeat the save each turn.",
  },
  "Acid Arrow": {
    level: 2, school: "Evocation", time: "Action", range: "90 ft", components: "V, S, M (powdered rhubarb leaf)", duration: "Instantaneous",
    text: "Make a ranged spell attack. On a hit, the target takes 4d4 acid damage, plus 2d4 more at the end of its next turn. On a miss, it takes half the initial damage only.",
    higher: "+1d4 to both the initial and later damage for each slot level above 2nd.",
  },
  "Web": {
    level: 2, school: "Conjuration", time: "Action", range: "60 ft", components: "V, S, M (a bit of spiderweb)", duration: "Concentration, up to 1 hour",
    text: "Sticky webs fill a 20-ft cube, making difficult terrain and light obscurement. A creature that starts its turn in them or enters them makes a DEX save or is restrained; it can use an action to try to break free with a STR (Athletics) check. The webs burn away if lit.",
  },
  "Heat Metal": {
    level: 2, school: "Transmutation", time: "Action", range: "60 ft", components: "V, S, M (a piece of iron and a flame)", duration: "Concentration, up to 1 minute",
    text: "A metal object glows red-hot. A creature touching it takes 2d8 fire damage, and again whenever you use a bonus action on later turns. A creature holding or wearing it must make a CON save or drop it, or else has disadvantage on attacks and checks until your next turn.",
    higher: "+1d8 damage for each slot level above 2nd.",
  },
  "Invisibility": {
    level: 2, school: "Illusion", time: "Action", range: "Touch", components: "V, S, M (an eyelash in gum arabic)", duration: "Concentration, up to 1 hour",
    text: "A creature you touch becomes invisible until it attacks, deals damage, or casts a spell.",
    higher: "One additional creature for each slot level above 2nd.",
  },
  "Enlarge/Reduce": {
    level: 2, school: "Transmutation", time: "Action", range: "30 ft", components: "V, S, M (a pinch of powdered iron)", duration: "Concentration, up to 1 minute",
    text: "A creature or object grows one size (advantage on STR checks and saves, +1d4 weapon damage) or shrinks one size (disadvantage on STR checks and saves, \u22121d4 weapon damage). An unwilling creature makes a CON save.",
  },
  "Blur": {
    level: 2, school: "Illusion", time: "Action", range: "Self", components: "V", duration: "Concentration, up to 1 minute",
    text: "Your body becomes blurred. Attack rolls against you have disadvantage, unless the attacker doesn't rely on sight.",
  },
  "Alter Self": {
    level: 2, school: "Transmutation", time: "Action", range: "Self", components: "V, S", duration: "Concentration, up to 1 hour",
    text: "Choose a form: Aquatic Adaptation (gills and a swim speed), Change Appearance (look like someone else of a similar shape), or Natural Weapons (magical claws, fangs or horns that deal 1d6 damage). You can switch forms as an action.",
  },
  "Arcane Lock": {
    level: 2, school: "Abjuration", time: "Action", range: "Touch", components: "V, S, M (gold dust worth 25+ gp, consumed)", duration: "Until dispelled",
    text: "Magically lock a door, window, gate or chest. You and creatures you choose can open it normally; others need a password you set, Knock, or a break DC raised by 10.",
  },
  "Darkvision": {
    level: 2, school: "Transmutation", time: "Action", range: "Touch", components: "V, S, M (a dried carrot)", duration: "8 hours",
    text: "A willing creature gains darkvision out to 150 ft.",
  },
  "Levitate": {
    level: 2, school: "Transmutation", time: "Action", range: "60 ft", components: "V, S, M (a metal spring)", duration: "Concentration, up to 10 minutes",
    text: "A creature or loose object of up to 500 pounds rises up to 20 ft and hovers. You can move it up or down 20 ft on your turn. An unwilling creature makes a CON save.",
  },
  "Magic Mouth": {
    level: 2, school: "Illusion", ritual: true, time: "1 minute", range: "30 ft", components: "V, S, M (jade dust worth 10+ gp, consumed)", duration: "Until dispelled",
    text: "Implant a message of up to 25 words in an object. A magical mouth speaks it aloud when a trigger you set occurs.",
  },
  "Magic Weapon": {
    level: 2, school: "Transmutation", time: "Bonus action", range: "Touch", components: "V, S", duration: "1 hour",
    text: "A nonmagical weapon becomes a +1 magic weapon.",
    higher: "Becomes +2 or +3 with higher-level slots.",
  },
  "Pyrotechnics": {
    level: 2, school: "Transmutation", time: "Action", range: "60 ft", components: "V, S", duration: "Instantaneous",
    text: "Use a nonmagical flame within range, which then goes out. Fireworks: creatures within 10 ft of it make a CON save or are blinded until the end of your next turn. Smoke: thick smoke fills a 20-ft radius around it for 1 minute, heavily obscuring the area.",
  },
  "See Invisibility": {
    level: 2, school: "Divination", time: "Action", range: "Self", components: "V, S, M (talc and powdered silver)", duration: "1 hour",
    text: "You see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane.",
  },
  "Skywrite": {
    level: 2, school: "Transmutation", ritual: true, time: "Action", range: "Sight", components: "V, S", duration: "Concentration, up to 1 hour",
    text: "Write up to ten words in the clouds, readable from far away.",
  },
  "Spider Climb": {
    level: 2, school: "Transmutation", time: "Action", range: "Touch", components: "V, S, M (a drop of bitumen and a spider)", duration: "Concentration, up to 1 hour",
    text: "The target can move up, down and across walls and upside down along ceilings with its hands free, and gains a climb speed equal to its walking speed.",
    higher: "One additional creature for each slot level above 2nd.",
  },
};
