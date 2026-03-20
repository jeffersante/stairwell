import type { CombatState, Enemy, RunState, ItemAction, StatusEffect, EnemyAction, DiceRoll, ClassAbility } from '../types';
import { clamp } from '../utils';
import { rollAttack, rollDamage, rollDice, rollSave, getStatModifier } from './dice';
import { getClassById } from '../data/classes';

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
  attackRoll?: DiceRoll;
  damageRoll?: DiceRoll;
  hit?: boolean;
  critical?: boolean;
  fumble?: boolean;
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

  // Class signature ability + unlocked tree abilities
  const playerClass = getClassById(runState.playerClass);
  if (playerClass) {
    const sigCd = runState.classAbilityCooldowns[playerClass.signatureAbility.name] ?? 0;
    if (sigCd <= 0) {
      actions.push({
        source: playerClass.name,
        action: classAbilityToItemAction(playerClass.signatureAbility),
      });
    }

    for (const ability of playerClass.abilityTree) {
      if (runState.playerLevel >= ability.levelRequired) {
        const cd = runState.classAbilityCooldowns[ability.name] ?? 0;
        if (cd <= 0) {
          actions.push({
            source: playerClass.name,
            action: classAbilityToItemAction(ability),
          });
        }
      }
    }
  }

  // Always have a basic attack
  if (actions.length === 0) {
    actions.push({
      source: 'Fists',
      action: { name: 'Punch', damage: 3, damageDice: '1d4', hitBonus: 0, description: 'A desperate swing.' },
    });
  }

  return actions;
}

function classAbilityToItemAction(ability: ClassAbility): ItemAction {
  const action: ItemAction = {
    name: ability.name,
    description: ability.description,
  };

  switch (ability.effect.type) {
    case 'damage':
      action.damageDice = ability.effect.dice;
      break;
    case 'aoe_damage':
      action.damageDice = ability.effect.dice;
      break;
    case 'heal':
      action.healing = ability.effect.amount;
      break;
    case 'stun':
      action.statusEffect = 'stun';
      action.statusDuration = ability.effect.duration;
      break;
    case 'debuff_enemy':
      action.statusEffect = ability.effect.effect;
      action.statusDuration = ability.effect.duration;
      break;
    case 'buff':
      action.shield = ability.effect.amount;
      break;
    case 'viewer_boost':
      action.viewerBoost = ability.effect.amount;
      break;
  }

  return action;
}

export function resolvePlayerAction(
  action: ItemAction,
  combat: CombatState,
  runState: RunState
): CombatActionResult {
  const logEntries: string[] = [];
  let damage = 0;
  let healing = action.healing ?? 0;
  const shield = action.shield ?? 0;
  const effects: { effect: StatusEffect; turns: number }[] = [];
  let viewerChange = 0;
  let attackRoll: DiceRoll | undefined;
  let damageRoll: DiceRoll | undefined;
  let hit: boolean | undefined;
  let critical = false;
  let fumble = false;

  // Check if player is stunned
  const isStunned = combat.playerStatuses.some(s => s.effect === 'stun');
  if (isStunned) {
    logEntries.push('You are stunned and cannot act!');
    return { damage: 0, healing: 0, shield: 0, effects: [], logEntries, viewerChange: -5 };
  }

  const hasDamageDice = action.damageDice !== undefined;
  const hasFlatDamage = action.damage !== undefined && action.damage > 0;

  if (hasDamageDice || hasFlatDamage) {
    // Determine hit bonus from action or STR/DEX modifier
    const statMod = getStatModifier(
      Math.max(runState.playerStats.str, runState.playerStats.dex)
    );
    const hitBonus = (action.hitBonus ?? 0) + statMod;
    const targetAC = combat.enemy.armorClass;

    // Roll to hit
    const attackResult = rollAttack(hitBonus, targetAC, runState.rng);
    attackRoll = attackResult.roll;
    hit = attackResult.hit;
    critical = attackResult.critical;
    fumble = attackResult.fumble;

    if (fumble) {
      logEntries.push(`${action.name}: Natural 1! Fumble!`);
      // Fumble consequences
      const fumbleRoll = Math.floor(runState.rng() * 3);
      switch (fumbleRoll) {
        case 0:
          logEntries.push('You stumble and lose your footing!');
          break;
        case 1:
          logEntries.push('Your weapon slips! Embarrassing.');
          break;
        case 2:
          logEntries.push('You hit yourself for 2 damage!');
          damage = -2; // negative = self damage, handled by caller
          break;
      }
      viewerChange += 10; // fumbles are entertaining
      return { damage: 0, healing: 0, shield: 0, effects: [], logEntries, viewerChange, attackRoll, hit: false, critical: false, fumble: true };
    }

    if (!hit) {
      logEntries.push(`${action.name}: Rolled ${attackRoll.results[0]}+${hitBonus}=${attackRoll.results[0] + hitBonus} vs AC ${targetAC} — Miss!`);
      viewerChange -= 2;
      return { damage: 0, healing: 0, shield: 0, effects: [], logEntries, viewerChange, attackRoll, hit: false, critical: false, fumble: false };
    }

    // Hit! Roll damage
    if (hasDamageDice) {
      damageRoll = rollDamage(action.damageDice!, runState.rng, critical);
      damage = damageRoll.total;
    } else {
      damage = action.damage!;
      if (critical) damage *= 2;
    }

    // Check if player is cursed (-25% damage)
    const isCursed = combat.playerStatuses.some(s => s.effect === 'cursed');
    if (isCursed && damage > 0) {
      damage = Math.round(damage * 0.75);
      logEntries.push('Curse weakens your attack!');
    }

    if (critical) {
      logEntries.push(`${action.name}: CRITICAL HIT! Rolled natural 20!`);
      viewerChange += 20;
    } else {
      logEntries.push(`${action.name}: Hit! (${attackRoll.results[0]}+${hitBonus} vs AC ${targetAC}) for ${damage} damage!`);
    }
  }

  if (healing > 0) {
    logEntries.push(`${action.name} heals for ${healing}!`);
  }
  if (shield > 0) {
    logEntries.push(`${action.name} grants ${shield} shield!`);
  }

  if (action.statusEffect && action.statusDuration) {
    // Status effects may require a save
    const saveStat = getStatusSaveStat(action.statusEffect);
    if (saveStat) {
      const enemyStatValue = 10; // enemies use base 10 for saves
      const dc = 10 + getStatModifier(runState.playerStats.cha);
      const save = rollSave(enemyStatValue, dc, runState.rng);
      if (save.success) {
        logEntries.push(`${combat.enemy.name} resists ${action.statusEffect}!`);
      } else {
        effects.push({ effect: action.statusEffect, turns: action.statusDuration });
        logEntries.push(`Applied ${action.statusEffect} for ${action.statusDuration} turns!`);
      }
    } else {
      effects.push({ effect: action.statusEffect, turns: action.statusDuration });
      logEntries.push(`Applied ${action.statusEffect} for ${action.statusDuration} turns!`);
    }
  }

  if (action.viewerBoost) {
    viewerChange += action.viewerBoost;
  }

  return { damage, healing, shield, effects, logEntries, viewerChange, attackRoll, damageRoll, hit, critical, fumble };
}

