import React from 'react';
import { useAtom } from 'jotai';
import { universesAtom, currentUniverseAtom } from '../atoms';

export const SpaceManager = () => {
  const [universes, setUniverses] = useAtom(universesAtom);
  const [currentUniverse, setCurrentUniverse] = useAtom(currentUniverseAtom);

  const createSpace = (name) => {
    const newUniverse = {
      id: crypto.randomUUID(),
      name,
      allowedTagIds: [],
      allowedCollectionIds: [],
      privateTagIds: [],
      privateCollectionIds: [],
      objectIds: []
    };
    setUniverses(prev => [...prev, newUniverse]);
  };

  const deleteSpace = (id) => {
    setUniverses(prev => prev.filter(u => u.id !== id));
    if (currentUniverse?.id === id) {
      setCurrentUniverse(null);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Spaces</h2>
      
      <div className="space-y-2">
        {universes.map(universe => (
          <div 
            key={universe.id}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              currentUniverse?.id === universe.id 
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setCurrentUniverse(universe)}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{universe.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSpace(universe.id);
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          const name = prompt('Enter space name:');
          if (name) createSpace(name);
        }}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Create New Space
      </button>
    </div>
  );
};
