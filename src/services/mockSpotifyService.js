import { mockSpotifySongs, mockSpotifyPlaylists, MOCK_SPOTIFY_CREDENTIALS } from '../data/mockSpotifyData';
import storageService from './storage';

/**
 * Mock Spotify Service
 * Simulates Spotify API behavior without making real API calls
 * Only works with test credentials: spottestid / spottestsecret
 */

class MockSpotifyService {
  constructor() {
    this.isUsingMockData = false;
  }

  /**
   * Check if we should use mock data
   * Returns true if credentials match test credentials
   */
  shouldUseMockData() {
    const creds = storageService.getSpotifyCredentials();
    return (
      creds.clientId === MOCK_SPOTIFY_CREDENTIALS.clientId &&
      creds.clientSecret === MOCK_SPOTIFY_CREDENTIALS.clientSecret
    );
  }

  /**
   * Mock authentication - returns fake access token
   */
  async authenticate() {
    if (!this.shouldUseMockData()) {
      throw new Error('Mock service only works with test credentials');
    }

    // Simulate API delay
    await this.simulateDelay(500);

    // Generate fake tokens
    const mockTokens = {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 3600 // 1 hour
    };

    // Store tokens
    storageService.setSpotifyTokens(
      mockTokens.accessToken,
      mockTokens.refreshToken,
      mockTokens.expiresIn
    );

    this.isUsingMockData = true;

    return mockTokens;
  }

  /**
   * Get authorization URL (mock)
   */
  getAuthorizationUrl() {
    const redirectUri = 'http://localhost:5175/callback';
    const scopes = 'user-library-read playlist-read-private';

    // Return a mock URL - clicking this will just trigger the mock auth flow
    return `mock://spotify-auth?client_id=${MOCK_SPOTIFY_CREDENTIALS.clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;
  }

  /**
   * Mock: Get all liked/saved songs
   */
  async getLikedSongs() {
    this.ensureMockMode();
    await this.simulateDelay(800);

    const likedSongs = mockSpotifySongs.filter(song => song.isLiked);

    return {
      items: likedSongs.map(song => ({
        track: {
          id: song.id,
          name: song.title,
          artists: [{ name: song.artist }],
          album: { name: song.album },
          external_ids: { isrc: song.isrc }
        }
      })),
      total: likedSongs.length
    };
  }

  /**
   * Mock: Get user's playlists
   */
  async getUserPlaylists() {
    this.ensureMockMode();
    await this.simulateDelay(600);

    return {
      items: mockSpotifyPlaylists.map(playlist => ({
        id: playlist.id,
        name: playlist.name,
        tracks: { total: this.getPlaylistTrackCount(playlist.name) }
      })),
      total: mockSpotifyPlaylists.length
    };
  }

  /**
   * Mock: Get tracks from a specific playlist
   */
  async getPlaylistTracks(playlistId) {
    this.ensureMockMode();
    await this.simulateDelay(700);

    const playlist = mockSpotifyPlaylists.find(pl => pl.id === playlistId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    const playlistTracks = mockSpotifySongs.filter(song =>
      song.inPlaylist && song.playlistNames.includes(playlist.name)
    );

    return {
      items: playlistTracks.map(song => ({
        track: {
          id: song.id,
          name: song.title,
          artists: [{ name: song.artist }],
          album: { name: song.album },
          external_ids: { isrc: song.isrc }
        }
      })),
      total: playlistTracks.length
    };
  }

  /**
   * Mock: Get all songs (liked + playlists combined)
   */
  async getAllSongs() {
    this.ensureMockMode();
    await this.simulateDelay(1000);

    // Get songs that are either liked or in a playlist
    const allSongs = mockSpotifySongs.filter(song => song.isLiked || song.inPlaylist);

    return allSongs.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      isrc: song.isrc,
      isLiked: song.isLiked,
      inPlaylist: song.inPlaylist,
      playlistNames: song.playlistNames
    }));
  }

  /**
   * Mock: Search songs
   */
  async searchSongs(query) {
    this.ensureMockMode();
    await this.simulateDelay(400);

    const lowerQuery = query.toLowerCase();

    // Search in songs that are liked or in playlists
    const searchResults = mockSpotifySongs
      .filter(song => song.isLiked || song.inPlaylist)
      .filter(song =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery) ||
        song.album.toLowerCase().includes(lowerQuery)
      );

    return searchResults.map(song => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      album: song.album,
      isrc: song.isrc,
      isLiked: song.isLiked,
      inPlaylist: song.inPlaylist,
      playlistNames: song.playlistNames
    }));
  }

  /**
   * Mock: Get user profile
   */
  async getUserProfile() {
    this.ensureMockMode();
    await this.simulateDelay(300);

    return {
      id: 'mock_user_123',
      display_name: 'Test User',
      email: 'testuser@example.com',
      product: 'premium'
    };
  }

  /**
   * Helper: Get count of tracks in a playlist
   */
  getPlaylistTrackCount(playlistName) {
    return mockSpotifySongs.filter(song =>
      song.inPlaylist && song.playlistNames.includes(playlistName)
    ).length;
  }

  /**
   * Ensure we're in mock mode
   */
  ensureMockMode() {
    if (!this.shouldUseMockData()) {
      throw new Error('Mock service requires test credentials to be set');
    }
  }

  /**
   * Simulate API delay
   */
  async simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check if user is connected (has valid tokens)
   */
  isConnected() {
    return storageService.isSpotifyTokenValid() && this.shouldUseMockData();
  }

  /**
   * Disconnect (clear tokens)
   */
  disconnect() {
    storageService.clearSpotifyTokens();
    this.isUsingMockData = false;
  }

  /**
   * Get statistics about the mock data
   */
  getStats() {
    const likedCount = mockSpotifySongs.filter(s => s.isLiked).length;
    const playlistCount = mockSpotifySongs.filter(s => s.inPlaylist).length;
    const likedAndPlaylist = mockSpotifySongs.filter(s => s.isLiked && s.inPlaylist).length;
    const totalTracked = mockSpotifySongs.filter(s => s.isLiked || s.inPlaylist).length;

    return {
      totalSongs: mockSpotifySongs.length,
      likedSongs: likedCount,
      playlistSongs: playlistCount,
      likedAndPlaylist: likedAndPlaylist,
      totalTracked: totalTracked,
      playlists: mockSpotifyPlaylists.length
    };
  }
}

export default new MockSpotifyService();
