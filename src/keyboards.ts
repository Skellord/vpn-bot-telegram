import { Markup } from 'telegraf';
import { PROFILE, COUNTRIES_LIST, HOW_IT_WORKS, BUY_CONNECTION } from './const';
import { getInlineButton } from './helpers/getInlineButton';

export const profileKeyboard = Markup.inlineKeyboard([
  [getInlineButton('getImage')],
  [getInlineButton('getConf')],
  [getInlineButton('buyConnection')],
]);

export const buyConnectionKeyboard = Markup.inlineKeyboard([
  [getInlineButton('oneDay')],
  [getInlineButton('oneMonth')],
]);

export const mainKeyboard = Markup.keyboard([
  [PROFILE],
  [COUNTRIES_LIST],
  [HOW_IT_WORKS],
  [BUY_CONNECTION],
]).resize().oneTime();
