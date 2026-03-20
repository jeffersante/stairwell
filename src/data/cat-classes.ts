import type { CatClass } from '../types';

export const allCatClasses: CatClass[] = [
  // ══════════════════════════════════════════════════════════════
  //  SHADOW CAT — Stealth & critical hits
  // ══════════════════════════════════════════════════════════════
  {
    id: 'shadow_cat',
    name: 'Shadow Cat',
    emoji: '🐈‍⬛',
    description: 'A creature of darkness and precision. Strikes from the shadows, leaves before you notice.',
    flavorText: 'You didn\'t see it arrive. You won\'t see it leave. You will, however, see the damage.',
    passive: {
      name: 'Shadow Strike',
      description: '+10% critical hit chance on all attacks.',
      effect: 'crit_chance',
      value: 10,
    },
    abilities: [
      {
        name: 'Shadow Strike',
        description: 'Leap from the shadows for a devastating critical attack. Always crits if the enemy hasn\'t acted yet this combat.',
        levelRequired: 1,
        cooldown: 3,
        damage: 12,
        effect: 'crit_boost',
        effectValue: 100,
      },
      {
        name: 'Vanish',
        description: 'Melt into darkness. The enemy loses track of the player, skipping their next attack.',
        levelRequired: 3,
        cooldown: 4,
        effect: 'skip_enemy_turn',
      },
      {
        name: 'Ambush',
        description: 'Set up the perfect attack. Next player attack deals triple damage.',
        levelRequired: 5,
        cooldown: 5,
        effect: 'crit_boost',
        effectValue: 200,
      },
      {
        name: 'Shadow Step',
        description: 'Phase through the enemy\'s attack, dodging completely and counterattacking.',
        levelRequired: 7,
        cooldown: 4,
        damage: 8,
        effect: 'dodge',
        effectValue: 1,
      },
      {
        name: 'Phantom Whiskers',
        description: 'The cat exists in multiple places at once. Three shadow strikes in rapid succession.',
        levelRequired: 9,
        cooldown: 6,
        damage: 24,
        effect: 'crit_boost',
        effectValue: 50,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  BATTLE CAT — Tank & damage dealer
  // ══════════════════════════════════════════════════════════════
  {
    id: 'battle_cat',
    name: 'Battle Cat',
    emoji: '🦁',
    description: 'Built like a small, furry tank. Charges headfirst into everything. Has never heard of "subtlety."',
    flavorText: 'It doesn\'t dodge. It doesn\'t hide. It doesn\'t negotiate. It headbutts the problem until the problem stops.',
    passive: {
      name: 'Iron Fur',
      description: '+2 to player Armor Class.',
      effect: 'armor_class',
      value: 2,
    },
    abilities: [
      {
        name: 'Pounce',
        description: 'Launch at the enemy with claws extended. High damage, low subtlety.',
        levelRequired: 1,
        cooldown: 2,
        damage: 10,
      },
      {
        name: 'War Cry',
        description: 'A thunderous yowl that shakes the room. Stuns the enemy for one turn.',
        levelRequired: 3,
        cooldown: 4,
        effect: 'skip_enemy_turn',
      },
      {
        name: 'Cat Shield',
        description: 'The cat plants itself between you and danger. Absorbs the next hit entirely.',
        levelRequired: 5,
        cooldown: 5,
        effect: 'shield',
        effectValue: 20,
      },
      {
        name: 'Frenzy',
        description: 'Three rapid claw attacks. Each hit has a chance to cause bleed.',
        levelRequired: 7,
        cooldown: 4,
        damage: 18,
      },
      {
        name: 'Last Stand',
        description: 'When player HP drops below 20%, the cat goes berserk. Double damage and +4 AC until combat ends or HP is restored.',
        levelRequired: 9,
        cooldown: 8,
        damage: 15,
        effect: 'shield',
        effectValue: 4,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  MYSTIC CAT — Spell support & mana
  // ══════════════════════════════════════════════════════════════
  {
    id: 'mystic_cat',
    name: 'Mystic Cat',
    emoji: '🐱',
    description: 'Its eyes glow with eldritch knowledge. It has seen the other side. It was unimpressed.',
    flavorText: 'The ancient Egyptians worshipped cats. This one knows why and thinks they didn\'t worship hard enough.',
    passive: {
      name: 'Arcane Reservoir',
      description: '+1 maximum mana (Compliance Points).',
      effect: 'max_mana',
      value: 1,
    },
    abilities: [
      {
        name: 'Arcane Purr',
        description: 'A soothing, mystical vibration that restores mana to the player.',
        levelRequired: 1,
        cooldown: 3,
        effect: 'mana_restore',
        effectValue: 3,
      },
      {
        name: 'Third Eye',
        description: 'The cat opens its third eye. Reveals all traps and hidden items on the current floor.',
        levelRequired: 3,
        cooldown: 6,
        effect: 'reveal_trap',
      },
      {
        name: 'Hex',
        description: 'Curse the enemy, reducing their damage and accuracy for 3 turns.',
        levelRequired: 5,
        cooldown: 4,
        damage: 6,
        effect: 'skip_enemy_turn',
      },
      {
        name: 'Mana Drain',
        description: 'Siphon energy from the enemy to restore player mana. Deals minor damage.',
        levelRequired: 7,
        cooldown: 3,
        damage: 5,
        effect: 'mana_restore',
        effectValue: 4,
      },
      {
        name: 'Ninth Life',
        description: 'Channel the power of all nine lives. If the player would die, restore them to 25% HP instead. Once per floor.',
        levelRequired: 9,
        cooldown: 0,
        healing: 25,
        effect: 'heal_player',
        effectValue: 25,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  ALLEY CAT — Theft & utility
  // ══════════════════════════════════════════════════════════════
  {
    id: 'alley_cat',
    name: 'Alley Cat',
    emoji: '😼',
    description: 'Street-smart and morally flexible. Will steal anything not nailed down. Will also steal the nails.',
    flavorText: 'Born in a dumpster behind a haunted Arby\'s. Has never lost a fight or a confidence game.',
    passive: {
      name: 'Sticky Paws',
      description: '+15% gold from all sources.',
      effect: 'gold_bonus',
      value: 15,
    },
    abilities: [
      {
        name: 'Pickpocket',
        description: 'Swipe an item from the enemy mid-combat. What they don\'t know can\'t hurt them. It CAN hurt you, though.',
        levelRequired: 1,
        cooldown: 3,
        effect: 'steal_item',
      },
      {
        name: 'Dumpster Dive',
        description: 'The cat disappears into a mysterious corner and returns with a random consumable item. The item smells questionable.',
        levelRequired: 3,
        cooldown: 5,
        effect: 'steal_item',
      },
      {
        name: 'Cat Burglar',
        description: 'Steal the enemy\'s next action, preventing their attack and gaining gold equal to its damage.',
        levelRequired: 5,
        cooldown: 4,
        effect: 'gold_steal',
        effectValue: 1,
      },
      {
        name: 'Lucky Landing',
        description: 'The cat always lands on its feet. Negate all trap damage on the current room.',
        levelRequired: 7,
        cooldown: 0,
        effect: 'dodge',
        effectValue: 1,
      },
      {
        name: 'Nine-Tailed Scheme',
        description: 'Execute an elaborate heist. Steal gold, an item, AND skip the enemy\'s turn. The perfect crime.',
        levelRequired: 9,
        cooldown: 7,
        damage: 10,
        effect: 'gold_steal',
        effectValue: 50,
      },
    ],
  },
];

export function getCatClassById(id: string): CatClass | undefined {
  return allCatClasses.find(c => c.id === id);
}
