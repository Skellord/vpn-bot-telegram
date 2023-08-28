import { apiFetcher } from './fetcher';

export async function getConnectionImage(userId: number): Promise<Buffer | undefined | null> {
  try {
    const params = { userId: userId.toString() };
    const response = await apiFetcher('GET', `peers/image`, null, params);

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

export async function getConnectionFile(userId: number): Promise<Buffer | undefined | null> {
  try {
    const params = { userId: userId.toString() };
    const response = await apiFetcher('GET', `peers/conf`, null, params);

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