export function resolveEnemyTurn(
  combat: CombatState,
  runState: RunState
): { damage: number; effects: { effect: StatusEffect; turns: number }[]; logEntries: string[]; attackRoll?: DiceRoll } {
  const logEntries: string[] = [];
  const effects: { effect: StatusEffect; turns: number }[] = [];

  // Check if enemy is stunned
  const isStunned = combat.enemyStatuses.some(s => s.effect === 'stun');
  if (isStunned) {
    logEntries.push(`${combat.enemy.name} is stunned and cannot act!`);
    return { damage: 0, effects: [], logEntries };
  }

  const action = combat.enemyNextAction;

  // Enemy rolls to hit vs player AC
  const enemyHitBonus = Math.floor(combat.enemy.armorClass / 3); // derive hit bonus from AC
  const attackResult = rollAttack(enemyHitBonus, runState.armorClass, runState.rng);

  if (attackResult.fumble) {
    logEntries.push(`${combat.enemy.name} fumbles their ${action.name}!`);
    return { damage: 0, effects: [], logEntries, attackRoll: attackResult.roll };
  }

  if (!attackResult.hit) {
    logEntries.push(`${combat.enemy.name} uses ${action.name} — misses! (${attackResult.roll.results[0]}+${enemyHitBonus} vs AC ${runState.armorClass})`);
    return { damage: 0, effects: [], logEntries, attackRoll: attackResult.roll };
  }

  let damage = action.damage;

  // Critical hit
  if (attackResult.critical) {
    damage *= 2;
    logEntries.push(`${combat.enemy.name} scores a CRITICAL HIT with ${action.name} for ${damage} damage!`);
  } else {
    // Check enemy cursed debuff
    const isCursed = combat.enemyStatuses.some(s => s.effect === 'cursed');
    if (isCursed) {
      damage = Math.round(damage * 0.75);
    }
    logEntries.push(`${combat.enemy.name} uses ${action.name} for ${damage} damage!`);
  }

  if (action.statusEffect && action.statusDuration) {
    // Player can save vs status effects
    const saveStat = getStatusSaveStat(action.statusEffect);
    if (saveStat) {
      const playerStatValue = runState.playerStats[saveStat];
      const dc = 10 + Math.floor(combat.enemy.armorClass / 4);
      const save = rollSave(playerStatValue, dc, runState.rng);
      if (save.success) {
        logEntries.push(`You resist ${action.statusEffect}! (save: ${save.roll.results[0]}+${getStatModifier(playerStatValue)})`);
      } else {
        effects.push({ effect: action.statusEffect, turns: action.statusDuration });
        logEntries.push(`You are afflicted with ${action.statusEffect}!`);
      }
    } else {
      effects.push({ effect: action.statusEffect, turns: action.statusDuration });
      logEntries.push(`You are afflicted with ${action.statusEffect}!`);
    }
  }

  return { damage, effects, logEntries, attackRoll: attackResult.roll };
}

function getStatusSaveStat(effect: StatusEffect): keyof import('../types').PlayerStats | null {
  switch (effect) {
    case 'poison': return 'con';
    case 'stun': return 'con';
    case 'bleed': return 'dex';
    case 'on_fire': return 'dex';
    case 'cursed': return 'wis';
    case 'existential_dread': return 'wis';
  }
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

export function tickClassAbilityCooldowns(cooldowns: Record<string, number>): Record<string, number> {
  const updated: Record<string, number> = {};
  for (const [key, val] of Object.entries(cooldowns)) {
    if (val > 0) updated[key] = val - 1;
  }
  return updated;
}
