import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface AudioTrack {
  src: string;
  title: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  isExpanded: boolean;
  playTrack: (track: AudioTrack) => void;
  togglePlay: () => void;
  closePlayer: () => void;
  setExpanded: (expanded: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const playTrack = (track: AudioTrack) => {
    // If it's a new track or we are currently stopped
    if (!currentTrack || currentTrack.src !== track.src) {
        setCurrentTrack(track);
        setIsExpanded(true); // Auto-expand when a new track starts
    }
    // Always ensure play state is true when explicitly requested
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const closePlayer = () => {
    setIsPlaying(false);
    setIsExpanded(false);
    setTimeout(() => setCurrentTrack(null), 300); // Wait for potential animation
  };

  const setExpanded = (expanded: boolean) => {
      setIsExpanded(expanded);
  };

  return (
    <AudioContext.Provider value={{ 
        currentTrack, 
        isPlaying, 
        isExpanded,
        playTrack, 
        togglePlay, 
        closePlayer,
        setExpanded
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
