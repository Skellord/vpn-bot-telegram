import { SearchParams } from '../types';

const baseURL = process.env.BASE_URL ?? 'http://localhost:5000/api';

export function apiFetcher(method: string, url: string, body: BodyInit | null, params?: SearchParams) {
  const fetchParams = new URLSearchParams(params ?? {});
  const fetchUrl = `${baseURL}/${url}?${fetchParams}`;

  return fetch(fetchUrl, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
