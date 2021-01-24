import * as actionTypes from '../types';

const initialState = { suggestions: [], lyrics: '' };

export const lyricsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LYRICS_SUCCESS:
      return { ...state, lyrics: action.payload };
    case actionTypes.FETCH_LYRICS_SUGGESTIONS_SUCCESS:
      return { ...state, suggestions: action.payload };
    case actionTypes.FETCH_LYRICS_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.FETCH_LYRICS_SUGGESTIONS_ERROR:
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
};
