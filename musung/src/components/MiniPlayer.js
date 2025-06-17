import React from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import PlayerControls from './PlayerControls';

const MiniPlayer = (
{
  currentTrack,
  isPlaying,
  togglePlay,
  handlePrevious,
  handleNext,
  setCurrentPage,
  volume,
  isMuted,
  handleVolumeChange,
  toggleMute,
  progress,
  duration,
  darkMode
}) => 
{
  return (
    <div className={`mini-player ${darkMode ? 'dark' : ''}`}>
      <div className="mini-player-content">
        <div className="mini-player-track">
          <img
            src={currentTrack.coverUrl}
            alt={currentTrack.title}
            className="mini-player-image"
            onClick={() => setCurrentPage('nowplaying')}
          />
          <div className="mini-player-info">
            <h4 className={`mini-player-title ${darkMode ? 'dark' : ''}`}>{currentTrack.title}</h4>
            <p className={`mini-player-artist ${darkMode ? 'dark' : ''}`}>{currentTrack.artist}</p>
          </div>
        </div>
        <PlayerControls
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          darkMode={darkMode}
          isMini={true}
        />
        <div className="mini-player-extra">
          <div className="mini-volume-controls">
            <button onClick={toggleMute} className={`mini-volume-button ${darkMode ? 'dark' : ''}`}>
              {isMuted || volume === 0 ? <VolumeX className="mini-volume-icon" /> : <Volume2 className="mini-volume-icon" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="mini-volume-slider"
            />
          </div>
        </div>
      </div>
      <div className="mini-progress-bar">
        <div
          className="mini-progress-fill"
          style={{ width: `${(progress / duration) * 100 || 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MiniPlayer;