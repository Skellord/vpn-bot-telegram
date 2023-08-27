import { Telegraf, Markup, Types } from 'telegraf';
import { message } from 'telegraf/filters';
import { InputFile } from 'telegraf/typings/core/types/typegram';
import 'dotenv/config'

import { ConnectionButtons, ProfileButtons } from './types';
import {
  connectionButtons,
  connectionButtonsNames,
  profileButtons,
  profileButtonsNames,
  PROFILE,
  COUNTRIES_LIST,
  HOW_IT_WORKS,
  BUY_CONNECTION,
} from './const';
import { createUser, getUserData, createTransaction, getConnectionImage } from './api';

const bot = new Telegraf(process.env.BOT_TOKEN ?? '');

const getInlineButton = (name: ProfileButtons | ConnectionButtons) => {
  if (name in profileButtons) {
    return Markup.button.callback(profileButtonsNames[name as ProfileButtons], profileButtons[name as ProfileButtons]);
  } else {
    return Markup.button.callback(connectionButtonsNames[name as ConnectionButtons], connectionButtons[name as ConnectionButtons]);
  }
};

function getInvoice(chatId: number): Types.NewInvoiceParameters {
  const invoice: Types.NewInvoiceParameters = {
    provider_token: process.env.PROVIDER_TOKEN ?? '',
    start_parameter: 'get_vpn',
    title: '1 day vpn',
    description: 'Доступ к впн на 1 день',
    currency: 'RUB',
    prices: [
      { label: '1 day', amount: 100 * 100 }
    ],
    payload: `${chatId}_${Number(new Date().toISOString())}`,
  };

  return invoice;
}

const profileKeyboard = Markup.inlineKeyboard([
  [getInlineButton('getImage')],
  [getInlineButton('getConf')],
  [getInlineButton('buyConnection')],
]);

const buyConnectionKeyboard = Markup.inlineKeyboard([
  [getInlineButton('oneDay')],
  [getInlineButton('oneMonth')],
]);

const mainKeyboard = Markup.keyboard([
  [PROFILE],
  [COUNTRIES_LIST],
  [HOW_IT_WORKS],
  [BUY_CONNECTION],
]).resize().oneTime();

bot.start(async ctx => {
  try {
    await ctx.reply('Hello!', mainKeyboard);
    await createUser(ctx.from.id, ctx.from.username ?? ctx.from.first_name);
  } catch (err) {
    console.error(err);
  }
});

bot.hears(PROFILE, async ctx => {
  try {
    const data = await getUserData(ctx.from.id);
    const subscribeDays = data?.subscribe_days;

    await ctx.replyWithHTML(
      `
        Профиль:
        ${data?.username} 
        Подписочных дней: ${subscribeDays ? `(${subscribeDays} days)` : 0}
      `,
      profileKeyboard
    );
  } catch (err) {
    console.error(err);
  }
});

bot.hears(COUNTRIES_LIST, async ctx => {
  try {
    await ctx.reply('Список стран');
  } catch (err) {
    console.error(err);
  }
});

bot.hears(HOW_IT_WORKS, async ctx => {
  try {
    await ctx.reply('Как это работает?');
  } catch (err) {
    console.error(err);
  }
});

bot.hears(BUY_CONNECTION, async ctx => {
  try {
    await ctx.reply('Купить подключение', buyConnectionKeyboard);
  } catch (err) {
    console.error(err);
  }
});

bot.action(profileButtons.buyConnection, async ctx => {
  try {
    await ctx.reply('Купить подключение', buyConnectionKeyboard);
  } catch (err) {
    console.error(err);
  }
});

bot.action(connectionButtons.oneDay, async ctx => {
  try {
    if (ctx.chat) {
      const data = await ctx.replyWithInvoice(getInvoice(ctx.chat.id));

      console.log(data);
    }
  } catch (err) {
    console.error(err);
  }
});

bot.action(profileButtons.getImage, async ctx => {
  try {
    await ctx.reply('Получить qr код');
    if (ctx.from) {
      const data = await getConnectionImage(ctx.from.id);
      if (data) {
        const photo: InputFile = {
          source: data,
          filename: 'conf.png',
        }

        await ctx.replyWithPhoto(photo);
      }
    }
  } catch (err) {
    console.error(err);
  }
})

bot.on('pre_checkout_query', async ctx => {
  try {
    const data = await createTransaction(ctx.from.id, 1);

    if (data) {
      await ctx.answerPreCheckoutQuery(true);
    } else {
      await ctx.answerPreCheckoutQuery(false);
    }
  } catch (err) {
    console.error(err);
    await ctx.answerPreCheckoutQuery(false);
  }
})

bot.on(message('successful_payment'), async ctx => {
  try {
    await ctx.reply('Спасибо за покупку!');
    console.log(ctx);
  } catch (err) {
    console.error(err);
  }
})

bot.launch();
