import { ConnectionButtons, ProfileButtons } from './types';

export const PROFILE = 'Профиль 👤.';
export const COUNTRIES_LIST = 'Список стран 🌍.';
export const HOW_IT_WORKS = 'Как это работает?';
export const BUY_CONNECTION = 'Купить подключение 💳.';

export const profileButtons: Record<ProfileButtons, string> = {
  getImage: 'getImage',
  getConf: 'getConf',
  buyConnection: 'buyConnection',
};

export const profileButtonsNames: Record<ProfileButtons, string> = {
  getImage: 'Получить qr код',
  getConf: 'Получить конфигурацию',
  buyConnection: 'Купить подключение',
};

export const connectionButtons: Record<ConnectionButtons, string> = {
  oneDay: 'oneDay',
  oneMonth: 'oneMonth',
};

export const connectionButtonsNames: Record<ConnectionButtons, string> = {
  oneDay: '1 день',
  oneMonth: '1 месяц',
};
