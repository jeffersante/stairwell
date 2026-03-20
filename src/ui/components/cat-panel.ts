import { el } from '../../utils';
import type { CatState } from '../../types';
import { getCatLevelThreshold } from '../../engine/cat';

const MOOD_EMOJI: Record<CatState['mood'], string> = {
  aloof: '\uD83D\uDE10',
  curious: '\uD83D\uDE3A',
  affectionate: '\uD83D\uDE3B',
  judging: '\uD83D\uDE12',
  furious: '\uD83D\uDE3E',
};

const MOOD_CLASS: Record<CatState['mood'], string> = {
  aloof: 'cat-mood-neutral',
  curious: 'cat-mood-neutral',
  affectionate: 'cat-mood-happy',
  judging: 'cat-mood-annoyed',
  furious: 'cat-mood-furious',
};

export function renderCatPanel(cat: CatState, dialogue?: string): HTMLElement {
  const panel = el('div', 'cat-panel');

  // Header
  const header = el('div', 'cat-panel-header');
  const emoji = el('div', 'cat-panel-emoji', '\uD83D\uDC08');
  header.appendChild(emoji);
  const nameSection = el('div');
  const name = el('div', 'cat-panel-name', cat.name);
  nameSection.appendChild(name);
  const level = el('div', 'text-xs text-dim', `Level ${cat.level}`);
  nameSection.appendChild(level);
  header.appendChild(nameSection);
  panel.appendChild(header);

  // Mood
  const moodRow = el('div', 'cat-panel-mood');
  const moodIndicator = el('span', `cat-mood-indicator ${MOOD_CLASS[cat.mood]}`);
  moodIndicator.textContent = `${MOOD_EMOJI[cat.mood]} ${cat.mood}`;
  moodRow.appendChild(moodIndicator);
  panel.appendChild(moodRow);

  // Bond bar
  const bondSection = el('div', 'cat-bond-bar');
  const bondLabel = el('div', 'cat-bond-label');
  bondLabel.appendChild(el('span', undefined, 'Bond'));
  bondLabel.appendChild(el('span', undefined, `${cat.bond}/100`));
  bondSection.appendChild(bondLabel);
  const bondTrack = el('div', 'cat-bond-track');
  const bondFill = el('div', 'cat-bond-fill');
  bondFill.style.width = `${cat.bond}%`;
  bondTrack.appendChild(bondFill);
  bondSection.appendChild(bondTrack);
  panel.appendChild(bondSection);

  // XP bar
  const nextThreshold = getCatLevelThreshold(cat.level);
  if (nextThreshold < Infinity) {
    const xpSection = el('div', 'cat-bond-bar');
    const xpLabel = el('div', 'cat-bond-label');
    xpLabel.appendChild(el('span', undefined, 'XP'));
    xpLabel.appendChild(el('span', undefined, `${cat.xp}/${nextThreshold}`));
    xpSection.appendChild(xpLabel);
    const xpTrack = el('div', 'progress-bar');
    const xpFill = el('div', 'progress-fill progress-fill-purple');
    xpFill.style.width = `${Math.min(100, (cat.xp / nextThreshold) * 100)}%`;
    xpTrack.appendChild(xpFill);
    xpSection.appendChild(xpTrack);
    panel.appendChild(xpSection);
  }

  // Abilities
  const abilities = el('div', 'cat-abilities');
  for (const ability of cat.abilities) {
    const cd = cat.cooldowns[ability.name] ?? 0;
    const abilityEl = el('div', `cat-ability${cd > 0 ? ' locked' : ''}`);
    const abilityName = el('span', 'cat-ability-name', ability.name);
    const abilityDesc = el('span', 'cat-ability-desc', cd > 0 ? `CD: ${cd}` : ability.description);
    abilityEl.appendChild(abilityName);
    abilityEl.appendChild(abilityDesc);
    abilities.appendChild(abilityEl);
  }
  panel.appendChild(abilities);

  // Dialogue
  if (dialogue) {
    const dialogueEl = el('div', 'cat-dialogue', dialogue);
    panel.appendChild(dialogueEl);
  }

  return panel;
}
