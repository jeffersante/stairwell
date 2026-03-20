import { el } from '../../utils';
import { audio } from '../../engine/audio';

export function renderAudioControls(): HTMLElement {
  const wrapper = el('div', 'audio-controls');

  const masterBtn = el('button', 'audio-master-btn', audio.isAllMuted() ? '🔇' : '🔊');
  masterBtn.title = 'Toggle sound';
  masterBtn.addEventListener('click', () => {
    audio.init();
    if (audio.isAllMuted()) {
      audio.unmuteAll();
      masterBtn.textContent = '🔊';
    } else {
      audio.muteAll();
      masterBtn.textContent = '🔇';
    }
    updatePanel();
  });
  wrapper.appendChild(masterBtn);

  const panel = el('div', 'audio-panel');
  panel.style.display = 'none';

  const categories: Array<{ key: 'music' | 'sfx' | 'announcer'; label: string }> = [
    { key: 'music', label: 'Music' },
    { key: 'sfx', label: 'SFX' },
    { key: 'announcer', label: 'Announcer' },
  ];

  const sliders: Record<string, HTMLInputElement> = {};
  const muteButtons: Record<string, HTMLButtonElement> = {};

  for (const cat of categories) {
    const row = el('div', 'audio-row');
    const label = el('span', 'audio-label', cat.label);

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '100';
    slider.value = String(Math.round(audio.getVolumeLevel(cat.key) * 100));
    slider.className = 'audio-slider';
    slider.addEventListener('input', () => {
      audio.init();
      audio.setVolume(cat.key, parseInt(slider.value) / 100);
    });
    sliders[cat.key] = slider;

    const muteBtn = document.createElement('button');
    muteBtn.className = 'audio-mute-btn';
    muteBtn.textContent = audio.isMuted(cat.key) ? '🔇' : '🔈';
    muteBtn.addEventListener('click', () => {
      audio.init();
      audio.toggleMute(cat.key);
      muteBtn.textContent = audio.isMuted(cat.key) ? '🔇' : '🔈';
      updateMasterIcon();
    });
    muteButtons[cat.key] = muteBtn;

    row.appendChild(label);
    row.appendChild(slider);
    row.appendChild(muteBtn);
    panel.appendChild(row);
  }

  wrapper.appendChild(panel);

  masterBtn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    togglePanel();
  });

  // Long press on mobile to open panel
  let pressTimer: ReturnType<typeof setTimeout>;
  masterBtn.addEventListener('pointerdown', () => {
    pressTimer = setTimeout(togglePanel, 500);
  });
  masterBtn.addEventListener('pointerup', () => clearTimeout(pressTimer));
  masterBtn.addEventListener('pointerleave', () => clearTimeout(pressTimer));

  // Settings gear to open panel
  const gearBtn = el('button', 'audio-gear-btn', '⚙');
  gearBtn.title = 'Audio settings';
  gearBtn.addEventListener('click', togglePanel);
  wrapper.appendChild(gearBtn);

  function togglePanel() {
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
  }

  function updateMasterIcon() {
    masterBtn.textContent = audio.isAllMuted() ? '🔇' : '🔊';
  }

  function updatePanel() {
    for (const cat of categories) {
      muteButtons[cat.key].textContent = audio.isMuted(cat.key) ? '🔇' : '🔈';
      sliders[cat.key].value = String(Math.round(audio.getVolumeLevel(cat.key) * 100));
    }
  }

  return wrapper;
}
