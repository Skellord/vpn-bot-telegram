import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import 'dotenv/config'

import {
  connectionButtons,
  profileButtons,
  PROFILE,
  COUNTRIES_LIST,
  HOW_IT_WORKS,
  BUY_CONNECTION,
} from './const';

import {
  buyConnectionHandler,
  buyOneDayHandler,
  buyOneMonthHandler,
  countriesHandler,
  getConfigHandler,
  getImageHandler,
  howItWorksHandler,
  preCheckoutHandler,
  profileHandler,
  startHandler,
  successfulPaymentHandler,
} from './handlers';

const bot = new Telegraf(process.env.BOT_TOKEN ?? '');
const port = process.env.PORT ? Number(process.env.PORT) : 5001;
const domain = process.env.WEBHOOK_URL ?? '';
const launchConfig = process.env.NODE_ENV === 'production' ? { webhook: { domain, port } } : undefined;

if (process.env.NODE_ENV === 'production' && process.env.WEBHOOK_URL) {
  bot.telegram.setWebhook(process.env.WEBHOOK_URL);
}

bot.start(startHandler);

bot.hears(PROFILE, profileHandler);
bot.hears(COUNTRIES_LIST, countriesHandler);
bot.hears(HOW_IT_WORKS, howItWorksHandler);
bot.hears(BUY_CONNECTION, buyConnectionHandler);

bot.action(profileButtons.buyConnection, buyConnectionHandler);
bot.action(connectionButtons.oneDay, buyOneDayHandler);
bot.action(connectionButtons.oneMonth, buyOneMonthHandler);
bot.action(profileButtons.getImage, getImageHandler);
bot.action(profileButtons.getConf, getConfigHandler);

bot.on('pre_checkout_query', preCheckoutHandler);

bot.on(message('successful_payment'), successfulPaymentHandler)

bot.launch(launchConfig);
