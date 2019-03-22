import { BBALL_PREFIX } from './../settings';
import { ITrade } from './../models';
import puppeteer from 'puppeteer';
import $ from 'cheerio';
import { getPlayerId } from './../utils';

export const scrapeMainTransaction = async (
  f1: string,
  f2: string,
  tradeTableIndex: number = 0
) => {
  let data: ITrade[] = [];
  let tradeDates: string[] = [];
  const selector = `#st_${tradeTableIndex} tr`;
  const tradeURL = `${BBALL_PREFIX}/friv/trades.fcgi?f1=${f1}&f2=${f2}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(tradeURL);
  const html = await page.content();

  $('p.transaction strong', html).each((_i: number, ele: CheerioElement) => {
    const date = $(ele).text();
    tradeDates.push(date);
  });

  $(selector, html)
    .not('.thead')
    .each((_i: number, ele: CheerioElement) => {
      const child = (index: number): string =>
        $(ele)
          .children(`td:nth-child(${index})`)
          .text();
      const playerURL = $(ele)
        .children(`td:nth-child(1)`)
        .children('a')
        .attr('href');
      const name: string = child(1);
      const tradedBy: string = child(2);
      const tradedTo: string = child(10);
      data.push({
        name,
        playerId: getPlayerId(playerURL),
        tradedBy,
        tradedTo,
        transactionDate: tradeDates[tradeTableIndex]
      });
    });

  await browser.close();

  return data;
};
