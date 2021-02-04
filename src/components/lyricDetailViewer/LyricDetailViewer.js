import React from 'react';
import { APP_MESSAGES } from '../../utility/appConstants';
import { CopyToClipboard } from '../copyToClipboard/CopyToClipboard';
import './lyricDetail.css';

export const LyricDetailViewer = ({
  lyricsData,
  onBackButtonClick,
  onCopyClick,
}) => {
  const { lyrics, artist, title } = lyricsData;
  return (
    <div className='lyric-info-container'>
      <div className='lyric-info'>
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
            src={
              artist && artist.picture_small
                ? artist.picture_small
                : require('../../assets/images/album-art-placeholder.jpg')
            }
            alt='artist-img'
          />
        </div>
      </div>
      <div className='lyrics scroller'>
        {lyrics ? (
          lyrics
        ) : (
          <div className='lyrics-not-found'>
            <i className='far fa-frown-open'></i>
            <span className='empty-lyrics-message'>Lyrics not found.</span>
          </div>
        )}
      </div>
      <div className='back-btn'>
        <i
          className='fas fa-chevron-circle-left'
          onClick={onBackButtonClick}
          title={APP_MESSAGES.goBackToResults}
        ></i>
      </div>
      {lyrics && (
        <div className='copy-btn'>
          <CopyToClipboard text={lyrics} onCopy={onCopyClick}>
            <i className='fas fa-copy' title={APP_MESSAGES.copyLyrics}></i>
          </CopyToClipboard>
        </div>
      )}
    </div>
  );
};
