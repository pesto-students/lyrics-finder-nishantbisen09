import React from 'react';
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
          <span className='track-name'>{title}</span>
          <span className='artist-name'>- {artist?.name}</span>
        </div>
        <div className='lyric-album-art'>
          <img src={artist?.picture_small} alt='artist-img' />
        </div>
      </div>
      <div className='lyrics'>
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
          title='Go back to results'
        ></i>
      </div>
      {lyrics && (
        <div className='copy-btn'>
          <i
            className='fas fa-copy'
            onClick={onCopyClick}
            title='Copy lyrics'
          ></i>
        </div>
      )}
      <div id='copy-textarea'></div>
    </div>
  );
};
