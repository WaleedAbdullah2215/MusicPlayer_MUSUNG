import React from 'react';
import TrackCard from './TrackCard';

const HomePage = ({
  tracks,
  playTrack,
  loading,
  error,
  setError,
  darkMode,
  showPlaylistMenu,
  setShowPlaylistMenu,
  playlists,
  addToPlaylist
}) => {
  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="home-title">Welcome to Your Music</h1>
        <p className={`home-subtitle ${darkMode ? 'dark' : ''}`}>Discover and enjoy your favorite tracks</p>
      </div>
      {loading && (
        <div className={`loading-message ${darkMode ? 'dark' : ''}`}>
          <p>Loading tracks...</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="error-dismiss">×</button>
        </div>
      )}
      <div className="tracks-section">
        <h2 className={`section-title ${darkMode ? 'dark' : ''}`}>Featured Tracks</h2>
        {tracks.length > 0 ? (
          <div className="tracks-grid">
            {tracks.slice(0, 8).map(track => (
              <TrackCard
                key={track.id}
                track={track}
                playTrack={playTrack}
                darkMode={darkMode}
                showAddToPlaylist={true}
                showPlaylistMenu={showPlaylistMenu}
                setShowPlaylistMenu={setShowPlaylistMenu}
                playlists={playlists}
                addToPlaylist={addToPlaylist}
              />
            ))}
          </div>
        ) : !loading && (
          <p className={`no-tracks-message ${darkMode ? 'dark' : ''}`}>
            No tracks available. Try searching for music!
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;