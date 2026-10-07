import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { weddingMusic } from '../utils/weddingMusic';

const YOUTUBE_VIDEO_ID = 'CqXjW27NlHs';
const STORAGE_KEY = 'wedding_audio_user_explicitly_muted';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          height?: string | number;
          width?: string | number;
          playerVars?: Record<string, any>;
          events?: {
            onReady?: (event: { target: any }) => void;
            onStateChange?: (event: { data: number; target: any }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => any;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export const YouTubeAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState<boolean>(true);
  const [isMiniDockExpanded, setIsMiniDockExpanded] = useState<boolean>(false);
  const playerRef = useRef<any>(null);

  // Check if the user has explicitly clicked the MUTE button
  const isExplicitlyMutedByUser = (): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  };

  const setExplicitMuteByUser = (muted: boolean) => {
    try {
      if (muted) {
        localStorage.setItem(STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Start / un-mute playback at full volume
  const startUnmutedPlayback = () => {
    if (!playerRef.current) return;
    try {
      if (typeof playerRef.current.unMute === 'function') {
        playerRef.current.unMute();
      }
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(100);
      }
      if (typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
      }
      setIsMuted(false);
      setIsPlaying(true);
      setShowWelcomePrompt(false);
      weddingMusic.updateState(true);
      setExplicitMuteByUser(false);
    } catch (e) {
      console.warn('Playback initiation error:', e);
    }
  };

  // Mute / pause playback (ONLY when user explicitly chooses to mute)
  const pausePlayback = () => {
    if (!playerRef.current) return;
    try {
      if (typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
      setIsPlaying(false);
      setIsMuted(true);
      weddingMusic.updateState(false);
      setExplicitMuteByUser(true);
    } catch (e) {
      console.warn('Playback pause error:', e);
    }
  };

  const handleToggle = () => {
    if (isPlaying && !isMuted) {
      // User explicitly clicked mute
      pausePlayback();
    } else {
      // User explicitly clicked unmute / play
      startUnmutedPlayback();
    }
  };

  useEffect(() => {
    // Register global toggle with coordinator
    weddingMusic.registerPlayer(handleToggle);

    let isCancelled = false;

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      const container = document.getElementById('youtube-wedding-iframe-slot');
      if (!container) return;

      playerRef.current = new window.YT.Player('youtube-wedding-iframe-slot', {
        height: '100%',
        width: '100%',
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event: { target: any }) => {
            if (isCancelled) return;
            setIsPlayerReady(true);

            // Attempt unmuted playback immediately on entry
            if (!isExplicitlyMutedByUser()) {
              try {
                event.target.unMute();
                event.target.setVolume(100);
                const playPromise = event.target.playVideo();
                if (playPromise && typeof playPromise.catch === 'function') {
                  playPromise.catch(() => {
                    // Browser requires user interaction before allowing unmuted audio
                  });
                }
              } catch (err) {
                console.warn('Autoplay error:', err);
              }
            }
          },
          onStateChange: (event: { data: number; target: any }) => {
            if (isCancelled) return;
            if (window.YT && window.YT.PlayerState) {
              if (event.data === window.YT.PlayerState.PLAYING) {
                // If it's playing, ensure it is unmuted unless the user explicitly muted
                if (!isExplicitlyMutedByUser()) {
                  if (typeof event.target.unMute === 'function') {
                    event.target.unMute();
                  }
                  if (typeof event.target.setVolume === 'function') {
                    event.target.setVolume(100);
                  }
                  setIsMuted(false);
                  setShowWelcomePrompt(false);
                }
                setIsPlaying(true);
                weddingMusic.updateState(true);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
                weddingMusic.updateState(false);
              }
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      const oldCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (oldCallback) oldCallback();
        setupPlayer();
      };
    } else {
      setupPlayer();
    }

    // Capture first user gesture on the page to guarantee unmuted playback immediately
    const handlePageInteraction = () => {
      if (!isExplicitlyMutedByUser()) {
        startUnmutedPlayback();
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener('click', handlePageInteraction);
      window.removeEventListener('touchstart', handlePageInteraction);
      window.removeEventListener('pointerdown', handlePageInteraction);
      window.removeEventListener('scroll', handlePageInteraction);
      window.removeEventListener('keydown', handlePageInteraction);
    };

    window.addEventListener('click', handlePageInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handlePageInteraction, { once: true, passive: true });
    window.addEventListener('pointerdown', handlePageInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handlePageInteraction, { once: true, passive: true });
    window.addEventListener('keydown', handlePageInteraction, { once: true, passive: true });

    return () => {
      isCancelled = true;
      removeListeners();
      try {
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          playerRef.current.destroy();
          playerRef.current = null;
        }
      } catch (e) {
        console.warn(e);
      }
    };
  }, []);

  return (
    <>
      {/* 
        Auspicious Entrance Floating Ribbon:
        Shows upon arrival if browser suspended unmuted audio until a tap.
        Tapping this or anywhere on screen immediately starts the music unmuted.
      */}
      {showWelcomePrompt && !isPlaying && (
        <aside
          aria-label="Welcome announcement"
          onClick={startUnmutedPlayback}
          className="fixed top-20 inset-x-4 max-w-md mx-auto z-50 animate-bounce cursor-pointer"
        >
          <div className="bg-[#8B2635] text-white p-3.5 rounded-2xl shadow-2xl border-2 border-[#C5A059] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-full bg-white/20 text-[#C5A059]">
                <Volume2 className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-wide">
                  Tap to Play Auspicious Wedding Music 🎵
                </p>
                <p className="text-[11px] text-amber-200">
                  Sitar & Flute Classical Wedding Instrumental
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startUnmutedPlayback();
              }}
              className="px-3 py-1.5 bg-[#C5A059] hover:bg-[#b38e48] text-[#2C241E] text-xs font-bold rounded-lg whitespace-nowrap shadow-xs cursor-pointer"
            >
              Play Music
            </button>
          </div>
        </aside>
      )}

      {/* Floating Audio Dock in Bottom Right */}
      <aside
        aria-label="Wedding classical music controller"
        className="fixed bottom-4 right-4 z-40 animate-in fade-in duration-300"
      >
        <div className="bg-[#FAF6EE]/95 backdrop-blur-md border border-[#C5A059] rounded-2xl shadow-xl overflow-hidden max-w-xs transition-all">
          {/* Main Controls Row */}
          <div className="flex items-center gap-2 p-2">
            <button
              onClick={handleToggle}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs ${
                isPlaying && !isMuted
                  ? 'bg-[#8B2635] text-white hover:bg-[#721F2B]'
                  : 'bg-white text-[#6B5A4E] hover:bg-[#F0E6D8] hover:text-[#2C241E] border border-[#D9CABB]'
              }`}
              title={
                isPlaying && !isMuted
                  ? 'Click to Mute Wedding Music'
                  : 'Click to Play Wedding Music'
              }
            >
              {isPlaying && !isMuted ? (
                <>
                  <Volume2 className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-bold">Music Playing</span>
                  <span className="flex items-end gap-0.5 h-3 ml-0.5">
                    <span className="w-0.5 h-2 bg-[#C5A059] animate-pulse" />
                    <span className="w-0.5 h-3 bg-[#C5A059] animate-pulse delay-75" />
                    <span className="w-0.5 h-1.5 bg-[#C5A059] animate-pulse delay-150" />
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#7D6E63]" />
                  <span>Music Muted (Tap to Play)</span>
                </>
              )}
            </button>

            {/* Toggle mini video preview view */}
            <button
              onClick={() => setIsMiniDockExpanded(!isMiniDockExpanded)}
              title={isMiniDockExpanded ? 'Hide mini video' : 'Show mini video player'}
              className="p-2 text-[#7D6E63] hover:text-[#8B2635] hover:bg-[#F0E6D8] rounded-xl transition-colors cursor-pointer"
            >
              {isMiniDockExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>

            <a
              href={`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open track on YouTube"
              className="p-2 text-[#7D6E63] hover:text-[#8B2635] hover:bg-[#F0E6D8] rounded-xl transition-colors"
            >
              <Music className="w-4 h-4" />
            </a>
          </div>

          {/* 
            Visible Player Frame:
            Having a real rendered video frame prevents browsers from auto-muting
            or throttling background audio!
          */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isMiniDockExpanded ? 'h-36 w-64 p-2 pt-0' : 'h-1 w-1 opacity-[0.02] pointer-events-none'
            }`}
          >
            <div className="w-full h-full rounded-lg overflow-hidden bg-black border border-[#D9CABB]">
              <div id="youtube-wedding-iframe-slot" className="w-full h-full" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
