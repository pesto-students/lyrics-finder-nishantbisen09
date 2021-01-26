import { baseURL } from "../utility/appConstants";

export const fetchLyricSuggestions = (searchQuery) => {
  return fetch(`${baseURL}suggest/${searchQuery}`);
};

export const fetchLyrics = ({ artist, title }) => {
  return fetch(`${baseURL}v1/${artist}/${title}`);
};
