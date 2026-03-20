import './style.css';
import { getRunState, initRun, isRunActive, endRun, modifyRun } from './engine/state';
import type { GamePhase, GameItem, PlayerClassName, CatClassName } from './types';
import { generateFloor } from './engine/floor';
import { renderHud, updateHud, removeHud } from './ui/components/hud';
import { renderTitleScreen } from './ui/screens/title';
import { renderRunSetupScreen } from './ui/screens/run-setup';
import { renderFloorMapScreen } from './ui/screens/floor-map';
import { renderCombatScreen } from './ui/screens/combat';
import { renderShopScreen } from './ui/screens/shop';
import { renderEventScreen } from './ui/screens/event';
import { renderBossScreen } from './ui/screens/boss';
import { renderDeathScreen } from './ui/screens/death';
import { renderMetaShopScreen } from './ui/screens/meta-shop';
import { renderLootScreen } from './ui/screens/loot';
import { renderTrapScreen } from './ui/screens/trap';
import { renderRestScreen } from './ui/screens/rest';
import { renderCraftingScreen } from './ui/screens/crafting';
import { initViewerChat, destroyViewerChat } from './ui/components/viewer-chat';
import { renderAudioControls } from './ui/components/audio-controls';
import { audio } from './engine/audio';

const app = document.getElementById('app');
if (!app) {
  throw new Error('Could not find app element');
}

const RUN_PHASES: GamePhase[] = [
  'floor_map', 'combat', 'shop', 'event', 'rest',
  'loot', 'trap', 'crafting', 'boss', 'room', 'room_result',
  'floor_complete', 'boss_result',
];

function manageHud(phase: GamePhase): void {
  const needsHud = RUN_PHASES.includes(phase) && isRunActive();
  const existingHud = document.querySelector('.hud');
  if (needsHud && !existingHud) {
    document.body.insertBefore(renderHud(), document.body.firstChild);
    initViewerChat();
  } else if (needsHud) {
    updateHud();
  } else if (existingHud) {
    removeHud();
    destroyViewerChat();
  }

  // Ensure audio controls exist
  if (!document.querySelector('.audio-controls')) {
    document.body.appendChild(renderAudioControls());
  }
}

function startRun(catName: string, startingItem: GameItem | null, playerClassName?: PlayerClassName, catClassName?: CatClassName): void {
  initRun(catName, startingItem, undefined, playerClassName, catClassName);
  transitionTo('floor_map');
}

function advanceFloor(): void {
  if (!isRunActive()) return;
  const state = getRunState();
  const nextFloor = state.floorNumber + 1;
  const floor = generateFloor(nextFloor, state.rng);
  modifyRun(s => {
    s.floorNumber = nextFloor;
    s.floor = floor;
    s.currentRoom = null;
    s.phase = 'floor_map';
  });
}

function transitionTo(phase: GamePhase): void {
  // Route 'room' to the correct room type
  if (phase === 'room') {
    const room = getRunState().currentRoom;
    if (room) {
      transitionTo(room.type as GamePhase);
      return;
    }
    transitionTo('floor_map');
    return;
  }

  manageHud(phase);

  switch (phase) {
    case 'title':
      removeHud();
      destroyViewerChat();
      audio.init();
      renderTitleScreen(app!, transitionTo);
      break;
    case 'run_setup':
      removeHud();
      renderRunSetupScreen(app!, transitionTo, startRun);
      break;
    case 'meta_shop':
      removeHud();
      renderMetaShopScreen(app!, transitionTo);
      break;
    case 'floor_map':
      renderFloorMapScreen(app!, transitionTo);
      break;
    case 'combat':
      renderCombatScreen(app!, transitionTo);
      break;
    case 'shop':
      renderShopScreen(app!, transitionTo);
      break;
    case 'event':
      renderEventScreen(app!, transitionTo);
      break;
    case 'boss':
      renderBossScreen(app!, transitionTo);
      break;
    case 'loot':
      renderLootScreen(app!, transitionTo);
      break;
    case 'trap':
      renderTrapScreen(app!, transitionTo);
      break;
    case 'rest':
      renderRestScreen(app!, transitionTo);
      break;
    case 'crafting':
      renderCraftingScreen(app!, transitionTo);
      break;
    case 'floor_complete':
      advanceFloor();
      transitionTo('floor_map');
      break;
    case 'death': {
      const earnedSP = endRun();
      removeHud();
      renderDeathScreen(app!, transitionTo, earnedSP);
      break;
    }
    default:
      renderTitleScreen(app!, transitionTo);
  }
}

function main() {
  // Simple session resume logic
  if (isRunActive()) {
    const currentPhase = getRunState().phase;
    // If player died and refreshed, send them to the death screen properly
    if (getRunState().hp <= 0 && currentPhase !== 'death') {
      transitionTo('death');
    } else {
      transitionTo(currentPhase);
    }
  } else {
    transitionTo('title');
  }
}

main();
