import React, { useState } from 'react';

const SearchForm = ({ handleSearch }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('down');

  const handleSort = (e) => {
    if (e.target.className.includes('fa-sort-numeric-down')) {
      setSort('down');
    } else if (e.target.className.includes('fa-sort-numeric-up-alt')) {
      setSort('up');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };
  return (
    <div className="form-container search-form">
      <div className="sort">
        <i
          onClick={(e) => handleSort(e)}
          className={
            sort === 'down'
              ? 'fas fa-sort-numeric-down active'
              : 'fas fa-sort-numeric-down'
          }
        ></i>
        <i
          onClick={(e) => handleSort(e)}
          className={
            sort === 'up'
              ? 'fas fa-sort-numeric-up-alt active'
              : 'fas fa-sort-numeric-up-alt'
          }
        ></i>
      </div>
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
