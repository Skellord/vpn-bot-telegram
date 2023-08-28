import { Context } from 'telegraf';

import { getInvoice } from '../helpers';
import { buyConnectionKeyboard } from '../keyboards';

export async function buyConnectionHandler(ctx: Context) {
  try {
    await ctx.reply('Купить подключение', buyConnectionKeyboard);
  } catch (err) {
    console.error(err);
  }
}

export async function buyOneDayHandler(ctx: Context) {
  try {
    const invoice = getInvoice(ctx.chat.id, false);
    const data = await ctx.replyWithInvoice(invoice);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

export async function buyOneMonthHandler(ctx: Context) {
  try {
    const invoice = getInvoice(ctx.chat.id, true);
    const data = await ctx.replyWithInvoice(invoice);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
