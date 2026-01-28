import React from 'react';

const BottomBar = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400">Ready</p>
        </div>

        {/* Progress bar placeholder (hidden when no transfer) */}
        {/* <div className="flex-1 mx-6">
          <div className="bg-gray-700 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div> */}

        <div className="flex-1 text-right">
          <p className="text-xs text-gray-500">
            No active transfers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;
