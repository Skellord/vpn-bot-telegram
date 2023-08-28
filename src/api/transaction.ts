import { apiFetcher } from './fetcher';

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
