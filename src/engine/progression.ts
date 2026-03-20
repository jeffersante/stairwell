import type { RunState, MetaState, GameItem, CatState, CatAbility, PlayerStats, ClassAbility } from '../types';
import { allUnlocks } from '../data/unlocks';
import { allItems } from '../data/items';
import { getClassById } from '../data/classes';

// === XP Thresholds ===

const PLAYER_XP_THRESHOLDS = [0, 25, 60, 100, 150, 210, 280, 360, 450, 550];

export function getPlayerXpThreshold(level: number): number {
  if (level < 1 || level >= PLAYER_XP_THRESHOLDS.length) return Infinity;
  return PLAYER_XP_THRESHOLDS[level];
}

export function checkPlayerLevelUp(runState: RunState): {
  leveled: boolean;
  newLevel: number;
  statIncrease?: { stat: keyof PlayerStats; amount: number };
  newAbility?: ClassAbility;
} {
  const threshold = getPlayerXpThreshold(runState.playerLevel);
  if (runState.playerXp < threshold || runState.playerLevel >= 10) {
    return { leveled: false, newLevel: runState.playerLevel };
  }

  const newLevel = runState.playerLevel + 1;

  // Random stat increase
  const statKeys: (keyof PlayerStats)[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const randomStat = statKeys[Math.floor(runState.rng() * statKeys.length)];
  const statIncrease = { stat: randomStat, amount: 1 };

  // Check for new class ability unlock
  let newAbility: ClassAbility | undefined;
  const playerClass = getClassById(runState.playerClass);
  if (playerClass) {
    for (const ability of playerClass.abilityTree) {
      if (ability.levelRequired === newLevel) {
        newAbility = ability;
        break;
      }
    }
  }

  return { leveled: true, newLevel, statIncrease, newAbility };
}

export function applyPlayerLevelUp(runState: RunState): void {
  const result = checkPlayerLevelUp(runState);
  if (!result.leveled) return;

  runState.playerLevel = result.newLevel;
  runState.maxHp += 5;
  runState.hp = Math.min(runState.hp + 5, runState.maxHp);

  if (result.statIncrease) {
    runState.playerStats[result.statIncrease.stat] += result.statIncrease.amount;
  }
}

export function getXpFromCombat(enemyXpDrop: number, floorNumber: number, playerClass: string): number {
  const floorMultiplier = 1 + floorNumber / 10;
  let xp = Math.floor(enemyXpDrop * floorMultiplier);
  if (playerClass === 'intern') {
    xp *= 2;
  }
  return xp;
}

// === SP Calculation ===

export function calculateSP(runState: RunState): number {
  const floorPoints = runState.floorNumber * 10;
  const killPoints = runState.enemiesDefeated.length * 5;
  const viewerPoints = Math.floor(runState.viewers.peak / 10);

  // Boss kills — count boss floors passed
  const bossesKilled = Math.floor(runState.floorNumber / 5);
  const bossPoints = bossesKilled * 50;

  return floorPoints + killPoints + viewerPoints + bossPoints;
}

// === Meta Unlock System ===

export function canPurchaseUnlock(unlockId: string, metaState: MetaState): boolean {
  if (metaState.unlocks.includes(unlockId)) return false;

  const unlock = allUnlocks.find(u => u.id === unlockId);
  if (!unlock) return false;

  return metaState.stairwellPoints >= unlock.cost;
}

export function purchaseUnlock(unlockId: string, metaState: MetaState): MetaState {
  const unlock = allUnlocks.find(u => u.id === unlockId);
  if (!unlock) return metaState;
  if (!canPurchaseUnlock(unlockId, metaState)) return metaState;

  return {
    ...metaState,
    stairwellPoints: metaState.stairwellPoints - unlock.cost,
    unlocks: [...metaState.unlocks, unlockId],
  };
}

export function getStartingItems(metaState: MetaState): GameItem[] {
  const items: GameItem[] = [];

  for (const unlockId of metaState.unlocks) {
    const unlock = allUnlocks.find(u => u.id === unlockId);
    if (unlock?.category === 'starting_item' && unlock.itemId) {
      const item = allItems.find(i => i.id === unlock.itemId);
      if (item) items.push(item);
    }
  }

  return items;
}

export function getStartingViewers(metaState: MetaState): number {
  let extraViewers = 0;

  for (const unlockId of metaState.unlocks) {
    const unlock = allUnlocks.find(u => u.id === unlockId);
    if (unlock?.category === 'viewer_perk' && unlock.id === 'unlock_viewer_start') {
      extraViewers += unlock.value || 0;
    }
  }

  return 50 + extraViewers;
}

// === Cat Progression ===

export function getCatXpForAction(action: 'combat_win' | 'boss_win' | 'pet' | 'item_use'): number {
  switch (action) {
    case 'combat_win': return 3;
    case 'boss_win': return 10;
    case 'pet': return 5;
    case 'item_use': return 1;
  }
}

export function getCatLevelThreshold(level: number): number {
  const thresholds = [0, 10, 30, 60, 100, 150];
  if (level < 0 || level >= thresholds.length) return Infinity;
  return thresholds[level];
}

export function checkCatLevelUp(catState: CatState): { leveled: boolean; newAbilities: CatAbility[] } {
  const threshold = getCatLevelThreshold(catState.level);
  if (catState.xp >= threshold && catState.level < 5) {
    return { leveled: true, newAbilities: [] };
  }
  return { leveled: false, newAbilities: [] };
}
