import React from 'react';
import { Pause, Play, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';

const PlayerControls = ({
  isPlaying,
  togglePlay,
  handlePrevious,
  handleNext,
  darkMode,
  isMini = false,
  isShuffled,
  setIsShuffled,
  repeatMode,
  setRepeatMode
}) => {
  return (
    <div className={isMini ? 'mini-player-controls' : 'player-controls'}>
      {!isMini && (
        <button
          onClick={() => setIsShuffled(!isShuffled)}
          className={`control-button ${isShuffled ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
        >
          <Shuffle className="control-icon" />
        </button>
      )}
      <button
        onClick={handlePrevious}
        className={isMini ? `mini-control-button ${darkMode ? 'dark' : ''}` : `control-button ${darkMode ? 'dark' : ''}`}
      >
        <SkipBack className={isMini ? 'mini-control-icon' : 'skip-icon'} fill="currentColor" />
      </button>
      <button
        onClick={togglePlay}
        className={isMini ? 'mini-play-button' : 'play-button'}
      >
        {isPlaying ? (
          <Pause className={isMini ? 'mini-play-pause-icon' : 'play-pause-icon'} fill="white" />
        ) : (
          <Play className={isMini ? 'mini-play-pause-icon' : 'play-pause-icon'} fill="white" />
        )}
      </button>
      <button
        onClick={handleNext}
        className={isMini ? `mini-control-button ${darkMode ? 'dark' : ''}` : `control-button ${darkMode ? 'dark' : ''}`}
      >
        <SkipForward className={isMini ? 'mini-control-icon' : 'skip-icon'} fill="currentColor" />
      </button>
      {!isMini && (
        <button
          onClick={() => setRepeatMode((repeatMode + 1) % 3)}
          className={`control-button ${repeatMode > 0 ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
        >
          <Repeat className="control-icon" />
          {repeatMode === 2 && <span className="repeat-indicator"></span>}
        </button>
      )}
    </div>
  );
};

export default PlayerControls;