import type { ViewerState } from '../types';
import { clamp } from '../utils';

const BASE_VIEWER_COUNT = 50;
const VIEWER_MILESTONES = [100, 500, 1000, 5000, 10000];

export function initViewers(baseCount?: number): ViewerState {
  return {
    count: baseCount ?? BASE_VIEWER_COUNT,
    peak: baseCount ?? BASE_VIEWER_COUNT,
    entertainmentMeter: 50,
    sponsorReady: false,
    milestonesHit: [],
  };
}

export type EntertainmentAction =
  | 'rare_action'
  | 'risky_action'
  | 'cursed_item'
  | 'low_hp_win'
  | 'hit_no_defend'
  | 'stalling'
  | 'boss_kill'
  | 'enemy_kill'
  | 'took_damage';

export function updateEntertainment(
  viewers: ViewerState,
  action: EntertainmentAction,
  _context?: Record<string, unknown>
): ViewerState {
  let change = 0;

  switch (action) {
    case 'rare_action':
      change = 10;
      break;
    case 'risky_action':
      change = 10;
      break;
    case 'cursed_item':
      change = 20;
      break;
    case 'low_hp_win':
      change = 25;
      break;
    case 'hit_no_defend':
      change = -5;
      break;
    case 'stalling':
      change = -15;
      break;
    case 'boss_kill':
      change = 30;
      break;
    case 'enemy_kill':
      change = 5;
      break;
    case 'took_damage':
      change = 2;
      break;
  }

  const newMeter = clamp(viewers.entertainmentMeter + change, 0, 100);
  const multiplier = 1 + newMeter / 50;
  const newCount = Math.round(BASE_VIEWER_COUNT * multiplier);
  const newPeak = Math.max(viewers.peak, newCount);

  return {
    ...viewers,
    entertainmentMeter: newMeter,
    count: newCount,
    peak: newPeak,
    sponsorReady: viewers.sponsorReady,
    milestonesHit: viewers.milestonesHit,
  };
}

export function decayEntertainment(viewers: ViewerState): ViewerState {
  const newMeter = clamp(viewers.entertainmentMeter - 2, 0, 100);
  const multiplier = 1 + newMeter / 50;
  const newCount = Math.round(BASE_VIEWER_COUNT * multiplier);

  return {
    ...viewers,
    entertainmentMeter: newMeter,
    count: newCount,
  };
}

export function checkSponsorDrop(viewers: ViewerState): { triggered: boolean; milestone: number; viewers: ViewerState } {
  for (const milestone of VIEWER_MILESTONES) {
    if (viewers.count >= milestone && !viewers.milestonesHit.includes(milestone)) {
      return {
        triggered: true,
        milestone,
        viewers: {
          ...viewers,
          sponsorReady: true,
          milestonesHit: [...viewers.milestonesHit, milestone],
        },
      };
    }
  }
  return { triggered: false, milestone: 0, viewers };
}
