import { Context } from 'telegraf';
import { PreCheckoutQuery, Update } from 'telegraf/typings/core/types/typegram';

import { createTransaction } from '../api';

export async function preCheckoutHandler(ctx: Context<Update.PreCheckoutQueryUpdate>) {
  try {
    const { update: { pre_checkout_query } } = ctx;
    const days = pre_checkout_query.invoice_payload.split('_')[1] === '30' ? 30 : 1;
    const data = await createTransaction(ctx.from.id, days);

    if (data) {
      await ctx.answerPreCheckoutQuery(true);
    } else {
      await ctx.answerPreCheckoutQuery(false);
    }
  } catch (err) {
    console.error(err);
    await ctx.answerPreCheckoutQuery(false);
  }
}

export async function successfulPaymentHandler(ctx: Context) {
  try {
    await ctx.reply('Спасибо за покупку!');
  } catch (err) {
    console.error(err);
  }
}
