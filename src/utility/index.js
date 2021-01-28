import { apiTimeOutLimit } from './appConstants';

export function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function fetchWithTimeout(resource) {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), apiTimeOutLimit);
  return fetch(resource, {
    signal: controller.signal,
  });
}
