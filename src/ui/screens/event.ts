import { el, pickRandom, clamp } from '../../utils';
import { getRunState, modifyRun } from '../../engine/state';
import { updateHud } from '../components/hud';
import { renderAnnouncer } from '../components/announcer';
import { updateBond } from '../../engine/cat';
import { announcerEvent } from '../../data/announcer-lines';
import type { GamePhase, EventRoom, EventChoice } from '../../types';

export function renderEventScreen(container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  container.innerHTML = '';
  container.className = 'screen event-screen';

  const state = getRunState();
  const room = state.currentRoom;
  if (!room) return;

  const event = room.data as EventRoom;

  // Header
  const header = el('div', 'event-header');
  header.appendChild(el('div', 'event-icon', '\u2753'));
  header.appendChild(el('div', 'event-title', event.title));
  container.appendChild(header);

  // Announcer
  if (announcerEvent.length > 0) {
    const line = pickRandom(announcerEvent, state.rng);
    container.appendChild(renderAnnouncer(line, { size: 'sm', skipTypewriter: true }));
  }

  // Narrative
  const narrative = el('div', 'event-narrative');
  const p = el('p', undefined, event.description);
  narrative.appendChild(p);
  container.appendChild(narrative);

  // Choices
  const choices = el('div', 'event-choices');

  if (event.choices.length === 0) {
    const noChoices = el('div', 'text-dim text-center', 'Nothing to do here...');
    choices.appendChild(noChoices);

    const continueBtn = el('button', 'btn btn-action', 'Continue');
    continueBtn.addEventListener('click', () => {
      modifyRun(s => {
        s.roomsExplored++;
        if (s.currentRoom) s.currentRoom.explored = true;
        s.phase = 'floor_map';
      });
      onTransition('floor_map');
    });
    choices.appendChild(continueBtn);
  } else {
    for (const choice of event.choices) {
      const btn = el('button', 'event-choice-btn');

      const icon = el('span', 'event-choice-icon', '\u25B6');
      btn.appendChild(icon);

      const text = el('span', 'event-choice-text', choice.text);
      btn.appendChild(text);

      btn.addEventListener('click', () => {
        resolveChoice(choice, container, onTransition);
      });

      choices.appendChild(btn);
    }
  }

  container.appendChild(choices);
}

function resolveChoice(choice: EventChoice, container: HTMLElement, onTransition: (next: GamePhase) => void): void {
  const state = getRunState();
  const outcome = choice.outcome;

  // Apply effects
  modifyRun(s => {
    if (outcome.hpChange) {
      s.hp = clamp(s.hp + outcome.hpChange, 0, s.maxHp);
    }
    if (outcome.goldChange) {
      s.gold = Math.max(0, s.gold + outcome.goldChange);
    }
    if (outcome.viewerChange) {
      s.viewers.count = Math.max(0, s.viewers.count + outcome.viewerChange);
      if (s.viewers.count > s.viewers.peak) {
        s.viewers.peak = s.viewers.count;
      }
    }
    if (outcome.catBondChange) {
      s.cat = updateBond(s.cat, outcome.catBondChange);
    }
  });

  updateHud();

  // Show result
  container.innerHTML = '';
  container.className = 'screen event-screen';

  const header = el('div', 'event-header');
  header.appendChild(el('div', 'event-icon', '\u2753'));
  header.appendChild(el('div', 'event-title', 'Outcome'));
  container.appendChild(header);

  const result = el('div', 'event-result');
  result.appendChild(el('div', 'event-result-text', outcome.description));

  // Show effects
  const effects: string[] = [];
  if (outcome.hpChange) {
    const cls = outcome.hpChange > 0 ? 'positive' : 'negative';
    effects.push(`<span class="event-result-effect ${cls}">${outcome.hpChange > 0 ? '+' : ''}${outcome.hpChange} HP</span>`);
  }
  if (outcome.goldChange) {
    const cls = outcome.goldChange > 0 ? 'positive' : 'negative';
    effects.push(`<span class="event-result-effect ${cls}">${outcome.goldChange > 0 ? '+' : ''}${outcome.goldChange} Gold</span>`);
  }
  if (outcome.viewerChange) {
    const cls = outcome.viewerChange > 0 ? 'positive' : 'negative';
    effects.push(`<span class="event-result-effect ${cls}">${outcome.viewerChange > 0 ? '+' : ''}${outcome.viewerChange} Viewers</span>`);
  }
  if (outcome.catBondChange) {
    effects.push(`<span class="event-result-effect neutral">${outcome.catBondChange > 0 ? '+' : ''}${outcome.catBondChange} Cat Bond</span>`);
  }

  if (effects.length > 0) {
    const effectsEl = el('div');
    effectsEl.innerHTML = effects.join(' ');
    result.appendChild(effectsEl);
  }

  container.appendChild(result);

  // Check death
  if (state.hp <= 0) {
    setTimeout(() => onTransition('death'), 1500);
    return;
  }

  // Continue button
  const actions = el('div', 'screen-actions');
  const continueBtn = el('button', 'btn btn-action btn-action-primary', 'Continue');
  continueBtn.addEventListener('click', () => {
    modifyRun(s => {
      s.roomsExplored++;
      if (s.currentRoom) s.currentRoom.explored = true;
      s.phase = 'floor_map';
    });
    onTransition('floor_map');
  });
  actions.appendChild(continueBtn);
  container.appendChild(actions);
}
