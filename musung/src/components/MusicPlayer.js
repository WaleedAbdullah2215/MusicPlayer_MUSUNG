import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from './Navbar';
import MiniPlayer from './MiniPlayer';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import PlaylistsPage from './PlaylistsPage';
import NowPlayingPage from './NowPlayingPage';
import Footer from './Footer';

const sampleTracks = [
  {
    id: '1',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    duration: 355,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Rock'
  },
  {
    id: '2',
    title: 'Hotel California',
    artist: 'Eagles',
    album: 'Hotel California',
    duration: 391,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    genre: 'Rock'
  },
  {
    id: '3',
    title: 'Imagine',
    artist: 'John Lennon',
    album: 'Imagine',
    duration: 183,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Pop'
  },
  {
    id: '4',
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV',
    duration: 482,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    genre: 'Rock'
  },
  {
    id: '5',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller',
    duration: 294,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Pop'
  },
  {
    id: '6',
    title: 'Sweet Child O Mine',
    artist: 'Guns N Roses',
    album: 'Appetite for Destruction',
    duration: 356,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    genre: 'Rock'
  },
  {
    id: '7',
    title: 'Smells Like Teen Spirit',
    artist: 'Nirvana',
    album: 'Nevermind',
    duration: 301,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Grunge'
  },
  {
    id: '8',
    title: 'Like a Rolling Stone',
    artist: 'Bob Dylan',
    album: 'Highway 61 Revisited',
    duration: 369,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    genre: 'Folk Rock'
  }
];

