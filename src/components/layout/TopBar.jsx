import React from 'react';
import { FaMusic } from 'react-icons/fa';

const TopBar = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaMusic className="text-blue-500 text-2xl" />
          <h1 className="text-xl font-semibold text-gray-100">
            Music Streaming Transfer
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
            Setup Credentials
          </button>
          <button className="text-sm text-gray-400 hover:text-gray-200 transition-colors">
            Help
          </button>
          <span className="text-xs text-gray-500">v1.0.0</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
