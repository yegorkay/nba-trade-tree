import { BBALL_PREFIX } from '../settings';
import { ITrade } from '../models';
import puppeteer from 'puppeteer';
import $ from 'cheerio';
import _ from 'lodash';
import { getPlayerId, formatDate } from '../utils';

export const scrapeMainTransaction = async (f1: string, f2: string) => {
  let data: ITrade[] = [];
  const selector: string = `.transaction + .table_wrapper > .stats_table tbody tr`;
  const tradeURL: string = `${BBALL_PREFIX}/friv/trades.fcgi?f1=${f1}&f2=${f2}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(tradeURL);
  const html = await page.content();

  $(selector, html)
    .not('.thead')
    .each((_i: number, ele: CheerioElement) => {
      const child = (index: number): string =>
        $(ele)
          .children(`td:nth-child(${index})`)
          .text();
      const playerURL: string = $(ele)
        .children(`td:nth-child(1)`)
        .children('a')
        .attr('href');
      const name: string = child(1);
      const tradedBy: string = child(2);
      const tradedTo: string = child(10);
      const transactionDate: string = $(ele)
        .parent()
        .parent()
        .parent()
        .prev()
        .children('strong')
        .text();
      data.push({
        name,
        playerId: getPlayerId(playerURL),
        tradedBy,
        tradedTo,
        transactionDate: formatDate(transactionDate)
      });
    });

  await browser.close();

  const groupedData = _.groupBy(data, 'transactionDate');
  return groupedData;
};
