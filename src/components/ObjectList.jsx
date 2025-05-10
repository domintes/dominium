import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { objectsAtom, tagsAtom } from '../atoms';
import { FaYoutube, FaLink } from 'react-icons/fa';
import { useCSVImport } from '../hooks/useCSVImport';

export const ObjectList = () => {
  const [objects] = useAtom(objectsAtom);
  const [tags] = useAtom(tagsAtom);
  const [selectedTags, setSelectedTags] = useState([]);
  const { importCSV } = useCSVImport();

  const filteredObjects = objects.filter((obj) =>
    selectedTags.length === 0 || selectedTags.every((tag) => obj.tags.includes(tag))
  );

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      importCSV(file);
    }
  };

  return (
    <div className="p-4 text-white bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Object List</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Import CSV:</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Filter by Tags:</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-gray-800 border-gray-600 text-gray-300'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredObjects.map((obj) => (
          <div
            key={obj.id}
            className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              {obj.type === 'video' ? (
                <FaYoutube className="text-red-500" size={20} />
              ) : (
                <FaLink className="text-blue-500" size={20} />
              )}
              <h3 className="text-lg font-semibold truncate">{obj.title}</h3>
            </div>
            <p className="text-sm text-gray-400 truncate">{obj.note || obj.excerpt}</p>
            {obj.cover && (
              <img
                src={obj.cover}
                alt={obj.title}
                className="w-full h-32 object-cover rounded mt-2"
              />
            )}
            <a
              href={obj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-blue-400 hover:underline text-sm"
            >
              Open Link
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectList;
