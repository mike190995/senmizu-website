import React from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title }) => {
  return (
    <div className="w-full">
      <audio controls src={src} className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;