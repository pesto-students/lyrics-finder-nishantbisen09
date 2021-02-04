import React from 'react';
import { APP_MESSAGES } from '../../utility/appConstants';
import './resultCard.css';

export const ResultCard = ({ artist, title }) => {
  return (
    <div className='lyric-card-container'>
      <div className='lyric-details-container'>
        <div className='lyric-details'>
          <span className='track-name'>
            {title ? title : APP_MESSAGES.noTitleFound}
          </span>
          <span className='artist-name'>
             {artist && artist.name ? `- ${artist.name}` : APP_MESSAGES.artistNameUnavailable}
          </span>
        </div>
        <div className='lyric-album-art'>
          <img
            src={
              artist && artist.picture_small
                ? artist.picture_small
                : require('../../assets/images/album-art-placeholder.jpg')
            }
            alt='artist-img'
          />
        </div>
      </div>
    </div>
  );
};
