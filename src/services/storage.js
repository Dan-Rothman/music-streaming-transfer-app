/**
 * Storage service for managing credentials and app data
 * Uses localStorage for persistent storage (API credentials, preferences)
 * Uses sessionStorage for temporary session data (tokens, cache)
 */

const STORAGE_KEYS = {
  // Persistent storage (localStorage)
  SPOTIFY_CLIENT_ID: 'spotify_client_id',
  SPOTIFY_CLIENT_SECRET: 'spotify_client_secret',
  QOBUZ_APP_ID: 'qobuz_app_id',
  QOBUZ_APP_SECRET: 'qobuz_app_secret',
  USER_PREFERENCES: 'user_preferences',

  // Session storage (sessionStorage)
  SPOTIFY_ACCESS_TOKEN: 'spotify_access_token',
  SPOTIFY_REFRESH_TOKEN: 'spotify_refresh_token',
  SPOTIFY_TOKEN_EXPIRY: 'spotify_token_expiry',
  QOBUZ_ACCESS_TOKEN: 'qobuz_access_token',
  QOBUZ_USER_AUTH_TOKEN: 'qobuz_user_auth_token',
  LIBRARY_CACHE: 'library_cache',
  TRANSFER_STATE: 'transfer_state'
};

class StorageService {
  // ========== Spotify Credentials ==========

  setSpotifyCredentials(clientId, clientSecret) {
    localStorage.setItem(STORAGE_KEYS.SPOTIFY_CLIENT_ID, clientId);
    localStorage.setItem(STORAGE_KEYS.SPOTIFY_CLIENT_SECRET, clientSecret);
  }

  getSpotifyCredentials() {
    return {
      clientId: localStorage.getItem(STORAGE_KEYS.SPOTIFY_CLIENT_ID),
      clientSecret: localStorage.getItem(STORAGE_KEYS.SPOTIFY_CLIENT_SECRET)
    };
  }

  hasSpotifyCredentials() {
    const { clientId, clientSecret } = this.getSpotifyCredentials();
    return !!(clientId && clientSecret);
  }

  clearSpotifyCredentials() {
    localStorage.removeItem(STORAGE_KEYS.SPOTIFY_CLIENT_ID);
    localStorage.removeItem(STORAGE_KEYS.SPOTIFY_CLIENT_SECRET);
    this.clearSpotifyTokens();
  }

  // ========== Qobuz Credentials ==========

  setQobuzCredentials(appId, appSecret) {
    localStorage.setItem(STORAGE_KEYS.QOBUZ_APP_ID, appId);
    localStorage.setItem(STORAGE_KEYS.QOBUZ_APP_SECRET, appSecret);
  }

  getQobuzCredentials() {
    return {
      appId: localStorage.getItem(STORAGE_KEYS.QOBUZ_APP_ID),
      appSecret: localStorage.getItem(STORAGE_KEYS.QOBUZ_APP_SECRET)
    };
  }

  hasQobuzCredentials() {
    const { appId, appSecret } = this.getQobuzCredentials();
    return !!(appId && appSecret);
  }

  clearQobuzCredentials() {
    localStorage.removeItem(STORAGE_KEYS.QOBUZ_APP_ID);
    localStorage.removeItem(STORAGE_KEYS.QOBUZ_APP_SECRET);
    this.clearQobuzTokens();
  }

  // ========== Spotify Tokens (Session) ==========

  setSpotifyTokens(accessToken, refreshToken, expiresIn) {
    const expiryTime = Date.now() + (expiresIn * 1000);
    sessionStorage.setItem(STORAGE_KEYS.SPOTIFY_ACCESS_TOKEN, accessToken);
    sessionStorage.setItem(STORAGE_KEYS.SPOTIFY_REFRESH_TOKEN, refreshToken);
    sessionStorage.setItem(STORAGE_KEYS.SPOTIFY_TOKEN_EXPIRY, expiryTime.toString());
  }

  getSpotifyTokens() {
    return {
      accessToken: sessionStorage.getItem(STORAGE_KEYS.SPOTIFY_ACCESS_TOKEN),
      refreshToken: sessionStorage.getItem(STORAGE_KEYS.SPOTIFY_REFRESH_TOKEN),
      expiryTime: parseInt(sessionStorage.getItem(STORAGE_KEYS.SPOTIFY_TOKEN_EXPIRY) || '0')
    };
  }

  isSpotifyTokenValid() {
    const { accessToken, expiryTime } = this.getSpotifyTokens();
    return !!(accessToken && expiryTime > Date.now());
  }

  clearSpotifyTokens() {
    sessionStorage.removeItem(STORAGE_KEYS.SPOTIFY_ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.SPOTIFY_REFRESH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.SPOTIFY_TOKEN_EXPIRY);
  }

  // ========== Qobuz Tokens (Session) ==========

  setQobuzTokens(accessToken, userAuthToken) {
    sessionStorage.setItem(STORAGE_KEYS.QOBUZ_ACCESS_TOKEN, accessToken);
    if (userAuthToken) {
      sessionStorage.setItem(STORAGE_KEYS.QOBUZ_USER_AUTH_TOKEN, userAuthToken);
    }
  }

  getQobuzTokens() {
    return {
      accessToken: sessionStorage.getItem(STORAGE_KEYS.QOBUZ_ACCESS_TOKEN),
      userAuthToken: sessionStorage.getItem(STORAGE_KEYS.QOBUZ_USER_AUTH_TOKEN)
    };
  }

  clearQobuzTokens() {
    sessionStorage.removeItem(STORAGE_KEYS.QOBUZ_ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.QOBUZ_USER_AUTH_TOKEN);
  }

  // ========== User Preferences ==========

  setUserPreferences(preferences) {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  }

  getUserPreferences() {
    const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return prefs ? JSON.parse(prefs) : { theme: 'dark' };
  }

  // ========== Cache Management ==========

  setLibraryCache(service, data) {
    const cache = this.getLibraryCache() || {};
    cache[service] = {
      data,
      timestamp: Date.now()
    };
    sessionStorage.setItem(STORAGE_KEYS.LIBRARY_CACHE, JSON.stringify(cache));
  }

  getLibraryCache(service) {
    const cache = sessionStorage.getItem(STORAGE_KEYS.LIBRARY_CACHE);
    if (!cache) return null;

    const parsed = JSON.parse(cache);
    if (service) {
      return parsed[service]?.data || null;
    }
    return parsed;
  }

  clearLibraryCache(service) {
    if (service) {
      const cache = this.getLibraryCache();
      if (cache) {
        delete cache[service];
        sessionStorage.setItem(STORAGE_KEYS.LIBRARY_CACHE, JSON.stringify(cache));
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.LIBRARY_CACHE);
    }
  }

  // ========== Clear All Data ==========

  clearAllData() {
    // Clear all localStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
  }

  clearAllSessionData() {
    // Clear only sessionStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      sessionStorage.removeItem(key);
    });
  }
}

// Export singleton instance
export default new StorageService();
