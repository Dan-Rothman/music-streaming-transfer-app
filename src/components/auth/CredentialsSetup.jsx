import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaTimes, FaSpotify, FaInfoCircle, FaExternalLinkAlt } from 'react-icons/fa';
import storageService from '../../services/storage';

const CredentialsSetup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('spotify');
  const [showGuide, setShowGuide] = useState(false);

  // Spotify state
  const [spotifyClientId, setSpotifyClientId] = useState('');
  const [spotifyClientSecret, setSpotifyClientSecret] = useState('');

  // Qobuz state
  const [qobuzAppId, setQobuzAppId] = useState('');
  const [qobuzAppSecret, setQobuzAppSecret] = useState('');

  // Load existing credentials when modal opens
  useEffect(() => {
    if (isOpen) {
      const spotifyCreds = storageService.getSpotifyCredentials();
      setSpotifyClientId(spotifyCreds.clientId || '');
      setSpotifyClientSecret(spotifyCreds.clientSecret || '');

      const qobuzCreds = storageService.getQobuzCredentials();
      setQobuzAppId(qobuzCreds.appId || '');
      setQobuzAppSecret(qobuzCreds.appSecret || '');
    }
  }, [isOpen]);

  const handleSaveSpotify = () => {
    if (spotifyClientId && spotifyClientSecret) {
      storageService.setSpotifyCredentials(spotifyClientId, spotifyClientSecret);
      alert('Spotify credentials saved successfully!');
    } else {
      alert('Please fill in both Client ID and Client Secret');
    }
  };

  const handleSaveQobuz = () => {
    if (qobuzAppId && qobuzAppSecret) {
      storageService.setQobuzCredentials(qobuzAppId, qobuzAppSecret);
      alert('Qobuz credentials saved successfully!');
    } else {
      alert('Please fill in both App ID and App Secret');
    }
  };

  const handleClearSpotify = () => {
    if (confirm('Are you sure you want to clear Spotify credentials?')) {
      storageService.clearSpotifyCredentials();
      setSpotifyClientId('');
      setSpotifyClientSecret('');
      alert('Spotify credentials cleared');
    }
  };

  const handleClearQobuz = () => {
    if (confirm('Are you sure you want to clear Qobuz credentials?')) {
      storageService.clearQobuzCredentials();
      setQobuzAppId('');
      setQobuzAppSecret('');
      alert('Qobuz credentials cleared');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl max-h-[90vh] bg-gray-800 rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700 flex-shrink-0">
            <DialogTitle className="text-xl font-semibold text-gray-100">
              API Credentials Setup
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700 flex-shrink-0">
            <button
              onClick={() => setActiveTab('spotify')}
              className={`flex-1 px-6 py-3 font-medium transition-colors ${
                activeTab === 'spotify'
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <FaSpotify className="inline mr-2" />
              Spotify
            </button>
            <button
              onClick={() => setActiveTab('qobuz')}
              className={`flex-1 px-6 py-3 font-medium transition-colors ${
                activeTab === 'qobuz'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Qobuz
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="p-6 overflow-y-auto flex-1">
            {activeTab === 'spotify' && (
              <div className="space-y-6">
                {/* Info Banner */}
                <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium mb-2">How to get Spotify API credentials:</p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>Visit the <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Spotify Developer Dashboard <FaExternalLinkAlt className="inline text-xs" /></a></li>
                        <li>Log in and create a new app</li>
                        <li>Copy your Client ID and Client Secret</li>
                        <li>Set redirect URI to: <code className="bg-gray-700 px-2 py-1 rounded">http://localhost:5175/callback</code></li>
                      </ol>
                      <button
                        onClick={() => setShowGuide(!showGuide)}
                        className="mt-3 text-blue-400 hover:text-blue-300 text-sm font-medium"
                      >
                        {showGuide ? 'Hide' : 'Show'} detailed guide
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detailed Guide (collapsible) */}
                {showGuide && (
                  <div className="bg-gray-900 border border-gray-700 rounded p-4 text-sm text-gray-300 space-y-3">
                    <h4 className="font-semibold text-gray-100">Detailed Setup Guide:</h4>
                    <div className="space-y-2">
                      <p><strong>Step 1:</strong> Go to <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">developer.spotify.com/dashboard</a></p>
                      <p><strong>Step 2:</strong> Click "Create app" button</p>
                      <p><strong>Step 3:</strong> Fill in app details:
                        <ul className="list-disc list-inside ml-4 mt-1">
                          <li>App name: "Music Transfer App" (or any name)</li>
                          <li>App description: Your description</li>
                          <li>Redirect URI: <code className="bg-gray-700 px-2 py-1 rounded">http://localhost:5175/callback</code></li>
                          <li>API: Check "Web API"</li>
                        </ul>
                      </p>
                      <p><strong>Step 4:</strong> Click "Settings" to view your credentials</p>
                      <p><strong>Step 5:</strong> Copy Client ID and Client Secret</p>
                      <p><strong>Step 6:</strong> Paste them below and click Save</p>
                    </div>
                  </div>
                )}

                {/* Spotify Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Client ID
                    </label>
                    <input
                      type="text"
                      value={spotifyClientId}
                      onChange={(e) => setSpotifyClientId(e.target.value)}
                      placeholder="Enter your Spotify Client ID"
                      className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Client Secret
                    </label>
                    <input
                      type="password"
                      value={spotifyClientSecret}
                      onChange={(e) => setSpotifyClientSecret(e.target.value)}
                      placeholder="Enter your Spotify Client Secret"
                      className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveSpotify}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Save Spotify Credentials
                    </button>
                    <button
                      onClick={handleClearSpotify}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'qobuz' && (
              <div className="space-y-6">
                {/* Info Banner */}
                <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                    <div className="text-sm text-gray-300">
                      <p className="font-medium mb-2">Qobuz API Setup:</p>
                      <p>Qobuz API integration details will be available soon. The setup process will be similar to Spotify.</p>
                    </div>
                  </div>
                </div>

                {/* Qobuz Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      App ID
                    </label>
                    <input
                      type="text"
                      value={qobuzAppId}
                      onChange={(e) => setQobuzAppId(e.target.value)}
                      placeholder="Enter your Qobuz App ID"
                      className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      App Secret
                    </label>
                    <input
                      type="password"
                      value={qobuzAppSecret}
                      onChange={(e) => setQobuzAppSecret(e.target.value)}
                      placeholder="Enter your Qobuz App Secret"
                      className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveQobuz}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Save Qobuz Credentials
                    </button>
                    <button
                      onClick={handleClearQobuz}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-700 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CredentialsSetup;
