import type { DieType } from '../types';
import { el } from '../utils';
import { audio } from '../engine/audio';

interface DiceAnimationOptions {
  die: DieType;
  result: number;
  critical: boolean;
  fumble: boolean;
  container: HTMLElement;
  onComplete: () => void;
}

export function animateDiceRoll(options: DiceAnimationOptions): void {
  const { die, result, critical, fumble, container, onComplete } = options;

  audio.playDiceRoll();

  const wrapper = el('div', 'dice-overlay');
  const diceContainer = el('div', 'dice-container');
  const cube = el('div', 'dice-cube');

  // Create faces with random numbers during tumble
  const dieMax = parseInt(die.slice(1));
  for (let i = 0; i < 6; i++) {
    const face = el('div', `dice-face dice-face-${i + 1}`);
    face.textContent = String(Math.ceil(Math.random() * dieMax));
    cube.appendChild(face);
  }

  diceContainer.appendChild(cube);
  wrapper.appendChild(diceContainer);

  // Die label
  const label = el('div', 'dice-label', die.toUpperCase());
  wrapper.appendChild(label);

  container.appendChild(wrapper);

  // Tumble animation runs via CSS, then show result
  setTimeout(() => {
    cube.classList.add('dice-landed');

    // Replace front face with actual result
    const frontFace = cube.querySelector('.dice-face-1');
    if (frontFace) {
      frontFace.textContent = String(result);
    }

    // Show result overlay
    const resultEl = el('div', 'dice-result');
    resultEl.textContent = String(result);

    if (critical) {
      resultEl.classList.add('dice-critical');
      audio.playCritical();
      spawnCritParticles(wrapper);
    } else if (fumble) {
      resultEl.classList.add('dice-fumble');
      audio.playFumble();
      container.classList.add('shake');
      setTimeout(() => container.classList.remove('shake'), 300);
    }

    wrapper.appendChild(resultEl);

    // Clean up after display
    setTimeout(() => {
      wrapper.remove();
      onComplete();
    }, critical ? 800 : 500);
  }, 600);
}

function spawnCritParticles(container: HTMLElement): void {
  for (let i = 0; i < 12; i++) {
    const particle = el('div', 'dice-particle');
    const angle = (i / 12) * Math.PI * 2;
    const dist = 40 + Math.random() * 40;
    particle.style.setProperty('--px', `${Math.cos(angle) * dist}px`);
    particle.style.setProperty('--py', `${Math.sin(angle) * dist}px`);
    particle.style.animationDelay = `${Math.random() * 0.1}s`;
    container.appendChild(particle);
  }
}
