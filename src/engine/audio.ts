import type { FloorTheme } from '../types';

type SoundCategory = 'music' | 'sfx' | 'announcer';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private volumes: Record<SoundCategory, number> = { music: 0.3, sfx: 0.5, announcer: 0.6 };
  private muted: Record<SoundCategory, boolean> = { music: false, sfx: false, announcer: false };
  private ambientNodes: OscillatorNode[] = [];
  private ambientGains: GainNode[] = [];
  private masterGain: GainNode | null = null;

  init(): void {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.connect(this.ctx.destination);
  }

  private ensureCtx(): AudioContext {
    if (!this.ctx) this.init();
    return this.ctx!;
  }

  private getVolume(category: SoundCategory): number {
    if (this.muted[category]) return 0;
    return this.volumes[category];
  }

  setVolume(category: SoundCategory, vol: number): void {
    this.volumes[category] = Math.max(0, Math.min(1, vol));
  }

  mute(category: SoundCategory): void {
    this.muted[category] = true;
  }

  unmute(category: SoundCategory): void {
    this.muted[category] = false;
  }

  toggleMute(category: SoundCategory): void {
    this.muted[category] = !this.muted[category];
  }

  isMuted(category: SoundCategory): boolean {
    return this.muted[category];
  }

  getVolumeLevel(category: SoundCategory): number {
    return this.volumes[category];
  }

  muteAll(): void {
    this.muted.music = true;
    this.muted.sfx = true;
    this.muted.announcer = true;
  }

  unmuteAll(): void {
    this.muted.music = false;
    this.muted.sfx = false;
    this.muted.announcer = false;
  }

  isAllMuted(): boolean {
    return this.muted.music && this.muted.sfx && this.muted.announcer;
  }

  // --- Utility helpers ---

  private createOsc(type: OscillatorType, freq: number, duration: number, vol: number, category: SoundCategory): void {
    const ctx = this.ensureCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = vol * this.getVolume(category);
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration + 0.05);
  }

  private createNoise(duration: number, vol: number, category: SoundCategory, filterFreq?: number): void {
    const ctx = this.ensureCtx();
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.value = vol * this.getVolume(category);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    if (filterFreq) {
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = filterFreq;
      filter.Q.value = 1;
      source.connect(filter);
      filter.connect(gain);
    } else {
      source.connect(gain);
    }
    gain.connect(this.masterGain!);
    source.start(ctx.currentTime);
    source.stop(ctx.currentTime + duration + 0.05);
  }

  private playTone(freq: number, duration: number, type: OscillatorType, vol: number, delay: number, category: SoundCategory): void {
    const ctx = this.ensureCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(this.masterGain!);
    const startTime = ctx.currentTime + delay;
    gain.gain.setValueAtTime(vol * this.getVolume(category), startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  // === SFX ===

  playDiceRoll(): void {
    const ctx = this.ensureCtx();
    const vol = this.getVolume('sfx');
    if (vol === 0) return;
    // Rapid clicking for 300ms
    for (let i = 0; i < 8; i++) {
      const freq = 800 + Math.random() * 600;
      this.playTone(freq, 0.03, 'square', 0.15, i * 0.035, 'sfx');
    }
    // Landing thunk
    this.playTone(200, 0.15, 'triangle', 0.4, 0.3, 'sfx');
    // Use noise for the "thunk" texture
    const bufSize = Math.floor(ctx.sampleRate * 0.08);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    g.gain.value = 0.3 * vol;
    src.connect(g);
    g.connect(this.masterGain!);
    src.start(ctx.currentTime + 0.3);
  }

  playHit(damage: number): void {
    const vol = this.getVolume('sfx');
    if (vol === 0) return;
    const intensity = Math.min(damage / 30, 1);
    this.createNoise(0.1 + intensity * 0.15, 0.3 + intensity * 0.4, 'sfx', 600 + intensity * 800);
    this.playTone(100 + intensity * 80, 0.12, 'sawtooth', 0.2 + intensity * 0.2, 0, 'sfx');
  }

  playCritical(): void {
    if (this.getVolume('sfx') === 0) return;
    // Major chord arpeggio: C-E-G
    this.playTone(523.25, 0.4, 'triangle', 0.3, 0, 'sfx');     // C5
    this.playTone(659.25, 0.35, 'triangle', 0.25, 0.08, 'sfx'); // E5
    this.playTone(783.99, 0.3, 'triangle', 0.25, 0.16, 'sfx');  // G5
    // Shimmer
    this.playTone(1046.5, 0.5, 'sine', 0.15, 0.24, 'sfx');     // C6
    this.createNoise(0.3, 0.08, 'sfx', 4000);
  }

  playFumble(): void {
    if (this.getVolume('sfx') === 0) return;
    // Sad descending tones
    this.playTone(400, 0.3, 'triangle', 0.25, 0, 'sfx');
    this.playTone(350, 0.3, 'triangle', 0.2, 0.15, 'sfx');
    this.playTone(280, 0.3, 'triangle', 0.2, 0.3, 'sfx');
    this.playTone(200, 0.5, 'triangle', 0.25, 0.45, 'sfx');
  }

  playMiss(): void {
    if (this.getVolume('sfx') === 0) return;
    // Whoosh: filtered noise sweep
    const ctx = this.ensureCtx();
    const duration = 0.25;
    const bufSize = Math.floor(ctx.sampleRate * duration);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      const env = Math.sin((i / bufSize) * Math.PI);
      d[i] = (Math.random() * 2 - 1) * env;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    filter.frequency.linearRampToValueAtTime(500, ctx.currentTime + duration);
    filter.Q.value = 2;
    const gain = ctx.createGain();
    gain.gain.value = 0.2 * this.getVolume('sfx');
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain!);
    src.start(ctx.currentTime);
  }

  playHeal(amount: number): void {
    if (this.getVolume('sfx') === 0) return;
    const steps = Math.min(Math.ceil(amount / 10), 5);
    for (let i = 0; i < steps; i++) {
      this.playTone(600 + i * 100, 0.2, 'sine', 0.2, i * 0.1, 'sfx');
    }
  }

  playLevelUp(): void {
    if (this.getVolume('sfx') === 0) return;
    // Fanfare arpeggio: C-E-G-C
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, i) => {
      this.playTone(freq, 0.3, 'triangle', 0.25, i * 0.1, 'sfx');
    });
  }

  playItemPickup(): void {
    if (this.getVolume('sfx') === 0) return;
    this.playTone(880, 0.08, 'sine', 0.2, 0, 'sfx');
    this.playTone(1100, 0.12, 'sine', 0.25, 0.06, 'sfx');
  }

  playGoldPickup(): void {
    if (this.getVolume('sfx') === 0) return;
    this.playTone(1200, 0.06, 'square', 0.1, 0, 'sfx');
    this.playTone(1500, 0.06, 'square', 0.1, 0.05, 'sfx');
    this.playTone(1800, 0.1, 'square', 0.12, 0.1, 'sfx');
  }

  playDeath(): void {
    if (this.getVolume('sfx') === 0) return;
    // Dramatic descending chord
    this.playTone(300, 0.6, 'sawtooth', 0.3, 0, 'sfx');
    this.playTone(250, 0.6, 'sawtooth', 0.25, 0.1, 'sfx');
    this.playTone(180, 0.8, 'sawtooth', 0.3, 0.2, 'sfx');
    this.playTone(100, 1.0, 'sawtooth', 0.35, 0.4, 'sfx');
    // Static burst
    this.createNoise(1.2, 0.2, 'sfx', 1000);
  }

  playButtonClick(): void {
    if (this.getVolume('sfx') === 0) return;
    this.playTone(1000, 0.04, 'square', 0.08, 0, 'sfx');
  }

  playMenuOpen(): void {
    if (this.getVolume('sfx') === 0) return;
    this.createNoise(0.15, 0.06, 'sfx', 3000);
    this.playTone(600, 0.1, 'sine', 0.1, 0.02, 'sfx');
  }

  playSpellCast(school: string): void {
    if (this.getVolume('sfx') === 0) return;
    switch (school) {
      case 'structural':
        this.playTone(200, 0.3, 'sawtooth', 0.3, 0, 'sfx');
        this.createNoise(0.2, 0.2, 'sfx', 400);
        break;
      case 'hvac':
        this.playTone(800, 0.4, 'sine', 0.2, 0, 'sfx');
        this.playTone(850, 0.35, 'sine', 0.15, 0.05, 'sfx');
        break;
      case 'electrical':
        for (let i = 0; i < 4; i++) {
          this.playTone(1200 + Math.random() * 800, 0.05, 'square', 0.15, i * 0.06, 'sfx');
        }
        break;
      case 'plumbing':
        this.playTone(300, 0.3, 'sine', 0.2, 0, 'sfx');
        this.playTone(350, 0.25, 'sine', 0.15, 0.1, 'sfx');
        this.playTone(500, 0.3, 'sine', 0.2, 0.2, 'sfx');
        break;
      case 'eldritch_filing':
        this.playTone(150, 0.5, 'sawtooth', 0.2, 0, 'sfx');
        this.playTone(155, 0.5, 'sawtooth', 0.2, 0, 'sfx'); // detuned for unease
        this.createNoise(0.4, 0.1, 'sfx', 800);
        break;
    }
  }

  playCatMeow(): void {
    if (this.getVolume('sfx') === 0) return;
    const ctx = this.ensureCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.1);
    osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2 * this.getVolume('sfx'), ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  }

  playCatPurr(): void {
    if (this.getVolume('sfx') === 0) return;
    const ctx = this.ensureCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 25;
    // Amplitude modulation for purr texture
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 26;
    lfoGain.gain.value = 0.15 * this.getVolume('sfx');
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    gain.gain.value = 0.15 * this.getVolume('sfx');
    osc.connect(gain);
    gain.connect(this.masterGain!);
    osc.start(ctx.currentTime);
    lfo.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.5);
    lfo.stop(ctx.currentTime + 1.5);
  }

  playCatHiss(): void {
    if (this.getVolume('sfx') === 0) return;
    this.createNoise(0.3, 0.25, 'sfx', 5000);
  }

  // === Ambient ===

  startAmbient(theme: FloorTheme): void {
    this.stopAmbient();
    const vol = this.getVolume('music');
    if (vol === 0) return;
    const ctx = this.ensureCtx();

    const configs: Record<FloorTheme, { freq: number; type: OscillatorType; lfoFreq: number; vol: number }[]> = {
      lobby: [
        { freq: 60, type: 'sine', lfoFreq: 0.1, vol: 0.06 },
        { freq: 120, type: 'sine', lfoFreq: 0.05, vol: 0.03 },
      ],
      offices: [
        { freq: 100, type: 'triangle', lfoFreq: 0.2, vol: 0.04 },
        { freq: 250, type: 'sine', lfoFreq: 3, vol: 0.02 }, // typing-like flutter
      ],
      executive: [
        { freq: 55, type: 'sine', lfoFreq: 0.08, vol: 0.08 },
        { freq: 82, type: 'sawtooth', lfoFreq: 0.03, vol: 0.03 },
      ],
      maintenance: [
        { freq: 80, type: 'sawtooth', lfoFreq: 0.5, vol: 0.05 },
        { freq: 200, type: 'square', lfoFreq: 2, vol: 0.02 },
      ],
      archives: [
        { freq: 220, type: 'sine', lfoFreq: 0.07, vol: 0.04 },
        { freq: 330, type: 'sine', lfoFreq: 0.05, vol: 0.02 },
      ],
      basement: [
        { freq: 40, type: 'sawtooth', lfoFreq: 0.04, vol: 0.07 },
        { freq: 42, type: 'sawtooth', lfoFreq: 0.03, vol: 0.06 }, // detuned drone
      ],
    };

    const layers = configs[theme];
    for (const layer of layers) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc.type = layer.type;
      osc.frequency.value = layer.freq;
      lfo.type = 'sine';
      lfo.frequency.value = layer.lfoFreq;
      lfoGain.gain.value = layer.vol * vol * 0.5;

      gain.gain.value = layer.vol * vol;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start();
      lfo.start();

      this.ambientNodes.push(osc, lfo);
      this.ambientGains.push(gain);
    }
  }

  stopAmbient(): void {
    for (const node of this.ambientNodes) {
      try { node.stop(); } catch { /* already stopped */ }
    }
    this.ambientNodes = [];
    this.ambientGains = [];
  }

  // === Announcer Sounds ===

  playAnnouncerSting(): void {
    if (this.getVolume('announcer') === 0) return;
    // TV static burst
    this.createNoise(0.15, 0.2, 'announcer', 2000);
    this.playTone(440, 0.05, 'square', 0.1, 0.02, 'announcer');
  }

  playViewerMilestone(): void {
    if (this.getVolume('announcer') === 0) return;
    // Crowd cheer (noise burst) + airhorn
    this.createNoise(0.8, 0.15, 'announcer', 1500);
    this.playTone(440, 0.3, 'sawtooth', 0.3, 0, 'announcer');
    this.playTone(554, 0.3, 'sawtooth', 0.25, 0.05, 'announcer');
    this.playTone(659, 0.5, 'sawtooth', 0.3, 0.1, 'announcer');
  }
}

export const audio = new AudioEngine();
