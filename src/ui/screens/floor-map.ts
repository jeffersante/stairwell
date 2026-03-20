import { el } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import type { GamePhase, RoomType } from '../../types';
import { renderAnnouncerInline } from '../components/announcer';
import { pickRandom } from '../../utils';
import { announcerFloorStart } from '../../data/announcer-lines';
import { getThemeForFloor } from '../../data/floor-themes';
import { audio } from '../../engine/audio';
import { triggerViewerChat } from '../components/viewer-chat';

const ROOM_ICONS: Record<RoomType, string> = {
  combat: '\u2694\uFE0F',
  loot: '\uD83C\uDF81',
  trap: '\u26A0\uFE0F',
  shop: '\uD83D\uDED2',
  event: '\u2753',
  rest: '\uD83D\uDECB\uFE0F',
};

const ROOM_LABELS: Record<RoomType, string> = {
  combat: 'Fight',
  loot: 'Loot',
  trap: 'Trap',
  shop: 'Shop',
  event: 'Event',
  rest: 'Rest',
};

export function renderFloorMapScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen floor-map-screen';

  const state = getRunState();
  const floor = state.floor;

  // Floor theme
  const theme = getThemeForFloor(floor.number);

  // Start ambient audio for this floor theme
  audio.startAmbient(theme.id);

  // Header
  const header = el('div', 'floor-map-header');
  header.appendChild(el('div', 'floor-map-title', `BASEMENT ${floor.number}`));

  // Theme display
  const themeDisplay = el('div', 'floor-theme-display');
  themeDisplay.style.borderLeftColor = theme.colorAccent;
  themeDisplay.appendChild(el('div', 'floor-theme-name', theme.name));
  themeDisplay.appendChild(el('div', 'floor-theme-desc', theme.description));
  header.appendChild(themeDisplay);

  // Hazard warnings
  if (theme.hazards.length > 0) {
    const hazardWarning = el('div', 'floor-hazard-warning');
    hazardWarning.appendChild(el('span', 'floor-hazard-icon', '\u26A0\uFE0F'));
    const hazardNames = theme.hazards.map(h => h.name).join(', ');
    hazardWarning.appendChild(el('span', 'floor-hazard-text', `Hazards: ${hazardNames}`));
    header.appendChild(hazardWarning);
  }

  const explored = floor.rooms.filter(r => r.explored).length;
  header.appendChild(el('div', 'floor-map-subtitle', `${explored}/${floor.rooms.length} rooms explored`));
  container.appendChild(header);

  // Announcer
  if (announcerFloorStart.length > 0) {
    const line = pickRandom(announcerFloorStart, state.rng);
    container.appendChild(renderAnnouncerInline(line));
  }

  // Room grid
  const mapContainer = el('div', 'floor-map-container');
  const grid = el('div', 'floor-map-grid');

  // Boss floor — single room
  if (floor.isBossFloor && floor.rooms.length === 1) {
    const row = el('div', 'floor-map-row');
    const room = floor.rooms[0];
    const node = createRoomNode(room.type, room.name, room.explored, true);
    node.classList.add('boss-node');
    node.addEventListener('click', () => {
      modifyRun(s => { s.currentRoom = room; s.phase = 'boss'; });
      onTransition('boss');
    });
    row.appendChild(node);
    grid.appendChild(row);
  } else {
    // Arrange rooms in rows of 2-3
    const rooms = floor.rooms;
    for (let i = 0; i < rooms.length; i += 3) {
      const row = el('div', 'floor-map-row');
      const chunk = rooms.slice(i, i + 3);
      for (const room of chunk) {
        const node = createRoomNode(room.type, room.name, room.explored, false);

        if (!room.explored) {
          node.classList.add('accessible');
          node.addEventListener('click', () => {
            modifyRun(s => { s.currentRoom = room; });
            const phase = getPhaseForRoomType(room.type);
            modifyRun(s => { s.phase = phase; });
            onTransition(phase);
          });
        }

        row.appendChild(node);
      }
      grid.appendChild(row);
    }
  }

  mapContainer.appendChild(grid);
  container.appendChild(mapContainer);

  // Legend
  const legend = el('div', 'floor-map-legend');
  for (const [type, icon] of Object.entries(ROOM_ICONS)) {
    const item = el('div', 'floor-map-legend-item');
    item.appendChild(el('span', undefined, icon));
    item.appendChild(el('span', undefined, ROOM_LABELS[type as RoomType]));
    legend.appendChild(item);
  }
  container.appendChild(legend);

  // Descend button (when all rooms explored or at least one)
  const allExplored = floor.rooms.every(r => r.explored);
  if (allExplored) {
    const actions = el('div', 'screen-actions');
    const descendBtn = el('button', 'btn btn-action btn-action-primary', 'Descend to Next Floor');
    descendBtn.addEventListener('click', () => {
      audio.playButtonClick();
      triggerViewerChat('floor_clear');
      onTransition('floor_complete');
    });
    actions.appendChild(descendBtn);
    container.appendChild(actions);
  }
}

function createRoomNode(type: RoomType, name: string, explored: boolean, isBoss: boolean): HTMLElement {
  const node = el('div', `floor-map-node${explored ? ' explored' : ' unexplored'}`);

  const icon = el('div', 'floor-map-node-icon', isBoss ? '\uD83D\uDC80' : ROOM_ICONS[type]);
  node.appendChild(icon);

  const label = el('div', 'floor-map-node-label', isBoss ? 'BOSS' : ROOM_LABELS[type]);
  node.appendChild(label);

  return node;
}

function getPhaseForRoomType(type: RoomType): GamePhase {
  switch (type) {
    case 'combat': return 'combat';
    case 'shop': return 'shop';
    case 'event': return 'event';
    case 'rest': return 'rest';
    case 'loot': return 'loot';
    case 'trap': return 'trap';
  }
}
