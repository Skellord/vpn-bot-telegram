import { Context } from 'telegraf';

import { createUser, getUserData } from '../api';
import { mainKeyboard, profileKeyboard } from '../keyboards';

export async function startHandler(ctx: Context) {
  try {
    await ctx.reply('Привет!', mainKeyboard);
    const user = await getUserData(ctx.from.id);

    if (!user) {
      await createUser(ctx.from.id, ctx.from.username ?? ctx.from.first_name);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function profileHandler(ctx: Context) {
  try {
    const user = await getUserData(ctx.from.id);

    if (user) {
      await ctx.replyWithHTML(
        `
          Профиль:
          ${user.username} 
          Подписочных дней: ${user.subscribe_days ? `(${user.subscribe_days})` : 0}
        `,
        profileKeyboard
      );
    }
  } catch (err) {
    console.error(err);
  }
}

export async function countriesHandler(ctx: Context) {
  try {
    await ctx.replyWithHTML(`
      Список доступных стран: 
        Нидерланды \u{1F1F3}\u{1F1F1}
    `);
  } catch (err) {
    console.error(err);
  }
}

export async function howItWorksHandler(ctx: Context) {
  try {
    await ctx.reply('Как это работает?');
  } catch (err) {
    console.error(err);
  }
}
