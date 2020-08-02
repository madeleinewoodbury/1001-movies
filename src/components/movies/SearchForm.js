import React, { useState } from 'react';

const SearchForm = () => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for ' + search);
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            className="search-input"
            type="text"
            placeholder="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-btn" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
