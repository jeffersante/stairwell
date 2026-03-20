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

// === Combat Animations ===

export function animateAttack(source: HTMLElement, target: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const dx = targetRect.left - sourceRect.left;
    const dy = targetRect.top - sourceRect.top;

    source.style.transition = 'transform 150ms ease-in';
    source.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;

    setTimeout(() => {
      source.style.transition = 'transform 100ms ease-out';
      source.style.transform = '';
      shake(target);
      setTimeout(resolve, 100);
    }, 150);
  });
}

export function animateSpellCast(casterEl: HTMLElement, school: string): Promise<void> {
  return new Promise((resolve) => {
    const schoolClass = `spell-cast-${school.replace('_', '-')}`;
    casterEl.classList.add('spell-casting', schoolClass);
    setTimeout(() => {
      casterEl.classList.remove('spell-casting', schoolClass);
      resolve();
    }, 500);
  });
}

export function animateDamageNumber(container: HTMLElement, damage: number, type: 'dealt' | 'taken' | 'healed'): void {
  const num = document.createElement('div');
  const mappedType = type === 'healed' ? 'heal' : type;
  num.className = `damage-number damage-number-${mappedType}`;
  num.textContent = type === 'healed' ? `+${damage}` : `-${damage}`;
  num.style.left = `${40 + Math.random() * 20}%`;
  num.style.top = '40%';
  container.appendChild(num);
  num.addEventListener('animationend', () => num.remove(), { once: true });
}

export function animateCriticalHit(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    container.classList.add('critical-flash');
    const banner = document.createElement('div');
    banner.className = 'critical-banner';
    banner.textContent = 'CRITICAL HIT!';
    container.appendChild(banner);
    setTimeout(() => {
      container.classList.remove('critical-flash');
      banner.remove();
      resolve();
    }, 600);
  });
}

export function animateStatusApplied(target: HTMLElement, effect: string): void {
  const badge = document.createElement('div');
  badge.className = `status-badge status-${effect.replace('_', '-')}`;
  badge.textContent = effect.replace('_', ' ');
  target.appendChild(badge);
  setTimeout(() => badge.remove(), 1500);
}

// === Screen Transitions ===

export function animateElevatorTransition(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'elevator-overlay';
    const leftDoor = document.createElement('div');
    leftDoor.className = 'elevator-door elevator-door-left';
    const rightDoor = document.createElement('div');
    rightDoor.className = 'elevator-door elevator-door-right';
    overlay.appendChild(leftDoor);
    overlay.appendChild(rightDoor);
    container.appendChild(overlay);

    // Doors close
    requestAnimationFrame(() => {
      leftDoor.classList.add('elevator-closed');
      rightDoor.classList.add('elevator-closed');
    });

    // Doors open after pause
    setTimeout(() => {
      leftDoor.classList.remove('elevator-closed');
      rightDoor.classList.remove('elevator-closed');
      leftDoor.classList.add('elevator-open');
      rightDoor.classList.add('elevator-open');
    }, 800);

    setTimeout(() => {
      overlay.remove();
      resolve();
    }, 1400);
  });
}

export function animateDoorOpen(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const door = document.createElement('div');
    door.className = 'door-overlay';
    container.appendChild(door);
    requestAnimationFrame(() => door.classList.add('door-opening'));
    setTimeout(() => {
      door.remove();
      resolve();
    }, 500);
  });
}

// === Loot Animations ===

export function animateItemReveal(container: HTMLElement, rarity: string): Promise<void> {
  return new Promise((resolve) => {
    container.classList.add('item-reveal', `item-reveal-${rarity}`);
    setTimeout(() => {
      container.classList.remove('item-reveal', `item-reveal-${rarity}`);
      resolve();
    }, 500);
  });
}

export function animateGoldEarned(container: HTMLElement, amount: number): void {
  const gold = document.createElement('div');
  gold.className = 'gold-earned-float';
  gold.textContent = `+$${amount}`;
  container.appendChild(gold);
  gold.addEventListener('animationend', () => gold.remove(), { once: true });
}

// === Cat Animations ===

export function animateCatIdle(catEl: HTMLElement): void {
  catEl.classList.add('cat-idle');
}

export function animateCatAttack(catEl: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    catEl.classList.add('cat-pounce');
    setTimeout(() => {
      catEl.classList.remove('cat-pounce');
      resolve();
    }, 400);
  });
}

export function animateCatSleep(catEl: HTMLElement): void {
  catEl.classList.remove('cat-idle', 'cat-pounce');
  catEl.classList.add('cat-sleep');
}

// === Viewer Animations ===

export function animateViewerCount(el: HTMLElement, from: number, to: number): void {
  const duration = 600;
  const start = performance.now();
  const diff = to - from;

  function tick(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(from + diff * eased);
    el.textContent = current.toLocaleString();
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

export function animateViewerMilestone(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const fireworks = document.createElement('div');
    fireworks.className = 'fireworks-overlay';
    for (let i = 0; i < 20; i++) {
      const spark = document.createElement('div');
      spark.className = 'firework-spark';
      spark.style.setProperty('--angle', `${(i / 20) * 360}deg`);
      spark.style.setProperty('--dist', `${50 + Math.random() * 60}px`);
      spark.style.setProperty('--hue', `${Math.random() * 360}`);
      spark.style.animationDelay = `${Math.random() * 0.2}s`;
      fireworks.appendChild(spark);
    }
    container.appendChild(fireworks);
    setTimeout(() => {
      fireworks.remove();
      resolve();
    }, 1000);
  });
}

// === Death ===

export function animateDeathSequence(container: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'death-overlay';

    const crack = document.createElement('div');
    crack.className = 'death-crack';
    overlay.appendChild(crack);

    const staticNoise = document.createElement('div');
    staticNoise.className = 'death-static';
    overlay.appendChild(staticNoise);

    container.appendChild(overlay);

    // Crack appears first
    requestAnimationFrame(() => crack.classList.add('crack-active'));

    // Static fills screen
    setTimeout(() => staticNoise.classList.add('static-active'), 400);

    setTimeout(() => {
      overlay.remove();
      resolve();
    }, 1200);
  });
}
