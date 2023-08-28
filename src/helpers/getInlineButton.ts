import { Markup } from 'telegraf';
import { profileButtons, profileButtonsNames, connectionButtonsNames, connectionButtons } from '../const';
import { ProfileButtons, ConnectionButtons } from '../types';

export function getInlineButton(name: ProfileButtons | ConnectionButtons) {
  if (name in profileButtons) {
    return Markup.button.callback(profileButtonsNames[name as ProfileButtons], profileButtons[name as ProfileButtons]);
  } else {
    return Markup.button.callback(connectionButtonsNames[name as ConnectionButtons], connectionButtons[name as ConnectionButtons]);
  }
};