const MusicPlayer = ({ darkMode, setDarkMode }) => 
{
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: 'Favorites', tracks: [] },
    { id: 2, name: 'romanceee', tracks: [] }
  ]);

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(null);

  const audioRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => 
  {
    setTracks(sampleTracks);
  }, []);

  useEffect(() => 
  {
    if (currentPage === 'search' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [currentPage]);

  useEffect(() => 
  {
    const handleClickOutside = (event) => {
      if (showPlaylistMenu && !event.target.closest('.playlist-menu-container')) {
        setShowPlaylistMenu(null);
      }
    };

    if (showPlaylistMenu) 
    {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPlaylistMenu]);

  const searchTracks = useCallback(async (query, retry = true) => 
  {
    if (!query.trim()) 
    {
      setTracks(sampleTracks);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try 
    {
      console.log(`Searching for: ${query}`);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=25`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) 
      {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      if (!data.results)
      {
        throw new Error('Invalid API response');
      }

      const searchResults = data.results
        .filter(item => item.previewUrl && item.trackName && item.artistName)
        .map(item => ({
          id: item.trackId.toString(),
          title: item.trackName || 'Unknown Title',
          artist: item.artistName || 'Unknown Artist',
          album: item.collectionName || 'Unknown Album',
          duration: (item.trackTimeMillis / 1000) || 0,
          audioUrl: item.previewUrl,
          coverUrl: item.artworkUrl100 ? item.artworkUrl100.replace('100x100', '400x400') : 'https://via.placeholder.com/400',
          genre: item.primaryGenreName || 'Unknown'
        }));

      setTracks(searchResults.length > 0 ? searchResults : sampleTracks);
      if (searchResults.length === 0) 
      {
        setError('No results found. Showing sample tracks.');
      }
    } 
    catch (err) 
    {
      console.error('Search error:', err.message);
      if (err.name === 'AbortError') 
      {
        setError('Search timed out. Please try again.');
      } 
      else if (retry) 
      {
        console.log('Retrying search...');
        return searchTracks(query, false);
      } 
      else 
      {
        setError('Search failed. Showing sample tracks.');
        setTracks(sampleTracks);
      }
    } 
    finally 
    {
      setLoading(false);
    }
  }, []);

  useEffect(() => 
  {
    if (searchQuery.trim()) 
    {
      setLoading(true);
    }
    const timeoutId = setTimeout(() => 
    {
      if (searchQuery.trim()) 
      {
        searchTracks(searchQuery);
      } 
      else 
      {
        setTracks(sampleTracks);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchTracks]);

  const handleNext = useCallback(() => 
  {
    const trackList = currentPlaylist && currentPlaylist.tracks.length > 0 ? currentPlaylist.tracks : tracks;
    if (trackList.length === 0) return;

    let nextIndex;
    const currentIndex = trackList.findIndex(track => track.id === currentTrack?.id);

    if (isShuffled) 
    {
      do 
      {
        nextIndex = Math.floor(Math.random() * trackList.length);
      } while (nextIndex === currentIndex && trackList.length > 1);
    } 
    else 
    {
      nextIndex = currentIndex < trackList.length - 1 ? currentIndex + 1 : (repeatMode === 1 ? 0 : -1);
    }

    if (nextIndex >= 0 && nextIndex < trackList.length) 
    {
      playTrack(trackList[nextIndex]);
    } 
    else if (repeatMode === 1 && currentIndex === trackList.length - 1)
    {
      playTrack(trackList[0]);
    }
  }, [currentTrack, isShuffled, repeatMode, tracks, currentPlaylist]);

  useEffect(() => 
  {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => 
    {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => 
    {
      if (repeatMode === 2) 
      {
        audio.currentTime = 0;
        audio.play().catch(err => 
        {
          console.error('Playback error:', err);
          setError('Playback failed');
        });
      } 
      else if (repeatMode === 1) 
      {
        handleNext();
      } 
      else 
      {
        const trackList = currentPlaylist && currentPlaylist.tracks.length > 0 ? currentPlaylist.tracks : tracks;
        const currentIndex = trackList.findIndex(track => track.id === currentTrack?.id);
        if (currentIndex < trackList.length - 1) {
          handleNext();
        } 
        else 
        {
          setIsPlaying(false);
        }
      }
    };

    const handleError = (e) => 
    {
      console.error('Audio error:', e);
      setError('Audio playback error. Trying next track...');
      setTimeout(() => {
        setError(null);
        handleNext();
      }, 2000);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadedmetadata', updateProgress);
    audio.addEventListener('error', handleError);

    return () => 
    {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadedmetadata', updateProgress);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack, repeatMode, handleNext, tracks, currentPlaylist]);

  const playTrack = useCallback((track) => 
  {
    if (!track.audioUrl) 
    {
      setError('No audio available for this track');
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);
    setError(null);

    setTimeout(() => 
    {
      if (audioRef.current) 
      {
        audioRef.current.src = track.audioUrl;
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play().catch(err => 
        {
          console.error('Playback error:', err);
          setError('Could not play track. Trying another...');
          setIsPlaying(false);
          setTimeout(() => {
            setError(null);
            handleNext();
          }, 2000);
        });
      }
    }, 100);
  }, [isMuted, volume, handleNext]);

  const togglePlay = useCallback(() => 
  {
    if (audioRef.current) 
    {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Playback error:', err);
          setError('Playback failed');
        });
      }
      setIsPlaying(prev => !prev);
    }
  }, [isPlaying]);

  const handlePrevious = useCallback(() => 
  {
    const trackList = currentPlaylist && currentPlaylist.tracks.length > 0 ? currentPlaylist.tracks : tracks;
    if (trackList.length === 0) return;

    let prevIndex;
    const currentIndex = trackList.findIndex(track => track.id === currentTrack?.id);

    if (isShuffled) 
    {
      do 
      {
        prevIndex = Math.floor(Math.random() * trackList.length);
      } while (prevIndex === currentIndex && trackList.length > 1);
    } 
    else 
    {
      prevIndex = currentIndex > 0 ? currentIndex - 1 : (repeatMode === 1 ? trackList.length - 1 : -1);
    }

    if (prevIndex >= 0 && prevIndex < trackList.length) 
    {
      playTrack(trackList[prevIndex]);
    } 
    else if (repeatMode === 1 && currentIndex === 0) 
    {
      playTrack(trackList[trackList.length - 1]);
    }
  }, [currentTrack, isShuffled, repeatMode, tracks, currentPlaylist, playTrack]);

  const handleVolumeChange = useCallback((e) => 
  {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  }, []);

  const toggleMute = useCallback(() => 
  {
    if (audioRef.current) 
    {
      if (isMuted) 
      {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } 
      else 
      {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  }, [isMuted, volume]);

  const handleSeek = useCallback((e) => 
  {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) 
    {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  }, [duration]);

  const formatTime = (seconds) => 
  {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredTracks = tracks.filter(track =>
    (track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     track.artist?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     track.genre?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const addToPlaylist = useCallback((track, playlistId) => 
  {
    setPlaylists(prev => prev.map(playlist => 
    {
      if (playlist.id === playlistId) {
        const trackExists = playlist.tracks.some(existingTrack => existingTrack.id === track.id);
        if (!trackExists) {
          return { ...playlist, tracks: [...playlist.tracks, track] };
        }
        return playlist;
      }
      return playlist;
    }));
    setShowPlaylistMenu(null);
  }, []);

  const createPlaylist = useCallback(() => 
  {
    if (newPlaylistName.trim()) 
    {
      const newPlaylist = 
      {
        id: Date.now(),
        name: newPlaylistName,
        tracks: []
      };
      setPlaylists(prev => [...prev, newPlaylist]);
      setNewPlaylistName('');
      setShowCreatePlaylist(false);
    }
  }, [newPlaylistName]);

  const removeFromPlaylist = useCallback((playlistId, trackId) => 
  {
    setPlaylists(prev => prev.map(playlist =>
      playlist.id === playlistId
        ? { ...playlist, tracks: playlist.tracks.filter(track => track.id !== trackId) }
        : playlist
    ));
  }, []);

  const renderPage = () => 
  {
    switch (currentPage) 
    {
      case 'home':
        return (
          <HomePage
            tracks={tracks}
            playTrack={playTrack}
            loading={loading}
            error={error}
            setError={setError}
            darkMode={darkMode}
            showPlaylistMenu={showPlaylistMenu}
            setShowPlaylistMenu={setShowPlaylistMenu}
            playlists={playlists}
            addToPlaylist={addToPlaylist}
          />
        );
      case 'search':
        return (
          <SearchPage
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredTracks={filteredTracks}
            playTrack={playTrack}
            loading={loading}
            darkMode={darkMode}
            searchInputRef={searchInputRef}
            showPlaylistMenu={showPlaylistMenu}
            setShowPlaylistMenu={setShowPlaylistMenu}
            playlists={playlists}
            addToPlaylist={addToPlaylist}
          />
        );
      case 'playlists':
        return (
          <PlaylistsPage
            playlists={playlists}
            currentPlaylist={currentPlaylist}
            setCurrentPlaylist={setCurrentPlaylist}
            showCreatePlaylist={showCreatePlaylist}
            setShowCreatePlaylist={setShowCreatePlaylist}
            newPlaylistName={newPlaylistName}
            setNewPlaylistName={setNewPlaylistName}
            createPlaylist={createPlaylist}
            removeFromPlaylist={removeFromPlaylist}
            playTrack={playTrack}
            darkMode={darkMode}
          />
        );
      case 'nowplaying':
        return (
          <NowPlayingPage
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            togglePlay={togglePlay}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            progress={progress}
            duration={duration}
            handleSeek={handleSeek}
            formatTime={formatTime}
            volume={volume}
            isMuted={isMuted}
            handleVolumeChange={handleVolumeChange}
            toggleMute={toggleMute}
            isShuffled={isShuffled}
            setIsShuffled={setIsShuffled}
            repeatMode={repeatMode}
            setRepeatMode={setRepeatMode}
            darkMode={darkMode}
          />
        );
      default:
        return (
          <HomePage
            tracks={tracks}
            playTrack={playTrack}
            loading={loading}
            error={error}
            setError={setError}
            darkMode={darkMode}
            showPlaylistMenu={showPlaylistMenu}
            setShowPlaylistMenu={setShowPlaylistMenu}
            playlists={playlists}
            addToPlaylist={addToPlaylist}
          />
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <audio ref={audioRef} />
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentTrack={currentTrack}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <main className="main-content" style={{ flex: 1 }}>
        <div className="content-container">
          {renderPage()}
        </div>
      </main>
      {currentTrack && currentPage !== 'nowplaying' && (
        <MiniPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          setCurrentPage={setCurrentPage}
          volume={volume}
          isMuted={isMuted}
          handleVolumeChange={handleVolumeChange}
          toggleMute={toggleMute}
          progress={progress}
          duration={duration}
          darkMode={darkMode}
        />
      )}
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default MusicPlayer;