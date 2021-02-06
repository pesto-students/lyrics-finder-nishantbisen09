import React from 'react';
import './search.css';

export const SearchBar = ({ onChange, onSubmit, value, placeholder }) => {
  return (
    <div className='search'>
      <form onSubmit={onSubmit}>
        <input
          data-testid='search-input'
          type={'text'}
          className='search-input'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </form>
      <div data-testid='search-icon' className='search-icon'>
        <i className='fas fa-search' onClick={onSubmit}></i>
      </div>
    </div>
  );
};
