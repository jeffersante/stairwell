import type { CatAbility, CatState } from '../types';
import { clamp } from '../utils';

const CAT_ABILITIES: CatAbility[] = [
  {
    name: 'Scratch',
    description: 'A quick swipe with surprisingly sharp claws.',
    levelRequired: 1,
    damage: 8,
    cooldown: 0,
  },
  {
    name: 'Hiss',
    description: 'An intimidating hiss that weakens the enemy.',
    levelRequired: 2,
    effect: 'skip_enemy_turn',
    cooldown: 0,
  },
  {
    name: 'Distract',
    description: 'Knocks something off a ledge. Enemy loses their turn.',
    levelRequired: 3,
    effect: 'skip_enemy_turn',
    cooldown: 3,
  },
  {
    name: 'Steal',
    description: 'Snatches something shiny from the enemy.',
    levelRequired: 4,
    effect: 'steal_item',
    cooldown: 4,
  },
  {
    name: 'Weaponized Indifference',
    description: 'Stares at the enemy with such contempt it deals psychic damage.',
    levelRequired: 5,
    damage: 40,
    cooldown: 5,
  },
];

const LEVEL_THRESHOLDS = [0, 10, 30, 60, 100, 150];

export function initCat(name: string): CatState {
  return {
    name,
    level: 1,
    bond: 50,
    xp: 0,
    abilities: [CAT_ABILITIES[0]],
    cooldowns: {},
    mood: 'aloof',
  };
}

export function getCatMood(bond: number, _recentEvents: string[]): CatState['mood'] {
  if (bond >= 80) return 'affectionate';
  if (bond >= 60) return 'curious';
  if (bond >= 40) return 'aloof';
  if (bond >= 20) return 'judging';
  return 'furious';
}

export function updateBond(cat: CatState, change: number): CatState {
  return {
    ...cat,
    bond: clamp(cat.bond + change, 0, 100),
    mood: getCatMood(clamp(cat.bond + change, 0, 100), []),
  };
}

export function catGainXp(cat: CatState, xp: number): { cat: CatState; leveled: boolean; newAbilities: CatAbility[] } {
  const newXp = cat.xp + xp;
  let newLevel = cat.level;
  const newAbilities: CatAbility[] = [];

  while (newLevel < LEVEL_THRESHOLDS.length - 1 && newXp >= LEVEL_THRESHOLDS[newLevel]) {
    newLevel++;
    const ability = CAT_ABILITIES.find(a => a.levelRequired === newLevel);
    if (ability) {
      newAbilities.push(ability);
    }
  }

  const abilities = newLevel > cat.level
    ? CAT_ABILITIES.filter(a => a.levelRequired <= newLevel)
    : cat.abilities;

  return {
    cat: { ...cat, xp: newXp, level: newLevel, abilities },
    leveled: newLevel > cat.level,
    newAbilities,
  };
}

export function getCatAction(cat: CatState, abilityName: string): { damage: number; effect?: CatAbility['effect']; description: string } | null {
  const ability = cat.abilities.find(a => a.name === abilityName);
  if (!ability) return null;

  const currentCd = cat.cooldowns[abilityName] ?? 0;
  if (currentCd > 0) return null;

  const bondMultiplier = 0.5 + (cat.bond / 100) * 0.5;
  const damage = ability.damage ? Math.round(ability.damage * bondMultiplier) : 0;

  return {
    damage,
    effect: ability.effect,
    description: `${cat.name} uses ${ability.name}!`,
  };
}

export function tickCooldowns(cat: CatState): CatState {
  const cooldowns: Record<string, number> = {};
  for (const [name, cd] of Object.entries(cat.cooldowns)) {
    if (cd > 1) {
      cooldowns[name] = cd - 1;
    }
  }
  return { ...cat, cooldowns };
}

export function getCatXpForAction(action: 'combat_win' | 'boss_win' | 'pet' | 'item_use'): number {
  switch (action) {
    case 'combat_win': return 3;
    case 'boss_win': return 10;
    case 'pet': return 5;
    case 'item_use': return 1;
  }
}

export function getCatLevelThreshold(level: number): number {
  if (level < 0 || level >= LEVEL_THRESHOLDS.length) return Infinity;
  return LEVEL_THRESHOLDS[level];
}

export function checkCatLevelUp(cat: CatState): { leveled: boolean; newAbilities: CatAbility[] } {
  if (cat.level >= LEVEL_THRESHOLDS.length - 1) return { leveled: false, newAbilities: [] };
  if (cat.xp >= LEVEL_THRESHOLDS[cat.level]) {
    const newAbilities = CAT_ABILITIES.filter(
      a => a.levelRequired === cat.level + 1
    );
    return { leveled: true, newAbilities };
  }
  return { leveled: false, newAbilities: [] };
}
