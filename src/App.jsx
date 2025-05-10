import React from 'react';
import { useAtom } from 'jotai';
import { currentUniverseAtom } from './atoms';
import './App.css';
import { ObjectList } from './components/ObjectList';
import { SpaceManager } from './components/SpaceManager';

function App() {
  const [currentUniverse] = useAtom(currentUniverseAtom);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <SpaceManager />
          </div>
          
          <div className="lg:col-span-3">
            {currentUniverse ? (
              <ObjectList />
            ) : (
              <div className="text-center text-gray-400 mt-10">
                Please select or create a space to start
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
