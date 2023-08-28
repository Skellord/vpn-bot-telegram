import { Context } from 'telegraf';
import { InputFile } from 'telegraf/typings/core/types/typegram';

import { getConnectionFile, getConnectionImage } from '../api';

export async function getImageHandler(ctx: Context) {
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
      } else {
        await ctx.reply('QR код не найден');
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function getConfigHandler(ctx: Context) {
  try {
    await ctx.reply('Получить файл конфигурации');

    if (ctx.from) {
      const data = await getConnectionFile(ctx.from.id);

      if (data) {
        const file: InputFile = {
          source: data,
          filename: 'vpn.conf',
        }

        await ctx.replyWithDocument(file);
      } else {
        await ctx.reply('QR код не найден');
      }
    }
  } catch (err) {
    console.error(err);
  }
}


