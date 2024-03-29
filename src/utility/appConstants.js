import { toast } from 'react-toastify';

export const baseURL = 'https://lyrist.vercel.app/api/';
export const defaultPageSize = 9;
export const navigationActions = {
  next: 'next',
  prev: 'prev',
};
export const appViews = {
  searchResults: 'searchResults',
  playlist: 'playlist'
}
export const apiTimeOutLimit = 5000;
export const infoToastConfig = {
  position: toast.POSITION.TOP_RIGHT,
  style: {
    margin: 10,
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
