import { User } from '../types';
import { apiFetcher } from './fetcher';

export async function createUser(id: number, username: string) {
  try {
    const payload = { id, username };
    const response = await apiFetcher('POST', 'users', JSON.stringify(payload));
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserData(id: number) {
  try {
    const params = { id: id.toString() };
    const response = await apiFetcher('GET', `users`, null, params);
    const data = await response.json() as User;

    return data;
  } catch (err) {
    console.error(err);
  }
}
