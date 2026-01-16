import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, X, Maximize2, Minimize2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const AudioPlayer: React.FC = () => {
  const { currentTrack, isPlaying, isExpanded, togglePlay, closePlayer, setExpanded } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Handle Play/Pause side effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
          // Optional: handle auto-play policy errors or network errors here
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Handle Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Reset/Load new track
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.load();
      if (isPlaying) audioRef.current.play().catch(e => console.error(e));
    }
  }, [currentTrack?.src]); // Only reload if src changes

  if (!currentTrack) return null;

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    // Could auto-play next or just stop
    togglePlay();
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isExpanded ? 'translate-y-0' : 'translate-y-full'}`}>
      {/* Mini Player Tab (Visible when collapsed but playing/paused) - Optional or just use the main bar */}

      <div className="bg-slate-900 border-t border-slate-700 p-4 shadow-2xl backdrop-blur-md bg-opacity-90 text-white">
        <audio
          ref={audioRef}
          src={currentTrack.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={(e) => console.error("Audio Load Error", e)}
        />

        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-bold truncate text-sm sm:text-base">{currentTrack.title}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-24 sm:w-48 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:bg-brand-primary [&::-webkit-slider-thumb]:rounded-full"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="p-2 rounded-full bg-white text-slate-900 hover:scale-105 transition-transform" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
            </button>

            <button onClick={closePlayer} className="p-2 text-slate-400 hover:text-white" aria-label="Close Player">
              <X size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;