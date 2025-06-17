import React from 'react';
import { Home, Search, ListMusic, Heart, Moon, Sun } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, currentTrack, darkMode, setDarkMode }) => {
  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="navbar-brand">MUSUNG</h1>
          <div className="nav-links">
            <button
              onClick={() => setCurrentPage('home')}
              className={`nav-link ${currentPage === 'home' ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
            >
              <Home className="nav-icon" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('search')}
              className={`nav-link ${currentPage === 'search' ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
            >
              <Search className="nav-icon" />
              <span>Search</span>
            </button>
            <button
              onClick={() => setCurrentPage('playlists')}
              className={`nav-link ${currentPage === 'playlists' ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
            >
              <ListMusic className="nav-icon" />
              <span>Playlists</span>
            </button>
            {currentTrack && (
              <button
                onClick={() => setCurrentPage('nowplaying')}
                className={`nav-link ${currentPage === 'nowplaying' ? 'active' : ''} ${darkMode ? 'dark' : ''}`}
              >
                <Heart className="nav-icon" />
                <span>Now Playing</span>
              </button>
            )}
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`theme-toggle ${darkMode ? 'dark' : ''}`}
        >
          {darkMode ? <Sun className="theme-icon" /> : <Moon className="theme-icon" />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
