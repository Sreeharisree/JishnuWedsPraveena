type MusicListener = (isPlaying: boolean) => void;

class WeddingMusicManager {
  private isPlaying: boolean = true;
  private toggleHandler: (() => void) | null = null;
  private listeners: Set<MusicListener> = new Set();

  public registerPlayer(toggleFn: () => void) {
    this.toggleHandler = toggleFn;
  }

  public updateState(playing: boolean) {
    this.isPlaying = playing;
    this.listeners.forEach((fn) => fn(playing));
  }

  public toggle(): void {
    if (this.toggleHandler) {
      this.toggleHandler();
    }
  }

  public subscribe(fn: MusicListener): () => void {
    this.listeners.add(fn);
    fn(this.isPlaying);
    return () => {
      this.listeners.delete(fn);
    };
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const weddingMusic = new WeddingMusicManager();
