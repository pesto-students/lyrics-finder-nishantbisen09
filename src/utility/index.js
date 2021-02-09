import { toast } from 'react-toastify';
import {
  apiTimeOutLimit,
  defaultPageSize,
  errorToastConfig,
} from './appConstants';

import { APP_MESSAGES } from '../utility/strings';

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

export const escapeSlashes = (word) => {
  return word.replace(/\//g, '-').replace(/\\/g,'');
};

export const getTotalNoOfPages = (noOfRecords) =>
  Math.ceil(noOfRecords / defaultPageSize);
