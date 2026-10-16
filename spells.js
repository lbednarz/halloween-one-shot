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
};
