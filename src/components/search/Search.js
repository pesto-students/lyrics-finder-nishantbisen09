import React from 'react';
import './search.scss';

export const SearchBar = ({ onChange, onSubmit, value }) => {
  return (
    <div className='search'>
      <form onSubmit={onSubmit}>
        <input
          type={'text'}
          className='search-input'
          value={value}
          onChange={onChange}
          placeholder={'Search by song or artist name'}
        />
      </form>
      <div className='search-icon'>
        <i className='fas fa-search'></i>
      </div>
    </div>
  );
};
