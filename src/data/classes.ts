import type { PlayerClass } from '../types';

export const allClasses: PlayerClass[] = [
  // ══════════════════════════════════════════════════════════════
  //  JANITOR — STR+2, CON+1. Melee specialist.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'janitor',
    name: 'Janitor',
    emoji: '🧹',
    description: 'Melee specialist. Hits hard, takes harder.',
    flavorText: 'The building is filthy. You are the solution. Also the problem, but mostly the solution.',
    statBonuses: { str: 2, con: 1 },
    startingWeaponId: 'c_mop_of_destiny',
    startingArmorId: 'c_jumpsuit_armor',
    signatureAbility: {
      name: 'Clean Sweep',
      description: 'A devastating AoE mop strike that hits everything in the room.',
      levelRequired: 1,
      cooldown: 4,
      effect: { type: 'aoe_damage', dice: '2d8' },
    },
    abilityTree: [
      {
        name: 'Double Bucket',
        description: 'Raise two buckets as shield and weapon. Block next attack and counter.',
        levelRequired: 3,
        cooldown: 3,
        effect: { type: 'buff', stat: 'con', amount: 3, duration: 2 },
      },
      {
        name: 'Hazmat Protocol',
        description: 'Activate hazmat training. Immune to poison and bleed for 3 turns.',
        levelRequired: 6,
        cooldown: 5,
        effect: { type: 'debuff_enemy', effect: 'poison', duration: 0 },
      },
      {
        name: 'Master Key',
        description: 'Open any locked room or chest. Some doors were never meant to open.',
        levelRequired: 9,
        cooldown: 8,
        effect: { type: 'reveal' },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  IT SPECIALIST — INT+2, DEX+1. Debuff/hacker.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'it_specialist',
    name: 'IT Specialist',
    emoji: '💻',
    description: 'Debuff expert. Controls the battlefield through superior tech.',
    flavorText: 'Have you tried turning it off and on again? No? Then perish.',
    statBonuses: { int: 2, dex: 1 },
    startingWeaponId: 'c_keyboard_ancient',
    signatureAbility: {
      name: 'System Override',
      description: 'Hack the enemy\'s nervous system. Stun for 2 turns.',
      levelRequired: 1,
      cooldown: 3,
      effect: { type: 'stun', duration: 2 },
    },
    abilityTree: [
      {
        name: 'Firewall',
        description: 'Deploy a digital barrier. Reflect the next attack back at the enemy.',
        levelRequired: 3,
        cooldown: 4,
        effect: { type: 'buff', stat: 'dex', amount: 4, duration: 1 },
      },
      {
        name: 'Root Access',
        description: 'Steal an enemy buff and apply it to yourself.',
        levelRequired: 6,
        cooldown: 5,
        effect: { type: 'debuff_enemy', effect: 'cursed', duration: 3 },
      },
      {
        name: 'rm -rf',
        description: 'Delete everything. Massive damage, but 30% chance to also damage yourself.',
        levelRequired: 9,
        cooldown: 6,
        effect: { type: 'damage', dice: '4d10', bonus: 5 },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  HR MANAGER — CHA+2, WIS+1. Support/healer.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'hr_manager',
    name: 'HR Manager',
    emoji: '📋',
    description: 'Support specialist. Heals, buffs, and resolves conflicts professionally.',
    flavorText: 'Let\'s schedule a one-on-one to discuss your imminent demise.',
    statBonuses: { cha: 2, wis: 1 },
    startingWeaponId: 'c_passive_aggressive_memo',
    startingArmorId: 'c_three_ring_binder',
    signatureAbility: {
      name: 'Mandatory Fun',
      description: 'Heal 3d6 HP and gain 50 viewers. Team building saves lives.',
      levelRequired: 1,
      cooldown: 4,
      effect: { type: 'heal', amount: 12 },
    },
    abilityTree: [
      {
        name: 'Conflict Resolution',
        description: 'End combat peacefully. Receive half the gold reward.',
        levelRequired: 3,
        cooldown: 5,
        effect: { type: 'viewer_boost', amount: 50 },
      },
      {
        name: 'Team Building Exercise',
        description: 'Your cat companion acts twice on their next turn.',
        levelRequired: 6,
        cooldown: 4,
        effect: { type: 'buff', stat: 'cha', amount: 3, duration: 2 },
      },
      {
        name: 'Termination Letter',
        description: 'Instant kill if enemy is below 25% HP. You\'re fired.',
        levelRequired: 9,
        cooldown: 6,
        effect: { type: 'damage', dice: '6d12', bonus: 0 },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  INTERN — All stats 8. XP gain x2. Glass cannon potential.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'intern',
    name: 'Intern',
    emoji: '😰',
    description: 'Weak stats, but learns twice as fast. The ultimate underdog.',
    flavorText: 'First day. No training. No equipment. No dental. Good luck.',
    statBonuses: {},
    startingWeaponId: 'c_clipboard',
    signatureAbility: {
      name: 'Desperate Initiative',
      description: 'Reroll any die result. Sometimes panic is a strategy.',
      levelRequired: 1,
      cooldown: 2,
      effect: { type: 'reroll' },
    },
    abilityTree: [
      {
        name: 'Coffee Run',
        description: 'Sprint to the breakroom and back. Restore 2 mana.',
        levelRequired: 3,
        cooldown: 3,
        manaCost: 0,
        effect: { type: 'heal', amount: 8 },
      },
      {
        name: 'Learn Fast',
        description: 'Copy the enemy\'s last attack and use it against them.',
        levelRequired: 6,
        cooldown: 4,
        effect: { type: 'damage', dice: '2d8', bonus: 3 },
      },
      {
        name: 'Promotion',
        description: 'Permanently gain +2 to two stats of your choice. You earned this.',
        levelRequired: 9,
        cooldown: 0,
        effect: { type: 'buff', stat: 'str', amount: 2, duration: 999 },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  NIGHT SECURITY — CON+2, STR+1. Balanced fighter.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'night_security',
    name: 'Night Security',
    emoji: '🔦',
    description: 'Balanced fighter with high survivability. Sees what others miss.',
    flavorText: 'Third shift. Every shift. The building never sleeps. Neither do you.',
    statBonuses: { con: 2, str: 1 },
    startingWeaponId: 'c_maglite_flashlight',
    startingArmorId: 'c_security_vest',
    signatureAbility: {
      name: 'Flashlight Beam',
      description: 'Blind and stun an enemy for 1 turn. Also reveals hidden threats.',
      levelRequired: 1,
      cooldown: 3,
      effect: { type: 'stun', duration: 1 },
    },
    abilityTree: [
      {
        name: 'Patrol Route',
        description: 'See all room types on the current floor before entering.',
        levelRequired: 3,
        cooldown: 6,
        effect: { type: 'reveal' },
      },
      {
        name: 'Lockdown',
        description: 'Enemy can\'t flee or phase shift. Gain +2 AC for 3 turns.',
        levelRequired: 6,
        cooldown: 5,
        effect: { type: 'buff', stat: 'con', amount: 2, duration: 3 },
      },
      {
        name: 'Code Red',
        description: 'Summon backup. Extra attack each turn for 3 turns.',
        levelRequired: 9,
        cooldown: 7,
        effect: { type: 'damage', dice: '2d10', bonus: 4 },
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  //  ACCOUNTANT — WIS+2, INT+1. Luck/gold specialist.
  // ══════════════════════════════════════════════════════════════
  {
    id: 'accountant',
    name: 'Accountant',
    emoji: '🧮',
    description: 'Gold specialist. Converts money to power and power to money.',
    flavorText: 'The numbers don\'t lie. But they do occasionally commit fraud.',
    statBonuses: { wis: 2, int: 1 },
    startingWeaponId: 'c_calculator_weapon',
    signatureAbility: {
      name: 'Creative Accounting',
      description: 'Convert 10 gold to 2d10 damage, OR deal damage to gain gold.',
      levelRequired: 1,
      cooldown: 3,
      effect: { type: 'gold_convert', ratio: 2 },
    },
    abilityTree: [
      {
        name: 'Tax Write-Off',
        description: 'Reduce shop prices by 30% for the rest of the floor.',
        levelRequired: 3,
        cooldown: 0,
        effect: { type: 'viewer_boost', amount: 25 },
      },
      {
        name: 'Audit',
        description: 'Steal enemy\'s strongest ability for 3 turns.',
        levelRequired: 6,
        cooldown: 5,
        effect: { type: 'debuff_enemy', effect: 'cursed', duration: 3 },
      },
      {
        name: 'Bankruptcy',
        description: 'Spend ALL gold for massive damage: 1 damage per 2 gold spent.',
        levelRequired: 9,
        cooldown: 8,
        effect: { type: 'gold_convert', ratio: 0.5 },
      },
    ],
  },
];

export function getClassById(id: string): PlayerClass | undefined {
  return allClasses.find(c => c.id === id);
}
