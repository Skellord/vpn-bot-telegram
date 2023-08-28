import { Types } from 'telegraf';

export function getInvoice(chatId: number, forMonth: boolean): Types.NewInvoiceParameters {
  const title = forMonth ? '1 месяц подписки vpn' : '1 день подписки vpn';
  const description = forMonth ? 'Доступ к впн на 1 месяц' : 'Доступ к впн на 1 день';

  const prices = forMonth ? [
    { label: '1 month', amount: 300 * 100 },
  ] : [
    { label: '1 day', amount: 100 * 100 },
  ];

  const invoice: Types.NewInvoiceParameters = {
    provider_token: process.env.PROVIDER_TOKEN ?? '',
    start_parameter: 'get_vpn',
    title,
    description,
    currency: 'RUB',
    prices,
    payload: `${chatId}_${forMonth ? 30 : 1}`,
  };

  return invoice;
}
