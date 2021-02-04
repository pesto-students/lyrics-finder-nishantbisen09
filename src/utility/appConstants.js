import { toast } from 'react-toastify';

export const searchDebounceTime = 1500;
export const baseURL = 'https://api.lyrics.ovh/';
export const defaultPageSize = 9;
export const navigationActions = {
  next: 'next',
  prev: 'prev',
};
export const apiTimeOutLimit = 5000;
export const APP_MESSAGES = {
  lyricsCopied: 'Lyrics copied',
  requestTimedOut: 'Request timed out',
  noTitleFound: 'no title found',
  artistNameUnavailable: 'artist name unavailable',
  lyricsNotFound: 'Lyrics not found.',
  goBackToResults: 'Go back to results',
  copyLyrics: 'Copy lyrics'
};
export const infoToastConfig = {
  position: toast.POSITION.TOP_CENTER,
  style: {
    margin: 10,
    backgroundColor: '#13322D',
    color: 'white',
    fontWeight: 'bold',
  },
};

export const errorToastConfig = {
  ...infoToastConfig,
  style: {
    ...infoToastConfig.style,
    backgroundColor: '#E74C3C',
  },
};
