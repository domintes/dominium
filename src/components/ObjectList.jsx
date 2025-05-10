import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { objectsAtom, tagsAtom } from '../atoms';
import { FaYoutube, FaLink } from 'react-icons/fa';
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
    <div className="object-list">
      <div className="object-list__container">
        <h1 className="object-list__title">Object List</h1>

        <div className="object-list__actions">
          <div>
            <h2 className="object-list__import-title">Import CSV:</h2>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="object-list__import-input"
            />
          </div>
          <div>
            <h2 className="object-list__import-title">Import HTML:</h2>
            <input
              type="file"
              accept=".html"
              onChange={handleHTMLUpload}
              className="object-list__import-input"
            />
          </div>
        </div>

        <div className="object-list__grid-control">
          <h2 className="object-list__grid-control-title">Grid Columns:</h2>
          <div>
            <input
              type="range"
              min="1"
              max="6"
              value={gridColumns}
              onChange={(e) => setGridColumns(Number(e.target.value))}
              className="object-list__grid-control-input"
            />
            <span className="object-list__grid-control-value">{gridColumns}</span>
          </div>
        </div>

        <Tags tags={tags} selectedTags={selectedTags} onTagToggle={toggleTag} />

        <div 
          className="object-list__grid" 
          style={{ 
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))` 
          }}
        >
          {filteredObjects.map((obj) => (
            <div 
              key={obj.id} 
              className="object-list__item"
              onClick={() => setSelectedObject(obj)}
            >
              {obj.cover && (
                <div className="object-list__item-image-container">
                  <img src={obj.cover} alt="" className="object-list__item-image" />
                </div>
              )}
              <div className="object-list__item-content">
                <h3 className="object-list__item-title">{obj.title}</h3>
                {obj.type === 'video' ? (
                  <div className="object-list__item-type">
                    <FaYoutube /> Watch Video
                  </div>
                ) : (
                  <div className="object-list__item-type">
                    <FaLink /> Visit Link
                  </div>
                )}
                {obj.tags.length > 0 && (
                  <div className="object-list__item-tags">
                    {obj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="object-list__item-tag"
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
          <div className="modal__content">
            <div className="modal__body">
              <h2 className="modal__title">{selectedObject.title}</h2>
              {selectedObject.type === 'video' ? (
                <div className="modal__video">
                  <iframe
                    src={getEmbedUrl(selectedObject.url)}
                    title={selectedObject.title}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ) : (
                <a
                  href={selectedObject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal__link"
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
