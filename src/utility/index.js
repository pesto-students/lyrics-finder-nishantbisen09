import { toast } from 'react-toastify';
import {
  apiTimeOutLimit,
  defaultPageSize,
  APP_MESSAGES,
  errorToastConfig,
} from './appConstants';

export function fetchWithTimeout(resource, timeout = apiTimeOutLimit, options) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeout);
  return fetch(resource, {
    signal: controller.signal,
    ...options,
  }).catch((error) => {
    toast.error(`${APP_MESSAGES.requestTimedOut}, ${error}`, errorToastConfig);
  });
}

export const escapeForwardSlash = (word) => {
  return word.replace(/\//g, '-');
};

export const getTotalNoOfPages = (noOfRecords) =>
  Math.ceil(noOfRecords / defaultPageSize);
