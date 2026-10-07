// Auspicious Kerala temple ambient audio synthesizer using Web Audio API

const STORAGE_KEY = 'wedding_audio_muted_by_user';

type AudioListener = (isPlaying: boolean) => void;

class TempleAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private listeners: Set<AudioListener> = new Set();
  private gestureListenersAttached: boolean = false;

  constructor() {
    // Check if user has explicitly muted
  }

  public isUserMuted(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }

  public setUserMuted(muted: boolean): void {
    try {
      if (muted) {
        localStorage.setItem(STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  public subscribe(fn: AudioListener): () => void {
    this.listeners.add(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public start(): boolean {
    if (this.isPlaying) return true;

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return false;

      if (!this.ctx || this.ctx.state === 'closed') {
        this.ctx = new AudioContextClass();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch(() => {});
      } else {
        this.isPlaying = true;
      }

      this.setupMasterGain();
      this.playTamburaDrone();
      this.scheduleTempleBells();
      this.notify();
      return true;
    } catch (e) {
      console.warn('Audio playback not supported:', e);
      return false;
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      } catch {}
    }
    setTimeout(() => {
      if (!this.isPlaying && this.ctx) {
        this.ctx.close().catch(() => {});
        this.ctx = null;
        this.masterGain = null;
      }
    }, 600);
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.setUserMuted(true);
      this.stop();
      return false;
    } else {
      this.setUserMuted(false);
      const started = this.start();
      // In case browser requires direct gesture, ctx.resume handles it
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.isPlaying = true;
          this.notify();
        });
      }
      return started;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  /**
   * Initializes autoplay on first visit.
   * If the user has not disabled audio, starts playback immediately
   * or binds a one-time gesture listener on the window to begin on first tap/scroll.
   */
  public initAutoPlay(): void {
    // If the user previously clicked mute, respect their choice
    if (this.isUserMuted()) {
      return;
    }

    // Attempt direct start
    const started = this.start();

    // If browser suspended it pending user gesture, bind one-time interaction triggers
    const handleFirstGesture = () => {
      if (this.isUserMuted()) {
        removeGestureListeners();
        return;
      }

      if (!this.ctx || this.ctx.state === 'closed') {
        this.start();
      } else if (this.ctx.state === 'suspended') {
        this.ctx.resume().then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch(() => {});
      } else {
        this.isPlaying = true;
        this.notify();
      }

      removeGestureListeners();
    };

    const removeGestureListeners = () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      this.gestureListenersAttached = false;
    };

    if (!this.gestureListenersAttached) {
      this.gestureListenersAttached = true;
      window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
      window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
      window.addEventListener('pointerdown', handleFirstGesture, { once: true, passive: true });
      window.addEventListener('keydown', handleFirstGesture, { once: true, passive: true });
      window.addEventListener('scroll', handleFirstGesture, { once: true, passive: true });
    }
  }

  private setupMasterGain(): void {
    if (!this.ctx) return;
    this.masterGain = this.ctx.createGain();
    // Smooth fade in
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1.2);
    this.masterGain.connect(this.ctx.destination);
  }

  private playTamburaDrone(): void {
    if (!this.ctx || !this.masterGain) return;

    // Sacred D (Sa - Pa - Sa) classical Indian scale
    const baseFreqs = [146.83, 220.0, 293.66]; // D3, A3, D4

    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Lowpass filter to soften the tambura drone into a warm temple hum
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.018 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
    });
  }

  private scheduleTempleBells(): void {
    if (!this.ctx) return;

    const playBell = () => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;

      const freqs = [587.33, 880.0, 1174.66, 1318.51]; // D5, A5, D6, E6
      const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];

      const osc = this.ctx.createOscillator();
      const bellGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(chosenFreq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      bellGain.gain.setValueAtTime(0.035, now);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(bellGain);
      bellGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.3);
    };

    // First bell after small delay
    setTimeout(() => {
      if (this.isPlaying) playBell();
    }, 400);

    // Periodic auspicious chime
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        playBell();
      }
    }, 4200);
  }
}

export const templeAudio = new TempleAudioPlayer();
