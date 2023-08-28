export type ProfileButtons = 'getImage' | 'getConf' | 'buyConnection';
export type ConnectionButtons = 'oneDay' | 'oneMonth';

export type SearchParams = {
  [key: string]: string;
};

export interface User {
  id: number;
  username: string;
  subscribe_days: number;
}
