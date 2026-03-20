import type { RunState, MetaState, GameItem, CatState, CatAbility } from '../types';
import { allUnlocks } from '../data/unlocks';
import { allItems } from '../data/items';

export function calculateSP(runState: RunState): number {
  const floorPoints = runState.floorNumber * 10;
  const killPoints = runState.enemiesDefeated.length * 5;
  const viewerPoints = Math.floor(runState.viewers.peak / 10);

  // Boss kills — count boss floors passed
  const bossesKilled = Math.floor(runState.floorNumber / 5);
  const bossPoints = bossesKilled * 50;

  return floorPoints + killPoints + viewerPoints + bossPoints;
}

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
