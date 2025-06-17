import React from 'react';
import { Search } from 'lucide-react';
import TrackCard from './TrackCard';

const SearchPage = (
{
  searchQuery,
  setSearchQuery,
  filteredTracks,
  playTrack,
  loading,
  darkMode,
  searchInputRef,
  showPlaylistMenu,
  setShowPlaylistMenu,
  playlists,
  addToPlaylist
}) => 
{
  return (
    <div className="search-page">
      <div className="search-input-container">
        <Search className={`search-icon ${darkMode ? 'dark' : ''}`} />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for songs, artists, or genres..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`search-input ${darkMode ? 'dark' : ''}`}
          autoFocus
        />
      </div>
      {loading && (
        <div className={`loading-message ${darkMode ? 'dark' : ''}`}>
          <p>Searchinggg...</p>
        </div>
      )}
      {searchQuery && !loading && (
        <div className="search-results">
          <h2 className={`results-title ${darkMode ? 'dark' : ''}`}>
            Search Results ({filteredTracks.length})
          </h2>
          <div className="results-list">
            {filteredTracks.length > 0 ? (
              filteredTracks.map(track => (
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
              ))
            ) : (
              <p className={`no-results-message ${darkMode ? 'dark' : ''}`}>
                No tracks found. Try a different search term.
              </p>
            )}
          </div>
        </div>
      )}
      {!searchQuery && !loading && (
        <div className="browse-section">
          <div className="search-prompt">
            <h2 className={`section-title ${darkMode ? 'dark' : ''}`}>Search for Music</h2>
            <p className={`search-prompt-text ${darkMode ? 'dark' : ''}`}>
              Enter a song name, artist, or genre to find music
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;