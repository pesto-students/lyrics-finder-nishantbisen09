import React from 'react';
import './resultCard.css';

export const ResultCard = ({ artist, title }) => {
  return (
    <div className='lyric-card-container'>
      <div className='lyric-details-container'>
        <div className='lyric-details'>
          <span className='track-name'>{title}</span>
          <span className='artist-name'>-{artist?.name}</span>
        </div>
        <div className='lyric-album-art'>
          <img src={artist.picture_small} alt='artist-img' />
        </div>
      </div>
    </div>
  );
};
