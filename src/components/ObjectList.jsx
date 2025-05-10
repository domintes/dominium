import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { objectsAtom, tagsAtom } from '../atoms';
import { FaYoutube, FaLink, FaColumns } from 'react-icons/fa';
import { useCSVImport } from '../hooks/useCSVImport';
import { useHTMLImport } from '../hooks/useHTMLImport';
import { Tags } from './Tags';
import Modal from './Modal';
import './object-list.scss';

export const ObjectList = () => {
  const [objects] = useAtom(objectsAtom);
  const [tags] = useAtom(tagsAtom);
  const [selectedTags, setSelectedTags] = useState([]);
  const [gridColumns, setGridColumns] = useState(4);
  const [selectedObject, setSelectedObject] = useState(null);
  const { importCSV } = useCSVImport();
  const { importHTML } = useHTMLImport();

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

  const handleHTMLUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      importHTML(file);
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
      return url;
    } catch {
      return url;
    }
  };

  return (
    <div className="p-4 text-white bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Object List</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-lg font-semibold">Import CSV:</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Import HTML:</h2>
            <input
              type="file"
              accept=".html"
              onChange={handleHTMLUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <h2 className="text-lg font-semibold">Grid Columns:</h2>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="6"
              value={gridColumns}
              onChange={(e) => setGridColumns(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-sm">{gridColumns}</span>
          </div>
        </div>

        <Tags tags={tags} selectedTags={selectedTags} onTagToggle={toggleTag} />

        <div 
          className="grid gap-4" 
          style={{ 
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` 
          }}
        >
          {filteredObjects.map((obj) => (
            <div 
              key={obj.id} 
              className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all cursor-pointer"
              onClick={() => setSelectedObject(obj)}
            >
              {obj.cover && (
                <div className="aspect-video">
                  <img src={obj.cover} alt="" className="w-full h-full single-item-cover-image" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{obj.title}</h3>
                {obj.type === 'video' ? (
                  <div className="text-blue-400">
                    <FaYoutube className="inline mr-2" /> Watch Video
                  </div>
                ) : (
                  <div className="text-blue-400">
                    <FaLink className="inline mr-2" /> Visit Link
                  </div>
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

      {selectedObject && (
        <Modal onClose={() => setSelectedObject(null)}>
          <div className="bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full mx-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">{selectedObject.title}</h2>
              {selectedObject.type === 'video' ? (
                <div className="aspect-video mb-4">
                  <iframe
                    src={getEmbedUrl(selectedObject.url)}
                    title={selectedObject.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : (
                <a
                  href={selectedObject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  <FaLink /> Open in New Tab
                </a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ObjectList;
