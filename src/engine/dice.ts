import type { DiceRoll, DieType, PlayerStats } from '../types';

const DIE_REGEX = /^(\d+)d(\d+)(?:kh(\d+))?([+-]\d+)?$/;

function dieSidesToType(sides: number): DieType {
  const map: Record<number, DieType> = { 4: 'd4', 6: 'd6', 8: 'd8', 10: 'd10', 12: 'd12', 20: 'd20' };
  return map[sides] ?? 'd6';
}

export function rollDie(sides: number, rng: () => number): number {
  return Math.floor(rng() * sides) + 1;
}

export function rollDice(notation: string, rng: () => number): DiceRoll {
  const match = notation.match(DIE_REGEX);
  if (!match) {
    return { die: 'd6', count: 1, modifier: 0, results: [1], total: 1, isCritical: false, isFumble: false };
  }

  const count = parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const keepHighest = match[3] ? parseInt(match[3], 10) : undefined;
  const modifier = match[4] ? parseInt(match[4], 10) : 0;

  const results: number[] = [];
  for (let i = 0; i < count; i++) {
    results.push(rollDie(sides, rng));
  }

  let keptResults = results;
  if (keepHighest !== undefined && keepHighest < count) {
    keptResults = [...results].sort((a, b) => b - a).slice(0, keepHighest);
  }

  const diceSum = keptResults.reduce((sum, r) => sum + r, 0);
  const total = diceSum + modifier;

  const isCritical = sides === 20 && count === 1 && results[0] === 20;
  const isFumble = sides === 20 && count === 1 && results[0] === 1;

  return {
    die: dieSidesToType(sides),
    count,
    modifier,
    results,
    total,
    isCritical,
    isFumble,
  };
}

export function rollAttack(
  hitBonus: number,
  targetAC: number,
  rng: () => number
): { hit: boolean; roll: DiceRoll; critical: boolean; fumble: boolean } {
  const roll = rollDice('1d20', rng);
  const attackTotal = roll.total + hitBonus;

  if (roll.isFumble) {
    return { hit: false, roll, critical: false, fumble: true };
  }

  if (roll.isCritical) {
    return { hit: true, roll, critical: true, fumble: false };
  }

  return {
    hit: attackTotal >= targetAC,
    roll,
    critical: false,
    fumble: false,
  };
}

export function rollDamage(notation: string, rng: () => number, critical: boolean): DiceRoll {
  const match = notation.match(DIE_REGEX);
  if (!match) {
    return { die: 'd6', count: 1, modifier: 0, results: [1], total: 1, isCritical: false, isFumble: false };
  }

  const count = parseInt(match[1], 10);
  const sides = parseInt(match[2], 10);
  const modifier = match[4] ? parseInt(match[4], 10) : 0;

  const diceCount = critical ? count * 2 : count;
  const results: number[] = [];
  for (let i = 0; i < diceCount; i++) {
    results.push(rollDie(sides, rng));
  }

  const diceSum = results.reduce((sum, r) => sum + r, 0);
  const total = diceSum + modifier;

  return {
    die: dieSidesToType(sides),
    count: diceCount,
    modifier,
    results,
    total: Math.max(total, 1),
    isCritical: critical,
    isFumble: false,
  };
}

export function rollSave(
  stat: number,
  dc: number,
  rng: () => number
): { success: boolean; roll: DiceRoll } {
  const roll = rollDice('1d20', rng);
  const saveTotal = roll.total + getStatModifier(stat);

  if (roll.isCritical) return { success: true, roll };
  if (roll.isFumble) return { success: false, roll };

  return { success: saveTotal >= dc, roll };
}

export function rollStats(rng: () => number): PlayerStats {
  const rollStat = (): number => {
    const rolls = [rollDie(6, rng), rollDie(6, rng), rollDie(6, rng), rollDie(6, rng)];
    rolls.sort((a, b) => b - a);
    return rolls[0] + rolls[1] + rolls[2]; // drop lowest
  };

  return {
    str: rollStat(),
    dex: rollStat(),
    con: rollStat(),
    int: rollStat(),
    wis: rollStat(),
    cha: rollStat(),
  };
}

export function getStatModifier(stat: number): number {
  return Math.floor((stat - 10) / 2);
}

export function rollAttackSequence(
  hitBonus: number,
  targetAC: number,
  damageDice: string,
  rng: () => number
): { attackRoll: DiceRoll; hit: boolean; critical: boolean; fumble: boolean; damageRoll: DiceRoll | null } {
  const attack = rollAttack(hitBonus, targetAC, rng);

  let damageRoll: DiceRoll | null = null;
  if (attack.hit) {
    damageRoll = rollDamage(damageDice, rng, attack.critical);
  }

  return {
    attackRoll: attack.roll,
    hit: attack.hit,
    critical: attack.critical,
    fumble: attack.fumble,
    damageRoll,
  };
}
