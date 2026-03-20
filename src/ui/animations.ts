export function slideIn(element: HTMLElement): void {
  element.style.animation = 'none';
  element.offsetHeight; // force reflow
  element.style.animation = 'slide-in 250ms ease';
}

export function slideOut(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    element.style.animation = 'slide-out 250ms ease forwards';
    element.addEventListener('animationend', () => resolve(), { once: true });
  });
}

export function slideInLeft(element: HTMLElement): void {
  element.style.animation = 'slide-in-left 250ms ease';
}

export function slideInRight(element: HTMLElement): void {
  element.style.animation = 'slide-in-right 250ms ease';
}

export function pulse(element: HTMLElement): void {
  element.style.animation = 'none';
  element.offsetHeight;
  element.style.animation = 'pulse 1s ease-in-out infinite';
}

export function shake(element: HTMLElement): void {
  element.classList.add('shake');
  element.addEventListener('animationend', () => {
    element.classList.remove('shake');
  }, { once: true });
}

export function fadeIn(element: HTMLElement, durationMs = 250): void {
  element.style.animation = `fadeIn ${durationMs}ms ease`;
}

export function fadeOut(element: HTMLElement, durationMs = 300): Promise<void> {
  return new Promise((resolve) => {
    element.style.animation = `fadeOut ${durationMs}ms ease forwards`;
    element.addEventListener('animationend', () => resolve(), { once: true });
  });
}

export function hpFlash(element: HTMLElement): void {
  element.classList.add('hp-fill-flash');
  element.addEventListener('animationend', () => {
    element.classList.remove('hp-fill-flash');
  }, { once: true });
}

export function viewerSpike(element: HTMLElement): void {
  element.classList.add('viewer-count-spike');
  element.addEventListener('animationend', () => {
    element.classList.remove('viewer-count-spike');
  }, { once: true });
}

export function bounceIn(element: HTMLElement): void {
  element.style.animation = 'bounce-in 400ms ease';
}

export function damageFloat(container: HTMLElement, amount: number, type: 'dealt' | 'taken' | 'heal' | 'block'): void {
  const num = document.createElement('div');
  num.className = `damage-number damage-number-${type}`;
  num.textContent = type === 'heal' ? `+${amount}` : `-${amount}`;
  num.style.left = '50%';
  num.style.top = '50%';
  container.appendChild(num);
  num.addEventListener('animationend', () => num.remove(), { once: true });
}

export function typewriterEffect(element: HTMLElement, text: string, speed = 30): Promise<void> {
  return new Promise((resolve) => {
    element.textContent = '';
    element.classList.add('typing');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
        element.classList.remove('typing');
        resolve();
      }
    }, speed);
  });
}
