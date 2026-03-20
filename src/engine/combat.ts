import type { CombatState, Enemy, RunState, ItemAction, StatusEffect, EnemyAction } from '../types';
import { clamp } from '../utils';

export function initCombat(enemy: Enemy): CombatState {
  return {
    enemy,
    enemyHp: enemy.hp,
    enemyMaxHp: enemy.hp,
    turn: 1,
    playerStatuses: [],
    enemyStatuses: [],
    enemyNextAction: enemy.actions[0],
    log: [`${enemy.name} appears!`],
  };
}

export interface CombatActionResult {
  damage: number;
  healing: number;
  shield: number;
  effects: { effect: StatusEffect; turns: number }[];
  logEntries: string[];
  viewerChange: number;
}

export function getAvailableActions(runState: RunState): { source: string; action: ItemAction }[] {
  const actions: { source: string; action: ItemAction }[] = [];

  const { weapon, armor, accessory } = runState.equipment;
  if (weapon) {
    for (const action of weapon.actions) {
      actions.push({ source: weapon.name, action });
    }
  }
  if (armor) {
    for (const action of armor.actions) {
      actions.push({ source: armor.name, action });
    }
  }
  if (accessory) {
    for (const action of accessory.actions) {
      actions.push({ source: accessory.name, action });
    }
  }

  // Cat ability
  for (const ability of runState.cat.abilities) {
    const cd = runState.cat.cooldowns[ability.name] ?? 0;
    if (cd <= 0) {
      actions.push({
        source: runState.cat.name,
        action: {
          name: ability.name,
          damage: ability.damage,
          description: ability.description,
        },
      });
    }
  }

  // Always have a basic attack
  if (actions.length === 0) {
    actions.push({
      source: 'Fists',
      action: { name: 'Punch', damage: 3, description: 'A desperate swing.' },
    });
  }

  return actions;
}

export function resolvePlayerAction(
  action: ItemAction,
  combat: CombatState,
  _runState: RunState
): CombatActionResult {
  const logEntries: string[] = [];
  let damage = action.damage ?? 0;
  const healing = action.healing ?? 0;
  const shield = action.shield ?? 0;
  const effects: { effect: StatusEffect; turns: number }[] = [];
  let viewerChange = 0;

  // Check if player is cursed (-25% damage)
  const isCursed = combat.playerStatuses.some(s => s.effect === 'cursed');
  if (isCursed && damage > 0) {
    damage = Math.round(damage * 0.75);
    logEntries.push('Curse weakens your attack!');
  }

  // Check if player is stunned
  const isStunned = combat.playerStatuses.some(s => s.effect === 'stun');
  if (isStunned) {
    logEntries.push('You are stunned and cannot act!');
    return { damage: 0, healing: 0, shield: 0, effects: [], logEntries, viewerChange: -5 };
  }

  if (damage > 0) {
    logEntries.push(`${action.name} deals ${damage} damage!`);
  }
  if (healing > 0) {
    logEntries.push(`${action.name} heals for ${healing}!`);
  }
  if (shield > 0) {
    logEntries.push(`${action.name} grants ${shield} shield!`);
  }

  if (action.statusEffect && action.statusDuration) {
    effects.push({ effect: action.statusEffect, turns: action.statusDuration });
    logEntries.push(`Applied ${action.statusEffect} for ${action.statusDuration} turns!`);
  }

  if (action.viewerBoost) {
    viewerChange += action.viewerBoost;
  }

  return { damage, healing, shield, effects, logEntries, viewerChange };
}

export function resolveEnemyTurn(
  combat: CombatState,
  _runState: RunState
): { damage: number; effects: { effect: StatusEffect; turns: number }[]; logEntries: string[] } {
  const logEntries: string[] = [];
  const effects: { effect: StatusEffect; turns: number }[] = [];

  // Check if enemy is stunned
  const isStunned = combat.enemyStatuses.some(s => s.effect === 'stun');
  if (isStunned) {
    logEntries.push(`${combat.enemy.name} is stunned and cannot act!`);
    return { damage: 0, effects: [], logEntries };
  }

  const action = combat.enemyNextAction;
  let damage = action.damage;

  // Check enemy cursed debuff
  const isCursed = combat.enemyStatuses.some(s => s.effect === 'cursed');
  if (isCursed) {
    damage = Math.round(damage * 0.75);
  }

  logEntries.push(`${combat.enemy.name} uses ${action.name} for ${damage} damage!`);

  if (action.statusEffect && action.statusDuration) {
    effects.push({ effect: action.statusEffect, turns: action.statusDuration });
    logEntries.push(`You are afflicted with ${action.statusEffect}!`);
  }

  return { damage, effects, logEntries };
}

export function tickStatusEffects(combat: CombatState): { playerDamage: number; enemyDamage: number; logEntries: string[] } {
  let playerDamage = 0;
  let enemyDamage = 0;
  const logEntries: string[] = [];

  // Player status effects
  for (const status of combat.playerStatuses) {
    switch (status.effect) {
      case 'poison':
        playerDamage += 3;
        logEntries.push('Poison deals 3 damage!');
        break;
      case 'bleed':
        playerDamage += 2;
        logEntries.push('Bleeding deals 2 damage!');
        break;
      case 'on_fire':
        playerDamage += 5;
        logEntries.push('Fire deals 5 damage!');
        break;
    }
  }

  // Enemy status effects
  for (const status of combat.enemyStatuses) {
    switch (status.effect) {
      case 'poison':
        enemyDamage += 3;
        logEntries.push(`${combat.enemy.name} takes 3 poison damage!`);
        break;
      case 'bleed':
        enemyDamage += 2;
        logEntries.push(`${combat.enemy.name} takes 2 bleed damage!`);
        break;
      case 'on_fire':
        enemyDamage += 5;
        logEntries.push(`${combat.enemy.name} takes 5 fire damage!`);
        break;
    }
  }

  // Decrement durations
  combat.playerStatuses = combat.playerStatuses
    .map(s => ({ ...s, turns: s.turns - 1 }))
    .filter(s => s.turns > 0);

  combat.enemyStatuses = combat.enemyStatuses
    .map(s => ({ ...s, turns: s.turns - 1 }))
    .filter(s => s.turns > 0);

  return { playerDamage, enemyDamage, logEntries };
}

export function isCombatOver(combat: CombatState, playerHp: number): { over: boolean; playerWon: boolean } {
  if (combat.enemyHp <= 0) return { over: true, playerWon: true };
  if (playerHp <= 0) return { over: true, playerWon: false };
  return { over: false, playerWon: false };
}

export function advanceEnemyAction(combat: CombatState, rng: () => number): EnemyAction {
  const actions = combat.enemy.actions;
  if (actions.length <= 1) return actions[0];

  // Pick a random action different from current if possible
  const otherActions = actions.filter(a => a.name !== combat.enemyNextAction.name);
  if (otherActions.length > 0) {
    const idx = Math.floor(rng() * otherActions.length);
    return otherActions[idx];
  }
  return actions[0];
}
