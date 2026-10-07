// Auspicious Kerala temple ambient audio synthesizer using Web Audio API

class TempleAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;

  public start(): boolean {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return false;

      this.ctx = new AudioContextClass();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isPlaying = true;
      this.playTamburaDrone();
      this.scheduleTempleBells();
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
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return this.start();
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private playTamburaDrone(): void {
    if (!this.ctx || !this.isPlaying) return;

    // Auspicious Sa - Pa tanpura frequency (approx D3 = 146.83 Hz and A3 = 220 Hz)
    const baseFreqs = [146.83, 220, 293.66];
    
    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      // Gentle warm drone volume
      gain.gain.setValueAtTime(0.015 / (idx + 1), this.ctx.currentTime);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
    });
  }

  private scheduleTempleBells(): void {
    if (!this.isPlaying) return;

    const playBell = () => {
      if (!this.ctx || !this.isPlaying) return;
      
      const freqs = [587.33, 880, 1174.66, 1318.51]; // Auspicious pentatonic temple bell notes
      const chosenFreq = freqs[Math.floor(Math.random() * freqs.length)];
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(chosenFreq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.3);
    };

    // Play initial gentle chime
    playBell();

    // Schedule subsequent gentle auspicious temple chimes
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        playBell();
      }
    }, 4500);
  }
}

export const templeAudio = new TempleAudioPlayer();
