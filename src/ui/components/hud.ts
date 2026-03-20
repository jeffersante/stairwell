import { el } from '../../utils';
import { getRunState } from '../../engine/state';
import { getClassById } from '../../data/classes';
import { getPlayerXpThreshold } from '../../engine/progression';

let hudElement: HTMLElement | null = null;
let hpText: HTMLElement | null = null;
let hpFill: HTMLElement | null = null;
let manaFill: HTMLElement | null = null;
let manaText: HTMLElement | null = null;
let goldText: HTMLElement | null = null;
let floorText: HTMLElement | null = null;
let viewerText: HTMLElement | null = null;
let entertainmentFill: HTMLElement | null = null;
let levelText: HTMLElement | null = null;
let xpFill: HTMLElement | null = null;
let acText: HTMLElement | null = null;

export function renderHud(): HTMLElement {
  const state = getRunState();
  const playerClass = getClassById(state.playerClass);

  hudElement = el('div', 'hud');

  // Left: HP + Mana + Gold
  const left = el('div', 'hud-left');

  // Class icon + name
  if (playerClass) {
    const classDisplay = el('div', 'hud-class');
    classDisplay.appendChild(el('span', 'hud-class-emoji', playerClass.emoji));
    classDisplay.appendChild(el('span', 'hud-class-name', playerClass.name));
    const acEl = el('span', 'hud-ac');
    acEl.textContent = `AC ${state.armorClass}`;
    acText = acEl;
    classDisplay.appendChild(acEl);
    left.appendChild(classDisplay);
  }

  // HP
  const hpContainer = el('div', 'hud-hp-container');
  const hpBar = el('div', 'hp-bar hp-bar-sm');
  hpFill = el('div', `hp-fill ${getHpClass(state.hp, state.maxHp)}`);
  hpFill.style.width = `${(state.hp / state.maxHp) * 100}%`;
  hpBar.appendChild(hpFill);
  hpContainer.appendChild(hpBar);
  hpText = el('div', 'hud-hp-text', `${state.hp}/${state.maxHp}`);
  hpContainer.appendChild(hpText);
  left.appendChild(hpContainer);

  // Mana bar
  if (state.maxMana > 0) {
    const manaContainer = el('div', 'hud-mana-container');
    const manaBar = el('div', 'mana-bar mana-bar-sm');
    manaFill = el('div', 'mana-fill');
    manaFill.style.width = `${(state.mana / state.maxMana) * 100}%`;
    manaBar.appendChild(manaFill);
    manaContainer.appendChild(manaBar);
    manaText = el('div', 'hud-mana-text', `${state.mana}/${state.maxMana}`);
    manaContainer.appendChild(manaText);
    left.appendChild(manaContainer);
  }

  // Gold
  const goldDisplay = el('div', 'hud-gold');
  const goldIcon = el('span', 'hud-gold-icon', '\uD83D\uDCB0');
  goldText = el('span', undefined, `${state.gold}`);
  goldDisplay.appendChild(goldIcon);
  goldDisplay.appendChild(goldText);
  left.appendChild(goldDisplay);

  // Center: Floor + Level
  const center = el('div', 'hud-center');
  const floorLabel = el('span', 'hud-floor-label', 'B');
  floorText = el('span', 'hud-floor', `${state.floorNumber}`);
  center.appendChild(floorLabel);
  center.appendChild(floorText);

  // Level + XP
  const levelDisplay = el('div', 'hud-level-display');
  levelText = el('div', 'hud-level-text', `Lv ${state.playerLevel}`);
  levelDisplay.appendChild(levelText);
  const xpThreshold = getPlayerXpThreshold(state.playerLevel);
  const xpBar = el('div', 'hud-xp-bar');
  xpFill = el('div', 'hud-xp-fill');
  xpFill.style.width = `${xpThreshold < Infinity ? Math.min(100, (state.playerXp / xpThreshold) * 100) : 100}%`;
  xpBar.appendChild(xpFill);
  levelDisplay.appendChild(xpBar);
  center.appendChild(levelDisplay);

  // Right: Viewers
  const right = el('div', 'hud-right');
  const viewerCount = el('div', 'viewer-count');
  viewerText = el('div', 'viewer-count-number', `${state.viewers.count}`);
  const viewerLabel = el('div', 'viewer-count-label', 'VIEWERS');
  viewerCount.appendChild(viewerText);
  viewerCount.appendChild(viewerLabel);

  const eMeter = el('div', 'entertainment-meter');
  entertainmentFill = el('div', `entertainment-fill ${getEntertainmentClass(state.viewers.entertainmentMeter)}`);
  entertainmentFill.style.width = `${state.viewers.entertainmentMeter}%`;
  eMeter.appendChild(entertainmentFill);
  viewerCount.appendChild(eMeter);

  right.appendChild(viewerCount);

  hudElement.appendChild(left);
  hudElement.appendChild(center);
  hudElement.appendChild(right);

  return hudElement;
}

export function updateHud(): void {
  if (!hudElement) return;
  try {
    const state = getRunState();
    if (hpText) hpText.textContent = `${state.hp}/${state.maxHp}`;
    if (hpFill) {
      hpFill.style.width = `${(state.hp / state.maxHp) * 100}%`;
      hpFill.className = `hp-fill ${getHpClass(state.hp, state.maxHp)}`;
    }
    if (manaFill && state.maxMana > 0) {
      manaFill.style.width = `${(state.mana / state.maxMana) * 100}%`;
    }
    if (manaText) manaText.textContent = `${state.mana}/${state.maxMana}`;
    if (goldText) goldText.textContent = `${state.gold}`;
    if (floorText) floorText.textContent = `${state.floorNumber}`;
    if (viewerText) viewerText.textContent = `${state.viewers.count}`;
    if (entertainmentFill) {
      entertainmentFill.style.width = `${state.viewers.entertainmentMeter}%`;
      entertainmentFill.className = `entertainment-fill ${getEntertainmentClass(state.viewers.entertainmentMeter)}`;
    }
    if (levelText) levelText.textContent = `Lv ${state.playerLevel}`;
    if (xpFill) {
      const xpThreshold = getPlayerXpThreshold(state.playerLevel);
      xpFill.style.width = `${xpThreshold < Infinity ? Math.min(100, (state.playerXp / xpThreshold) * 100) : 100}%`;
    }
    if (acText) acText.textContent = `AC ${state.armorClass}`;
  } catch {
    // run may not be active
  }
}

export function removeHud(): void {
  if (hudElement && hudElement.parentElement) {
    hudElement.parentElement.removeChild(hudElement);
  }
  hudElement = null;
}

function getHpClass(hp: number, maxHp: number): string {
  const pct = hp / maxHp;
  if (pct > 0.6) return 'hp-fill-high';
  if (pct > 0.3) return 'hp-fill-mid';
  return 'hp-fill-low';
}

function getEntertainmentClass(meter: number): string {
  if (meter >= 70) return 'entertainment-fill-high';
  if (meter >= 40) return 'entertainment-fill-mid';
  return 'entertainment-fill-low';
}
