import mockSpotifyService from './mockSpotifyService';
import storageService from './storage';
import { MOCK_SPOTIFY_CREDENTIALS } from '../data/mockSpotifyData';

/**
 * Spotify Service
 * Automatically routes to mock service when test credentials are used,
 * otherwise uses real Spotify API (to be implemented)
 */

class SpotifyService {
  constructor() {
    this.baseUrl = 'https://api.spotify.com/v1';
    this.authUrl = 'https://accounts.spotify.com';
  }

  /**
   * Check if we should use mock data based on credentials
   */
  shouldUseMockData() {
    const creds = storageService.getSpotifyCredentials();
    return (
      creds.clientId === MOCK_SPOTIFY_CREDENTIALS.clientId &&
      creds.clientSecret === MOCK_SPOTIFY_CREDENTIALS.clientSecret
    );
  }

  /**
   * Authenticate with Spotify
   * Routes to mock or real auth based on credentials
   */
  async authenticate() {
    if (this.shouldUseMockData()) {
      console.log('🎭 Using MOCK Spotify data');
      return await mockSpotifyService.authenticate();
    }

    // TODO: Implement real Spotify OAuth flow
    throw new Error('Real Spotify API not yet implemented. Use test credentials: spottestid / spottestsecret');
  }

  /**
   * Get authorization URL for OAuth flow
   */
  getAuthorizationUrl() {
    if (this.shouldUseMockData()) {
      return mockSpotifyService.getAuthorizationUrl();
    }

    const creds = storageService.getSpotifyCredentials();
    if (!creds.clientId) {
      throw new Error('Client ID not set');
    }

    const redirectUri = 'http://localhost:5175/callback';
    const scopes = [
      'user-library-read',
      'playlist-read-private',
      'playlist-read-collaborative'
    ].join(' ');

    const params = new URLSearchParams({
      client_id: creds.clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes
    });

    return `${this.authUrl}/authorize?${params.toString()}`;
  }

  /**
   * Get user's liked/saved songs
   */
  async getLikedSongs() {
    if (this.shouldUseMockData()) {
      return await mockSpotifyService.getLikedSongs();
    }

    // TODO: Implement real API call
    throw new Error('Real Spotify API not yet implemented');
  }

  /**
   * Get user's playlists
   */
  async getUserPlaylists() {
    if (this.shouldUseMockData()) {
      return await mockSpotifyService.getUserPlaylists();
    }

    // TODO: Implement real API call
    throw new Error('Real Spotify API not yet implemented');
  }

  /**
   * Get tracks from a specific playlist
   */
  async getPlaylistTracks(playlistId) {
    if (this.shouldUseMockData()) {
      return await mockSpotifyService.getPlaylistTracks(playlistId);
    }

    // TODO: Implement real API call
    throw new Error('Real Spotify API not yet implemented');
  }

  /**
   * Get all songs (liked + playlists)
   */
  async getAllSongs() {
    if (this.shouldUseMockData()) {
      return await mockSpotifyService.getAllSongs();
    }

    // TODO: Implement real API call
    throw new Error('Real Spotify API not yet implemented');
  }

  /**
   * Search songs
   */
  async searchSongs(query) {
    if (this.shouldUseMockData()) {
      return await mockSpotifyService.searchSongs(query);
    }

    // TODO: Implement real API call
    throw new Error('Real Spotify API not yet implemented');
  }

  /**
   * Get user profile
   */
  async getUserProfile() {
    if (this.shouldUseMockData()) {
      return await mockSpotifyService.getUserProfile();
    }

    // TODO: Implement real API call
    throw new Error('Real Spotify API not yet implemented');
  }

  /**
   * Check if user is connected
   */
  isConnected() {
    if (this.shouldUseMockData()) {
      return mockSpotifyService.isConnected();
    }

    return storageService.isSpotifyTokenValid();
  }

  /**
   * Disconnect
   */
  disconnect() {
    if (this.shouldUseMockData()) {
      mockSpotifyService.disconnect();
    } else {
      storageService.clearSpotifyTokens();
    }
  }

  /**
   * Get stats (only available in mock mode)
   */
  getStats() {
    if (this.shouldUseMockData()) {
      return mockSpotifyService.getStats();
    }

    return null;
  }

  /**
   * Check if using mock data
   */
  isMockMode() {
    return this.shouldUseMockData();
  }
}

export default new SpotifyService();
