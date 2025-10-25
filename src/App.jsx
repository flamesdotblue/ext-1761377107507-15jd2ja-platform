import React from 'react';
import TopBar from './components/TopBar';
import LeftSidebar from './components/LeftSidebar';
import Viewport3D from './components/Viewport3D';
import RightSidebar from './components/RightSidebar';

function App() {
  return (
    <div className="w-full h-screen bg-[#121212] text-gray-200 flex flex-col">
      <TopBar />
      <div className="flex-1 grid grid-cols-12 gap-0 min-h-0">
        <div className="col-span-3 xl:col-span-2 min-h-0 border-r border-gray-800 bg-[#151515] overflow-hidden">
          <LeftSidebar />
        </div>
        <div className="col-span-6 xl:col-span-8 min-h-0">
          <Viewport3D />
        </div>
        <div className="col-span-3 xl:col-span-2 min-h-0 border-l border-gray-800 bg-[#151515] overflow-hidden">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
