import React, { useState, useEffect } from 'react';
import { FaSpotify, FaHeart, FaList, FaCheckCircle } from 'react-icons/fa';
import spotifyService from '../../services/spotifyService';
import storageService from '../../services/storage';

const ServicePane = ({ side = 'left' }) => {
  const [selectedService, setSelectedService] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const [error, setError] = useState('');
  const [lastClickedIndex, setLastClickedIndex] = useState(null);

  // Check if service is already connected on mount
  useEffect(() => {
    if (selectedService === 'spotify' && spotifyService.isConnected()) {
      setIsConnected(true);
      loadSpotifyData();
    }
  }, [selectedService]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle shortcuts when connected and have songs
      if (!isConnected || filteredSongs.length === 0) return;

      // Ctrl+A or Cmd+A: Select all
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault();
        selectAll();
      }

      // Escape: Deselect all
      if (e.key === 'Escape') {
        e.preventDefault();
        deselectAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConnected, filteredSongs, selectedSongs]);

  // Filter songs when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = songs.filter(
        (song) =>
          song.title.toLowerCase().includes(query) ||
          song.artist.toLowerCase().includes(query) ||
          song.album.toLowerCase().includes(query)
      );
      setFilteredSongs(filtered);
    }
    // Reset last clicked index when filtered list changes
    setLastClickedIndex(null);
  }, [searchQuery, songs]);

  const handleServiceChange = (e) => {
    const service = e.target.value;
    setSelectedService(service);
    setIsConnected(false);
    setSongs([]);
    setFilteredSongs([]);
    setSelectedSongs(new Set());
    setLastClickedIndex(null);
    setError('');
  };

  const handleConnect = async () => {
    if (!selectedService) {
      setError('Please select a service first');
      return;
    }

    if (selectedService === 'spotify') {
      await connectToSpotify();
    } else if (selectedService === 'qobuz') {
      setError('Qobuz integration coming soon');
    }
  };

  const connectToSpotify = async () => {
    setIsConnecting(true);
    setError('');

    try {
      // Check if credentials are set
      const creds = storageService.getSpotifyCredentials();
      if (!creds.clientId || !creds.clientSecret) {
        setError('Please set up Spotify credentials first (Setup Credentials button in top bar)');
        setIsConnecting(false);
        return;
      }

      // Authenticate
      await spotifyService.authenticate();
      setIsConnected(true);

      // Load data
      await loadSpotifyData();
    } catch (err) {
      setError(err.message || 'Failed to connect to Spotify');
      console.error('Spotify connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const loadSpotifyData = async () => {
    try {
      const allSongs = await spotifyService.getAllSongs();
      setSongs(allSongs);
      setFilteredSongs(allSongs);

      // Log stats if in mock mode
      if (spotifyService.isMockMode()) {
        const stats = spotifyService.getStats();
        console.log('📊 Mock Spotify Stats:', stats);
      }
    } catch (err) {
      setError('Failed to load songs: ' + err.message);
      console.error('Error loading songs:', err);
    }
  };

  const handleDisconnect = () => {
    spotifyService.disconnect();
    setIsConnected(false);
    setSongs([]);
    setFilteredSongs([]);
    setSelectedSongs(new Set());
    setLastClickedIndex(null);
  };

  const toggleSongSelection = (songId, index, event) => {
    const newSelected = new Set(selectedSongs);

    // Handle shift-click for range selection
    if (event?.shiftKey && lastClickedIndex !== null && lastClickedIndex !== index) {
      const start = Math.min(lastClickedIndex, index);
      const end = Math.max(lastClickedIndex, index);

      // Select all songs in the range
      for (let i = start; i <= end; i++) {
        if (filteredSongs[i]) {
          newSelected.add(filteredSongs[i].id);
        }
      }
    } else {
      // Normal toggle behavior
      if (newSelected.has(songId)) {
        newSelected.delete(songId);
      } else {
        newSelected.add(songId);
      }
    }

    setSelectedSongs(newSelected);
    setLastClickedIndex(index);
  };

  const selectAll = () => {
    const allIds = new Set(filteredSongs.map((s) => s.id));
    setSelectedSongs(allIds);
  };

  const deselectAll = () => {
    setSelectedSongs(new Set());
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Service Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="space-y-3">
          {/* Service Selector */}
          <select
            value={selectedService}
            onChange={handleServiceChange}
            disabled={isConnected}
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Service</option>
            <option value="spotify">Spotify</option>
            <option value="qobuz">Qobuz</option>
          </select>

          {/* Connect/Disconnect Button */}
          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={!selectedService || isConnecting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isConnecting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Connecting...
                </>
              ) : (
                'Connect'
              )}
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Disconnect
            </button>
          )}

          {/* Mock Mode Indicator */}
          {isConnected && spotifyService.isMockMode() && (
            <div className="bg-yellow-900/30 border border-yellow-700 rounded px-3 py-2">
              <p className="text-xs text-yellow-300">🎭 Using test data</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-700 rounded px-3 py-2">
              <p className="text-xs text-red-300">{error}</p>
            </div>
          )}

          {/* Search Bar */}
          {isConnected && (
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Selection Controls */}
          {isConnected && filteredSongs.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium py-1 px-2 rounded transition-colors"
              >
                Select All
              </button>
              <button
                onClick={deselectAll}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium py-1 px-2 rounded transition-colors"
              >
                Deselect All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Library Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {!isConnected ? (
          <div className="text-gray-500 text-center py-12">
            <p>Connect to a service to view your library</p>
          </div>
        ) : filteredSongs.length === 0 ? (
          <div className="text-gray-500 text-center py-12">
            <p>
              {searchQuery ? 'No songs match your search' : 'No songs found'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSongs.map((song, index) => (
              <div
                key={song.id}
                onClick={(e) => toggleSongSelection(song.id, index, e)}
                className={`p-3 rounded border cursor-pointer transition-all ${
                  selectedSongs.has(song.id)
                    ? 'bg-blue-900/30 border-blue-600'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-100 truncate">
                        {song.title}
                      </h4>
                      {selectedSongs.has(song.id) && (
                        <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 truncate">
                      {song.artist}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {song.album}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      {song.isLiked && (
                        <span className="inline-flex items-center gap-1 text-xs text-pink-400">
                          <FaHeart className="text-[10px]" />
                          Liked
                        </span>
                      )}
                      {song.inPlaylist && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-400">
                          <FaList className="text-[10px]" />
                          {song.playlistNames.length} playlist
                          {song.playlistNames.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    {song.playlistNames.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1 truncate">
                        {song.playlistNames.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selection Counter (bottom of pane) */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-gray-200">
            {selectedSongs.size}
          </span>{' '}
          songs selected
          {songs.length > 0 && (
            <span className="text-gray-500"> of {filteredSongs.length}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ServicePane;