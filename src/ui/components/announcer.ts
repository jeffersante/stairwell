import { el } from '../../utils';
import { typewriterEffect } from '../animations';

export function renderAnnouncer(text: string, options?: { size?: 'sm' | 'base' | 'lg'; skipTypewriter?: boolean }): HTMLElement {
  const container = el('div', 'announcer-box');

  const label = el('span', 'announcer-label', 'THE ANNOUNCER');
  container.appendChild(label);

  const sizeClass = options?.size === 'sm' ? ' announcer-text-sm' : options?.size === 'lg' ? ' announcer-text-lg' : '';
  const textEl = el('div', `announcer-text${sizeClass}`);

  if (options?.skipTypewriter) {
    textEl.textContent = text;
  } else {
    typewriterEffect(textEl, text, 25);
  }

  container.appendChild(textEl);
  return container;
}

export function renderAnnouncerInline(text: string): HTMLElement {
  const textEl = el('div', 'announcer-text announcer-text-sm');
  textEl.textContent = text;
  return textEl;
}
