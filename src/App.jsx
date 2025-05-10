import React from 'react';
import { useAtom } from 'jotai';
import { currentUniverseAtom, universesAtom } from './atoms';
import './App.scss';
import { ObjectList } from './components/ObjectList';
import { SpaceManager } from './components/SpaceManager';

function App() {
  const [currentUniverse] = useAtom(currentUniverseAtom);
  const [universes] = useAtom(universesAtom);

  const gridClass = currentUniverse ? 'grid--1' : 'grid--1';
  const centerClass = currentUniverse ? '' : 'center';

  return (
    <div className={`app ${centerClass}`}>
      <nav className="app-navbar">
        <div className="app-navbar__content">
          <h1 className="app-navbar__title">Dominium</h1>
          {universes.length > 0 && (
            <div className="app-navbar__universe">
              {currentUniverse ? `Current Universe: ${currentUniverse}` : 'No universe selected'}
            </div>
          )}
        </div>
      </nav>

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
