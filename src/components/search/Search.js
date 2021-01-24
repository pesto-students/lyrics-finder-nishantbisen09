import React from 'react';
import './search.scss';

export const Search = ({ onChange, value }) => {
  return (
    <div className='search'>
      <input
        type={'text'}
        className='search-input'
        value={value}
        onChange={onChange}
        placeholder={'Search by song or artist name'}
      />
      <div className='search-icon'>
        <i className='fas fa-search'></i>
      </div>
    </div>
  );
};
