import React, { useState } from 'react';
import MusicPlayer from './components/MusicPlayer';
import './index.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <MusicPlayer darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default App;