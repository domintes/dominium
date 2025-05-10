import React, { useState } from 'react';
import './tags.scss';

export const Tags = ({ tags, selectedTags, onTagToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rowsToShow = 5;
  const tagsPerRow = 8;
  const visibleTags = isExpanded ? tags : tags.slice(0, rowsToShow * tagsPerRow);

  return (
    <div className="tags">
      <h2 className="tags__title">Filter by Tags:</h2>
      <div className="tags__container">
        <div className={`tags__list ${!isExpanded ? 'tags__list--collapsed' : ''}`}>
          {visibleTags.map((tag) => (
            <button
              key={tag}
              className={`tags__tag ${selectedTags.includes(tag) ? 'tags__tag--selected' : ''}`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {tags.length > rowsToShow * tagsPerRow && (
          <>
            {!isExpanded && <div className="tags__fade" />}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="tags__toggle"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Tags;
