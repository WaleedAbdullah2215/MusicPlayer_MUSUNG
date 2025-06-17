import React from 'react';
import PlayerControls from './PlayerControls';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Search, Home, ListMusic, Heart, Plus, X, Shuffle, Repeat, Moon, Sun } from 'lucide-react';

const NowPlayingPage = (
{
  currentTrack,
  isPlaying,
  togglePlay,
  handlePrevious,
  handleNext,
  progress,
  duration,
  handleSeek,
  formatTime,
  volume,
  isMuted,
  handleVolumeChange,
  toggleMute,
  isShuffled,
  setIsShuffled,
  repeatMode,
  setRepeatMode,
  darkMode
}) => {
  return (
    <div className="now-playing-page">
      {currentTrack ? (
        <>
          <div className="now-playing-cover-container">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className="now-playing-cover"
            />
            <div className="now-playing-cover-overlay"></div>
          </div>
          <div className="now-playing-info">
            <h1 className={`now-playing-title ${darkMode ? 'dark' : ''}`}>{currentTrack.title}</h1>
            <p className={`now-playing-artist ${darkMode ? 'dark' : ''}`}>{currentTrack.artist}</p>
            <p className={`now-playing-album ${darkMode ? 'dark' : ''}`}>{currentTrack.album} • {currentTrack.genre}</p>
          </div>
          <div className="progress-container">
            <div
              className={`progress-bar ${darkMode ? 'dark' : ''}`}
              onClick={handleSeek}
            >
              <div
                className="progress-fill"
                style={{ width: `${(progress / duration) * 100 || 0}%` }}
              ></div>
            </div>
            <div className={`progress-time ${darkMode ? 'dark' : ''}`}>
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          <PlayerControls
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            darkMode={darkMode}
            isMini={false}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
            repeatMode={repeatMode}
            setRepeatMode={setRepeatMode}
          />
          <div className="volume-controls">
            <button onClick={toggleMute} className={`volume-button ${darkMode ? 'dark' : ''}`}>
              {isMuted || volume === 0 ? <VolumeX className="volume-icon" /> : <Volume2 className="volume-icon" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </>
      ) : (
        <div className="empty-player">
          <div className={`empty-cover ${darkMode ? 'dark' : ''}`}>
            <ListMusic className={`empty-icon ${darkMode ? 'dark' : ''}`} />
          </div>
          <h2 className={`empty-title ${darkMode ? 'dark' : ''}`}>No track selected</h2>
          <p className={`empty-message ${darkMode ? 'dark' : ''}`}>Choose a song to start listening</p>
        </div>
      )}
    </div>
  );
};

export default NowPlayingPage;