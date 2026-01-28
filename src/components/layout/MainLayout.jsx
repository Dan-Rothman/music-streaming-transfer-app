import React from 'react';
import TopBar from './TopBar';
import ServicePane from './ServicePane';
import CenterDivider from './CenterDivider';
import BottomBar from './BottomBar';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Top Bar */}
      <TopBar />

      {/* Main Content - Dual Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane */}
        <div className="flex-1">
          <ServicePane side="left" />
        </div>

        {/* Center Divider with Transfer Button */}
        <CenterDivider />

        {/* Right Pane */}
        <div className="flex-1">
          <ServicePane side="right" />
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />
    </div>
  );
};

export default MainLayout;
