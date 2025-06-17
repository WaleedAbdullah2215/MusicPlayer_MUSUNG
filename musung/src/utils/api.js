export const getAccessToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || '';
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || '';

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Token fetch error:', errorData);
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Authentication error:', error.message);
    throw new Error('Failed to authenticate with Spotify');
  }
};

export const fetchTracks = async (token, query = '') => {
  const endpoint = query
    ? `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=50`
    : 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks'; // Top 50 Global

  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Track fetch error:', errorData);
      throw new Error(`Failed to fetch tracks: ${response.statusText}`);
    }

    const data = await response.json();
    const tracks = query ? data.tracks?.items || [] : data.items?.map(item => item.track) || [];
    return tracks.filter(track => track && track.id && track.preview_url); // Ensure valid tracks with previews
  } catch (error) {
    console.error('Track fetch error:', error.message);
    throw new Error('Failed to fetch tracks from Spotify');
  }
};
