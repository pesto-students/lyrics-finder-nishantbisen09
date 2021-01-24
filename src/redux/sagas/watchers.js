import { takeEvery, debounce } from 'redux-saga/effects';
import { searchDebounceTime } from '../../constants/appConstants';
import * as actionTypes from '../types';
import { fetchLyricsHandler, fetchLyricsSuggestionsHandler } from './lyrics';
export function* watcher() {
  yield takeEvery(actionTypes.FETCH_LYRICS, fetchLyricsHandler);
  yield debounce(
    searchDebounceTime,
    actionTypes.FETCH_LYRICS_SUGGESTIONS,
    fetchLyricsSuggestionsHandler
  );
}
