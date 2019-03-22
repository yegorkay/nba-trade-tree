import { BBALL_PREFIX } from './../settings';
import { ITrade } from './../models';
import puppeteer from 'puppeteer';
import $ from 'cheerio';

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
      const suffix: string = $(ele)
        .children(`td:nth-child(1)`)
        .children('a')
        .attr('href');
      const player: string = child(1);
      const prevTeam: string = child(2);
      const currTeam: string = child(10);
      data.push({
        player,
        prevTeam,
        currTeam,
        link: `${BBALL_PREFIX}${suffix}#all_transactions`,
        tradeDate: tradeDates[tradeTableIndex]
      });
    });

  await browser.close();

  return data;
};
