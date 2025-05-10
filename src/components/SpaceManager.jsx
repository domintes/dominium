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
        if (currentUniverse === universes[editingUniverse]) {
          setCurrentUniverse(newSpaceName);
        }
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
    if (currentUniverse === universes[index]) {
      setCurrentUniverse(null);
    }
    setUniverses((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectUniverse = (index) => {
    setCurrentUniverse(universes[index]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUniverse(null);
    setNewSpaceName('');
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
                title="Edit Universe"
              >
                ✏️
              </button>
              <button
                className="space-manager__delete-btn"
                onClick={() => handleDeleteUniverse(index)}
                title="Delete Universe"
              >
                🌀
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="space-manager__create-btn"
        onClick={() => {
          setNewSpaceName('');
          setEditingUniverse(null);
          setIsModalOpen(true);
        }}
      >
        Create New Universe
      </button>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="modal__content">
            <h2>
              {editingUniverse !== null
                ? 'Rename Universe'
                : 'Create Universe'}
            </h2>
            <input
              type="text"
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateUniverse()}
              placeholder={
                editingUniverse !== null
                  ? 'Enter new name'
                  : 'Enter universe name'
              }
              className="modal__input"
              autoFocus
            />
            <div className="modal__actions">
              <button
                onClick={closeModal}
                className="modal__button modal__button--secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUniverse}
                className="modal__button modal__button--primary"
              >
                {editingUniverse !== null ? 'Rename' : 'Create'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
