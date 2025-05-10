import React, { useState } from 'react';

export const Tags = ({ tags, selectedTags, onTagToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const rowsToShow = 5;
  const tagsPerRow = 8;
  const visibleTags = isExpanded ? tags : tags.slice(0, rowsToShow * tagsPerRow);

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Filter by Tags:</h2>
      <div className="relative">
        <div className={`flex flex-wrap gap-2 mt-2 ${!isExpanded ? 'max-h-[180px] overflow-hidden' : ''}`}>
          {visibleTags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-blue-500'
              }`}
              onClick={() => onTagToggle(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        {tags.length > rowsToShow * tagsPerRow && (
          <>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent" />
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-400 hover:text-blue-300"
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
