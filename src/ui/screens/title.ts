import { el } from '../../utils';
import { getMetaState } from '../../engine/state';
import type { GamePhase } from '../../types';

export function renderTitleScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen title-screen';

  const meta = getMetaState();

  // Logo
  const logo = el('div', 'title-logo');
  const building = el('div', 'title-building', '\uD83C\uDFE2');
  logo.appendChild(building);
  const name = el('h1', 'title-name', 'STAIRWELL');
  logo.appendChild(name);
  const tagline = el('p', 'title-tagline', 'Descend. Survive. Entertain.');
  logo.appendChild(tagline);
  container.appendChild(logo);

  // Menu
  const menu = el('div', 'title-menu');

  const descendBtn = el('button', 'btn btn-action-primary title-start-btn', 'Descend');
  descendBtn.addEventListener('click', () => onTransition('run_setup'));
  menu.appendChild(descendBtn);

  const unlocksBtn = el('button', 'btn', 'Unlocks');
  unlocksBtn.addEventListener('click', () => onTransition('meta_shop'));
  menu.appendChild(unlocksBtn);

  container.appendChild(menu);

  // Stats
  if (meta.deepestFloor > 0) {
    const statsLine = el('div', 'text-dim text-center text-xs');
    statsLine.style.marginTop = '16px';
    statsLine.textContent = `Deepest: B${meta.deepestFloor} | Runs: ${meta.totalRuns} | SP: ${meta.stairwellPoints}`;
    container.appendChild(statsLine);
  }

  // Version
  const version = el('div', 'title-version', 'v0.1.0');
  container.appendChild(version);
}
