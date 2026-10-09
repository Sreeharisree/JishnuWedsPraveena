// Auspicious Ceremony Audio Engine
// Plays the uploaded Soulful Indian Wedding Chants ("Shubham Karoti Kalyanam")

const LOCAL_AUDIO_PATH = '/audio/shubham_karoti.mp3';
const DRIVE_STREAM_FALLBACK =
  'https://drive.usercontent.google.com/download?id=1JX-6BDsuJoXF-BUDZiuh-Z7M-OFvC-Vt&export=download';

type AudioListener = (isPlaying: boolean) => void;

class ShubhamAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private isMutedByUser: boolean = false;
  private listeners: Set<AudioListener> = new Set();
  private isInitialized: boolean = false;
  private gestureListenersAttached: boolean = false;

  constructor() {
    this.isMutedByUser = false;
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

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public initAudio(): void {
    if (this.isInitialized && this.audioElement) return;
    this.isInitialized = true;

    try {
      this.audioElement = new Audio(LOCAL_AUDIO_PATH);
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';

      this.audioElement.onplay = () => {
        this.isPlaying = true;
        this.notify();
      };

      this.audioElement.onplaying = () => {
        this.isPlaying = true;
        this.notify();
      };

      this.audioElement.onpause = () => {
        if (this.isMutedByUser) {
          this.isPlaying = false;
          this.notify();
        }
      };

      this.audioElement.onerror = () => {
        // Fallback to Google Drive stream if needed
        if (this.audioElement && this.audioElement.src !== DRIVE_STREAM_FALLBACK) {
          this.audioElement.src = DRIVE_STREAM_FALLBACK;
          if (!this.isMutedByUser) {
            this.audioElement.play().catch(() => {});
          }
        }
      };
    } catch (e) {
      console.warn('Audio setup error:', e);
    }
  }

  public start(): boolean {
    this.isMutedByUser = false;

    if (!this.audioElement) {
      this.initAudio();
    }

    if (this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            console.warn('Playback waiting for user gesture:', err);
          });
      }
      return true;
    }

    return false;
  }

  public stop(): void {
    this.isMutedByUser = true;
    this.isPlaying = false;

    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return this.start();
    }
  }

  /**
   * Autoplay engine on visiting the site:
   * 1. Attempts immediate unmuted playback.
   * 2. If browser autoplay policy intercepts pending user gesture,
   *    attaches listeners on document/window for pointerdown, touchstart, click.
   * 3. On the FIRST touch or click anywhere, starts playback immediately and
   *    only removes the listeners once audio is actively playing!
   */
  public initAutoplay(): void {
    this.initAudio();

    // 1. Try immediate playback
    if (this.audioElement && !this.isMutedByUser) {
      const p = this.audioElement.play();
      if (p !== undefined) {
        p.then(() => {
          this.isPlaying = true;
          this.notify();
        }).catch(() => {
          // Browser requires user interaction, attach persistent gesture listeners
          this.attachGestureListeners();
        });
      }
    } else {
      this.attachGestureListeners();
    }
  }

  private attachGestureListeners(): void {
    if (this.gestureListenersAttached) return;
    this.gestureListenersAttached = true;

    const handleUserGesture = () => {
      if (this.isMutedByUser) {
        this.removeGestureListeners();
        return;
      }

      if (!this.audioElement) {
        this.initAudio();
      }

      if (this.audioElement) {
        const promise = this.audioElement.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              this.isPlaying = true;
              this.notify();
              // Successfully started! Now safely remove the gesture listeners
              this.removeGestureListeners();
            })
            .catch(() => {
              // Not yet started, keep listening for next touch/click
            });
        }
      }
    };

    const events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown'];
    events.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { passive: true });
      document.addEventListener(evt, handleUserGesture, { passive: true });
    });

    (this as any)._cleanupGestures = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture);
        document.removeEventListener(evt, handleUserGesture);
      });
      this.gestureListenersAttached = false;
    };
  }

  private removeGestureListeners(): void {
    if ((this as any)._cleanupGestures) {
      (this as any)._cleanupGestures();
      (this as any)._cleanupGestures = null;
    }
  }
}

export const shubhamAudio = new ShubhamAudioEngine();
