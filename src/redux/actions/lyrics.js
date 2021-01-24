import * as actionTypes from '../types';

export const getLyricSuggestions = (payload) => {
  return {
    type: actionTypes.FETCH_LYRICS_SUGGESTIONS,
    payload,
  };
};
export const getLyricSuggestionsSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_LYRICS_SUGGESTIONS_SUCCESS,
    payload,
  };
};
export const getLyricSuggestionsError = (error) => {
  return {
    type: actionTypes.FETCH_LYRICS_SUGGESTIONS_ERROR,
    error,
  };
};

export const getLyrics = (payload) => {
    return {
      type: actionTypes.FETCH_LYRICS,
      payload,
    };
  };

export const getLyricsSuccess = (payload) => {
    return {
      type: actionTypes.FETCH_LYRICS_SUCCESS,
      payload,
    };
  };

export const getLyricsError = (error) => {
    return {
      type: actionTypes.FETCH_LYRICS_ERROR,
      error,
    };
  };