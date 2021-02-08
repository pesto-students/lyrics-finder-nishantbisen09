import React, { useEffect, useState } from 'react';
import { APP_MESSAGES } from '../../utility/strings';
import './resultCard.css';
import defaultArtistImage from '../../assets/images/album-art-placeholder.jpg';

export const ResultCard = ({ artist, title }) => {
  const [artistImage, setArtistImage] = useState(defaultArtistImage);

  useEffect(() => {
    setArtistImage(
      artist && artist.picture_small ? artist.picture_small : defaultArtistImage
    );
  }, [artist]);

  return (
    <div className='lyric-card-container'>
      <div className='lyric-details-container'>
        <div className='lyric-details'>
          <span className='track-name'>
            {title ? title : APP_MESSAGES.noTitleFound}
          </span>
          <span className='artist-name'>
            {artist && artist.name
              ? `- ${artist.name}`
              : APP_MESSAGES.artistNameUnavailable}
          </span>
        </div>
        <div className='lyric-album-art'>
          <img
            src={artistImage}
            onError={() => setArtistImage(defaultArtistImage)}
            alt='artist-img'
          />
        </div>
      </div>
    </div>
  );
};
