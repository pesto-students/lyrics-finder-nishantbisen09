import React from 'react';
import './spinner.css';

export const Spinner = ({ isLoading }) => {
  return isLoading ? (
    <div className='spinner' aria-label='spinner'></div>
  ) : (
    <></>
  );
};
