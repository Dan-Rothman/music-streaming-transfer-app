import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const CenterDivider = () => {
  return (
    <div className="w-12 bg-gray-800 border-x border-gray-700 flex flex-col items-center justify-center">
      {/* Transfer Button */}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled
        title="Select songs to transfer"
      >
        <FaArrowRight className="text-xl" />
      </button>
    </div>
  );
};

export default CenterDivider;
