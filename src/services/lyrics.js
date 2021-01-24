import { NetworkManager } from '../network/NetworkManager';

export const fetchLyricSuggestions = ({ searchQuery }) => {
  return NetworkManager.getInstance().get(`suggest/${searchQuery}`);
};

export const fetchLyrics = ({ artist, title }) => {
  return NetworkManager.getInstance().get(`v1/${artist}/${title}`);
};
