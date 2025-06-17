import React from 'react';
import { Play, Pause, Plus } from 'lucide-react';

const TrackCard = (
{
  track,
  playTrack,
  darkMode,
  showAddToPlaylist = false,
  showPlaylistMenu,
  setShowPlaylistMenu,
  playlists = [],
  addToPlaylist,
  isPlaying = false
}) => {
  const formatTime = (seconds) => 
  {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddToPlaylistClick = (e) => 
  {
    e.stopPropagation();
    e.preventDefault();
    setShowPlaylistMenu(showPlaylistMenu === track.id ? null : track.id);
  };

  const handlePlaylistSelect = (e, playlistId) => 
  {
    e.stopPropagation();
    e.preventDefault();
    addToPlaylist(track, playlistId);
  };

  const handlePlayClick = (e) => 
  {
    e.stopPropagation();
    e.preventDefault();
    playTrack(track);
  };

  return (
    <div className={`track-card ${darkMode ? 'dark' : ''}`}>
      <div className="track-info">
        <img 
          src={track.coverUrl} 
          alt={`${track.title} cover`}
          className="track-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/60x60?text=♪'
          }}
        />
        <div className="track-details">
          <h3 className={`track-title ${darkMode ? 'dark' : ''}`}>{track.title}</h3>
          <p className={`track-artist ${darkMode ? 'dark' : ''}`}>{track.artist}</p>
          <p className={`track-album ${darkMode ? 'dark' : ''}`}>{track.album}</p>
        </div>
      </div>
      
      <div className="track-actions">
        <span className={`track-duration ${darkMode ? 'dark' : ''}`}>
          {formatTime(track.duration)}
        </span>
        
        {showAddToPlaylist && (
          <div className="playlist-menu-container" style={{ position: 'relative' }}>
            <button
              className={`add-to-playlist-btn ${darkMode ? 'dark' : ''}`}
              onClick={handleAddToPlaylistClick}
              title="Add to playlist"
            >
              <Plus size={16} />
            </button>
            
            {showPlaylistMenu === track.id && (
              <div 
                className={`playlist-dropdown ${darkMode ? 'dark' : ''}`}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <div className="playlist-dropdown-header">
                  <span>Add to Playlist</span>
                </div>
                <div className="playlist-options">
                  {playlists.map(playlist => (
                    <button
                      key={playlist.id}
                      className={`playlist-option ${darkMode ? 'dark' : ''}`}
                      onClick={(e) => handlePlaylistSelect(e, playlist.id)}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      {playlist.name} ({playlist.tracks.length} songs)
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <button
          className={`play-btn ${darkMode ? 'dark' : ''} ${isPlaying ? 'playing' : ''}`}
          onClick={handlePlayClick}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
    </div>
  );
};

export default TrackCard;