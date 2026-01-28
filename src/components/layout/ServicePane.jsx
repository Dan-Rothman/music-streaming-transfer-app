import React from 'react';

const ServicePane = ({ side = 'left' }) => {
  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Service Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="space-y-3">
          {/* Service Selector */}
          <select className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select Service</option>
            <option>Spotify</option>
            <option>Qobuz</option>
          </select>

          {/* Connect Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
            Connect
          </button>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search songs, playlists..."
            className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Library Content Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="text-gray-500 text-center py-12">
          <p>Connect to a service to view your library</p>
        </div>
      </div>

      {/* Selection Counter (bottom of pane) */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-2">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-gray-200">0</span> songs selected
        </p>
      </div>
    </div>
  );
};

export default ServicePane;
