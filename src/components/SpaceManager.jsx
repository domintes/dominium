import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { universesAtom, currentUniverseAtom } from '../atoms';
import Modal from './Modal';
import './space-manager.scss';

export const SpaceManager = () => {
  const [universes, setUniverses] = useAtom(universesAtom);
  const [currentUniverse, setCurrentUniverse] = useAtom(currentUniverseAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [editingUniverse, setEditingUniverse] = useState(null);

  const handleCreateUniverse = () => {
    if (newSpaceName.trim()) {
      if (editingUniverse !== null) {
        setUniverses((prev) =>
          prev.map((universe, index) =>
            index === editingUniverse ? newSpaceName : universe
          )
        );
        setEditingUniverse(null);
      } else {
        setUniverses((prev) => [...prev, newSpaceName]);
      }
      setNewSpaceName('');
      setIsModalOpen(false);
    }
  };

  const handleEditUniverse = (index) => {
    setEditingUniverse(index);
    setNewSpaceName(universes[index]);
    setIsModalOpen(true);
  };

  const handleDeleteUniverse = (index) => {
    setUniverses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectUniverse = (index) => {
    setCurrentUniverse(universes[index]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUniverse(null);
  };

  return (
    <div className="space-manager">
      <h1 className="space-manager__title">Universes</h1>
      <div className="space-manager__list">
        {universes.map((universe, index) => (
          <div
            key={index}
            className={`space-manager__item ${
              currentUniverse === universe ? 'space-manager__item--active' : ''
            }`}
          >
            <button
              className="space-manager__item-name"
              onClick={() => handleSelectUniverse(index)}
            >
              {universe}
            </button>
            <div>
              <button
                className="space-manager__edit-btn"
                onClick={() => handleEditUniverse(index)}
              >
                ✏️
              </button>
              <button
                className="space-manager__delete-btn"
                onClick={() => handleDeleteUniverse(index)}
              >
                🌀
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="space-manager__create-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Create New Universe
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Enter Universe Name</h2>
          <input
            type="text"
            value={newSpaceName}
            onChange={(e) => setNewSpaceName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateUniverse()}
          />
          <button onClick={handleCreateUniverse}>Create Universe</button>
        </Modal>
      )}
    </div>
  );
};
