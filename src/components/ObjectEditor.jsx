import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { tagsAtom, currentUniverseAtom } from '../atoms';

export const ObjectEditor = ({ object, onSave, onCancel }) => {
  const [currentUniverse] = useAtom(currentUniverseAtom);
  const [tags] = useAtom(tagsAtom);
  
  const [title, setTitle] = useState(object?.title || '');
  const [selectedTags, setSelectedTags] = useState(object?.tags || []);
  const [type, setType] = useState(object?.type || 'note');

  // Get available tags (global + universe-specific)
  const availableTags = tags.filter(tag => 
    !tag.universeId || tag.universeId === currentUniverse?.id
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newObject = {
      id: object?.id || crypto.randomUUID(),
      title,
      type,
      tags: selectedTags,
      collections: object?.collections || [],
      universeId: currentUniverse?.id,
      createdAt: object?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(newObject);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 text-white"
          >
            <option value="note">Note</option>
            <option value="video">Video</option>
            <option value="beatmap">Beatmap</option>
            <option value="article">Article</option>
            <option value="link">Link</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Tags
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => setSelectedTags(prev => 
                  prev.includes(tag.id) 
                    ? prev.filter(id => id !== tag.id)
                    : [...prev, tag.id]
                )}
                className={`px-2 py-1 rounded text-sm ${
                  selectedTags.includes(tag.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-gray-300'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {object ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};
