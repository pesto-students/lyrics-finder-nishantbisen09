import { fetchWithTimeout } from '../utility';
import { baseURL } from '../utility/appConstants';

export const fetchLyricSuggestions = (searchQuery) => {
  return fetchWithTimeout(`${baseURL}suggest/${searchQuery}`);
};

export const fetchLyrics = ({ artist, title }) => {
  return fetchWithTimeout(`${baseURL}v1/${artist}/${title}`);
};
