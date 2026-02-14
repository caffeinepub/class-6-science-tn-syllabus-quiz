import { useRef, useState, useCallback, useEffect } from 'react';

interface BackgroundMusicState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isUnlocked: boolean;
}

export function useBackgroundMusic(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<BackgroundMusicState>({
    isPlaying: false,
    isMuted: false,
    volume: 0.3,
    isUnlocked: false,
  });

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = state.volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  const play = useCallback(() => {
    if (audioRef.current && state.isUnlocked) {
      audioRef.current.play().catch(err => {
        console.warn('Audio play failed:', err);
      });
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  }, [state.isUnlocked]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
    setState(prev => ({ ...prev, volume: clampedVolume }));
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !state.isMuted;
      setState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }
  }, [state.isMuted]);

  const unlock = useCallback(() => {
    setState(prev => ({ ...prev, isUnlocked: true }));
  }, []);

  return {
    ...state,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
    unlock,
  };
}
