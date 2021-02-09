import React from 'react';
import './search.css';
import { APP_MESSAGES } from '../../utility/strings';

export const SearchBar = ({
  onChange,
  onSubmit,
  onClear,
  value,
  placeholder,
}) => {
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
          autoFocus={true}
        />
      </form>
      {value && (
        <div className='clear-icon'>
          <i
            data-testid='clear-icon'
            className='fas fa-times'
            onClick={onClear}
            tabIndex={0}
          ></i>
        </div>
      )}
      <div data-testid='search-icon' className='search-icon'>
        <i
          className='fas fa-search'
          onClick={onSubmit}
          title={APP_MESSAGES.searchArtistOrSong}
          tabIndex={0}
        ></i>
      </div>
    </div>
  );
};
