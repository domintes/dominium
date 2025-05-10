import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { objectsAtom, tagsAtom } from '../atoms';
import { FaYoutube, FaLink, FaColumns } from 'react-icons/fa';
import { useCSVImport } from '../hooks/useCSVImport';

export const ObjectList = () => {
  const [objects] = useAtom(objectsAtom);
  const [tags] = useAtom(tagsAtom);
  const [selectedTags, setSelectedTags] = useState([]);
  const [gridColumns, setGridColumns] = useState(4);
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

  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
        const videoId = urlObj.hostname.includes('youtu.be') 
          ? urlObj.pathname.slice(1)
          : urlObj.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      }
      // Add support for other video platforms here
      return url;
    } catch {
      return url;
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

      <div className="mb-4 flex items-center gap-4">
        <h2 className="text-lg font-semibold">Grid Columns:</h2>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="8"
            value={gridColumns}
            onChange={(e) => setGridColumns(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm">{gridColumns}</span>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">Filter by Tags:</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-blue-500'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div 
        className="grid gap-4" 
        style={{ 
          gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` 
        }}
      >
        {filteredObjects.map((obj) => (
          <div key={obj.id} className="bg-gray-800 rounded-lg overflow-hidden">
            {obj.cover && (
              <img src={obj.cover} alt="" className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{obj.title}</h3>
              {obj.excerpt && (
                <p className="text-gray-400 text-sm mb-2">{obj.excerpt}</p>
              )}
              {obj.type === 'video' ? (
                <div className="aspect-video mb-2">
                  <iframe
                    src={getEmbedUrl(obj.url)}
                    title={obj.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : (
                <a
                  href={obj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  <FaLink /> Visit Link
                </a>
              )}
              {obj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {obj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-gray-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectList;
