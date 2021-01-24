import { call, put } from 'redux-saga/effects';
import { fetchLyrics, fetchLyricSuggestions } from '../../services/lyrics';
import {
  getLyricsError,
  getLyricsSuccess,
  getLyricSuggestionsError,
  getLyricSuggestionsSuccess,
} from '../actions/lyrics';

export function* fetchLyricsHandler(action) {
  try {
    const response = yield call(fetchLyrics, action.payload);
    yield put(getLyricsSuccess(response.data.data));
  } catch (error) {
    yield put(getLyricsError(error));
  }
}

export function* fetchLyricsSuggestionsHandler(action) {
  try {
    const response = yield call(fetchLyricSuggestions, action.payload);
    yield put(getLyricSuggestionsSuccess(response.data.data));
  } catch (error) {
    yield put(getLyricSuggestionsError(error));
  }
}
