import React from 'react';
import { ListMusic, X } from 'lucide-react';
import TrackCard from './TrackCard';

const PlaylistsPage = ({
  playlists,
  currentPlaylist,
  setCurrentPlaylist,
  showCreatePlaylist,
  setShowCreatePlaylist,
  newPlaylistName,
  setNewPlaylistName,
  createPlaylist,
  removeFromPlaylist,
  playTrack,
  darkMode
}) => {
  return (
    <div className="playlists-page">
      <div className="playlists-header">
        <h1 className={`playlists-title ${darkMode ? 'dark' : ''}`}>Your Playlists</h1>
        <button
          onClick={() => setShowCreatePlaylist(true)}
          className="create-playlist-button"
        >
          Create Playlist
        </button>
      </div>
      {showCreatePlaylist && (
        <div className={`create-playlist-form ${darkMode ? 'dark' : ''}`}>
          <h3 className={`form-title ${darkMode ? 'dark' : ''}`}>Create New Playlist</h3>
          <div className="form-input-group">
            <input
              type="text"
              placeholder="Playlist name..."
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className={`form-input ${darkMode ? 'dark' : ''}`}
            />
            <button
              onClick={createPlaylist}
              className="form-submit-button"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreatePlaylist(false)}
              className={`form-cancel-button ${darkMode ? 'dark' : ''}`}
            >
              <X className="cancel-icon" />
            </button>
          </div>
        </div>
      )}
      <div className="playlists-grid">
        {playlists.map(playlist => (
          <div
            key={playlist.id}
            className={`playlist-card ${darkMode ? 'dark' : ''}`}
            onClick={() => setCurrentPlaylist(playlist)}
          >
            <div className="playlist-card-header">
              <div className="playlist-icon-container">
                <ListMusic className="playlist-icon" />
              </div>
              <div className="playlist-info">
                <h3 className={`playlist-name ${darkMode ? 'dark' : ''}`}>{playlist.name}</h3>
                <p className={`playlist-count ${darkMode ? 'dark' : ''}`}>{playlist.tracks.length} songs</p>
              </div>
            </div>
            {playlist.tracks.length > 0 && (
              <div className="playlist-tracks-preview">
                {playlist.tracks.slice(0, 3).map((track, index) => (
                  <img
                    key={index}
                    src={track.coverUrl}
                    alt={track.title}
                    className="preview-track-image"
                  />
                ))}
                {playlist.tracks.length > 3 && (
                  <div className={`preview-more-tracks ${darkMode ? 'dark' : ''}`}>
                    +{playlist.tracks.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {currentPlaylist && (
        <div className={`playlist-detail ${darkMode ? 'dark' : ''}`}>
          <div className="playlist-detail-header">
            <h2 className={`playlist-detail-title ${darkMode ? 'dark' : ''}`}>{currentPlaylist.name}</h2>
            <button
              onClick={() => setCurrentPlaylist(null)}
              className={`playlist-detail-close ${darkMode ? 'dark' : ''}`}
            >
              <X className="close-icon" />
            </button>
          </div>
          {currentPlaylist.tracks.length > 0 ? (
            <div className="playlist-tracks-list">
              {currentPlaylist.tracks.map(track => (
                <div key={track.id} className="playlist-track-item">
                  <TrackCard
                    track={track}
                    playTrack={playTrack}
                    darkMode={darkMode}
                    showAddToPlaylist={false}
                  />
                  <button
                    onClick={() => removeFromPlaylist(currentPlaylist.id, track.id)}
                    className={`remove-track-button ${darkMode ? 'dark' : ''}`}
                  >
                    <X className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={`empty-playlist-message ${darkMode ? 'dark' : ''}`}>
              This playlist is empty. Add some tracks from the search page!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PlaylistsPage;