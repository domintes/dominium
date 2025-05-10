import React from 'react';
import { useAtom } from 'jotai';
import { currentUniverseAtom } from './atoms';
import './App.scss';
import { ObjectList } from './components/ObjectList';
import { SpaceManager } from './components/SpaceManager';

function App() {
  const [currentUniverse] = useAtom(currentUniverseAtom);

  const gridClass = currentUniverse ? 'grid--4' : 'grid--1';

  const centerClass = currentUniverse ? '' : 'center'; // Add center class when no universe is selected

  return (
    <div className={`app ${centerClass}`}>
      <div className="container">
        <div className={`grid ${gridClass}`}>
          <div className="sidebar">
            <SpaceManager />
          </div>
          
          <div className="main">
            {currentUniverse ? (
              <ObjectList />
            ) : (
              <div className="empty-state">
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
