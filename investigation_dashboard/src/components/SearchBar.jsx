import { useState } from 'react';
import './SearchBar.css';

export function SearchBar({ onSearch, totalPeople }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          className="search-bar-input"
          placeholder="Search people by name..."
          value={searchTerm}
          onChange={handleChange}
          aria-label="Search people"
        />
        {searchTerm && (
          <button
            className="search-bar-clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            Clear
          </button>
        )}
      </div>
      {totalPeople > 0 && (
        <p className="search-bar-info">
          {totalPeople} {totalPeople === 1 ? 'person' : 'people'} found
        </p>
      )}
    </div>
  );
}
