import { el } from '../../utils';
import { audio } from '../../engine/audio';
import type { Spell } from '../../data/spells';

const SCHOOL_COLORS: Record<string, string> = {
  structural: '#a0522d',
  hvac: '#4a8cc4',
  electrical: '#d4a843',
  plumbing: '#4a9c8c',
  eldritch_filing: '#9b59b6',
};

const SCHOOL_EMOJI: Record<string, string> = {
  structural: '\uD83E\uDDF1',
  hvac: '\uD83C\uDF2C\uFE0F',
  electrical: '\u26A1',
  plumbing: '\uD83D\uDEB0',
  eldritch_filing: '\uD83D\uDCC4',
};

export function renderSpellBar(spells: Spell[], currentMana: number, onCast: (spell: Spell) => void): HTMLElement {
  const bar = el('div', 'spell-bar');

  for (const spell of spells) {
    const canCast = currentMana >= spell.manaCost;
    const btn = el('button', `spell-btn${canCast ? '' : ' spell-btn-disabled'}`);
    btn.style.borderColor = SCHOOL_COLORS[spell.school] ?? '#555';
    btn.title = `${spell.name}: ${spell.description} (${spell.manaCost} mana)`;

    const icon = el('span', 'spell-icon', SCHOOL_EMOJI[spell.school] ?? '\u2728');
    btn.appendChild(icon);

    const name = el('span', 'spell-name', spell.name);
    btn.appendChild(name);

    const cost = el('span', 'spell-cost', `${spell.manaCost}`);
    btn.appendChild(cost);

    if (canCast) {
      btn.addEventListener('click', () => {
        audio.playButtonClick();
        onCast(spell);
      });
    }

    bar.appendChild(btn);
  }

  return bar;
}
