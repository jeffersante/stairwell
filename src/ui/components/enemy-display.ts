import { el } from '../../utils';
import type { CombatState } from '../../types';

export function renderEnemyDisplay(combat: CombatState): HTMLElement {
  const area = el('div', 'combat-enemy-area');

  const emoji = el('div', 'combat-enemy-emoji', combat.enemy.emoji);
  emoji.id = 'enemy-emoji';
  area.appendChild(emoji);

  const name = el('div', 'combat-enemy-name', combat.enemy.name);
  area.appendChild(name);

  // HP bar
  const hpContainer = el('div', 'combat-enemy-hp');
  const hpBar = el('div', 'hp-bar');
  const pct = Math.max(0, combat.enemyHp / combat.enemyMaxHp);
  const hpFill = el('div', `hp-fill ${getHpFillClass(pct)}`);
  hpFill.id = 'enemy-hp-fill';
  hpFill.style.width = `${pct * 100}%`;
  hpBar.appendChild(hpFill);
  hpContainer.appendChild(hpBar);

  const hpLabel = el('div', 'hp-label');
  const hpValue = el('span', 'hp-label-value', `${combat.enemyHp}/${combat.enemyMaxHp}`);
  hpValue.id = 'enemy-hp-text';
  hpLabel.appendChild(hpValue);
  hpContainer.appendChild(hpLabel);
  area.appendChild(hpContainer);

  // Status effects
  if (combat.enemyStatuses.length > 0) {
    const statusArea = el('div', 'combat-status-area');
    for (const s of combat.enemyStatuses) {
      const badge = el('span', `status-badge status-badge-${getStatusBadgeClass(s.effect)}`);
      const icon = el('span', 'status-badge-icon', getStatusIcon(s.effect));
      const dur = el('span', 'status-badge-duration', `${s.turns}`);
      badge.appendChild(icon);
      badge.appendChild(document.createTextNode(s.effect));
      badge.appendChild(dur);
      statusArea.appendChild(badge);
    }
    area.appendChild(statusArea);
  }

  // Telegraph
  const telegraph = el('div', 'combat-telegraph');
  const telegraphText = el('div', 'combat-telegraph-text', combat.enemyNextAction.telegraph);
  telegraphText.id = 'enemy-telegraph';
  telegraph.appendChild(telegraphText);
  area.appendChild(telegraph);

  // Intent
  const intent = el('div', 'combat-enemy-intent');
  const intentIcon = el('span', 'combat-enemy-intent-icon', '\u2694\uFE0F');
  intent.appendChild(intentIcon);
  intent.appendChild(document.createTextNode(`Next: ${combat.enemyNextAction.name} (${combat.enemyNextAction.damage} dmg)`));
  intent.id = 'enemy-intent';
  area.appendChild(intent);

  return area;
}

export function updateEnemyDisplay(combat: CombatState): void {
  const hpFill = document.getElementById('enemy-hp-fill');
  const hpText = document.getElementById('enemy-hp-text');
  const telegraph = document.getElementById('enemy-telegraph');
  const intent = document.getElementById('enemy-intent');

  if (hpFill) {
    const pct = Math.max(0, combat.enemyHp / combat.enemyMaxHp);
    hpFill.style.width = `${pct * 100}%`;
    hpFill.className = `hp-fill ${getHpFillClass(pct)}`;
  }
  if (hpText) hpText.textContent = `${combat.enemyHp}/${combat.enemyMaxHp}`;
  if (telegraph) telegraph.textContent = combat.enemyNextAction.telegraph;
  if (intent) {
    intent.innerHTML = '';
    const intentIcon = el('span', 'combat-enemy-intent-icon', '\u2694\uFE0F');
    intent.appendChild(intentIcon);
    intent.appendChild(document.createTextNode(`Next: ${combat.enemyNextAction.name} (${combat.enemyNextAction.damage} dmg)`));
  }
}

function getHpFillClass(pct: number): string {
  if (pct > 0.6) return 'hp-fill-high';
  if (pct > 0.3) return 'hp-fill-mid';
  return 'hp-fill-low';
}

function getStatusBadgeClass(effect: string): string {
  switch (effect) {
    case 'poison': return 'poison';
    case 'stun': return 'stun';
    case 'bleed': return 'bleed';
    case 'cursed': return 'curse';
    case 'on_fire': return 'burn';
    case 'existential_dread': return 'debuff';
    default: return 'debuff';
  }
}

function getStatusIcon(effect: string): string {
  switch (effect) {
    case 'poison': return '\u2620\uFE0F';
    case 'stun': return '\u26A1';
    case 'bleed': return '\uD83E\uDE78';
    case 'cursed': return '\uD83D\uDC80';
    case 'on_fire': return '\uD83D\uDD25';
    case 'existential_dread': return '\uD83C\uDF00';
    default: return '\u2753';
  }
}
