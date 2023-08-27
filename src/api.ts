
import { Types } from 'telegraf';
import 'dotenv/config'
import { Readable } from 'stream';
import axios from 'axios';

const baseURL = process.env.BASE_URL ?? 'http://localhost:5000/api';

type Params = {
  [key: string]: string;
};

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

const apiFetcher = (method: string, url: string, body: BodyInit | null, params?: Params) => {
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

export async function createUser(id: number, username: string) {
  try {
    const payload = { id, username };
    const response = await apiFetcher('POST', 'users', JSON.stringify(payload));

    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserData(id: number) {
  try {
    const params = { id: id.toString() };
    const response = await apiFetcher('GET', `users`, null, params);
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}


export async function createTransaction(userId: number, amount: number) {
  try {
    const payload = { userId, amount };
    const response = await apiFetcher('POST', 'transactions', JSON.stringify(payload));
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getConnectionImage(userId: number): Promise<Buffer | undefined | null> {
  try {
    const params = { userId: userId.toString() };
    const response = await apiFetcher('GET', `peers/image`, null, params);
    // const j = await response.json();
    console.log(response);

    if (response) {
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer);
      return buffer;
    }

    return null;
  } catch (err) {
    console.error(err);
  }
}
