const puppeteer = require('puppeteer');
const $ = require('cheerio');
const utils = require('../utils');

const { getAbbr } = utils;

const scrapeSinglePlayerTransaction = async (playerUrl, playerTradeDate) => {
  let data = [];
  const selector = 'p.transaction';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(playerUrl);
  const html = await page.content();

  $(selector, html).each(function() {
    const status = $(this)
      .clone()
      .find('strong:nth-child(1)')
      .remove()
      .end()
      .text()
      .split(' ')[1]
      .toLowerCase();

    const transactionDate = $(this)
      .children('strong:nth-child(1)')
      .text();

    const tradedBy = $(this)
      .children('strong:first-child + a')
      .text();

    const tradedTo = $(this)
      .children('a[data-attr-to]')
      .text();

    const string = $(this).text();
    const substring = 'G-League';
    const isGLeague = string.indexOf(substring) !== -1;

    if (!isGLeague) {
      data.push({
        transactionDate,
        tradedBy,
        tradedTo: status === 'drafted' ? '' : tradedTo,
        status
      });
    }
  });

  await browser.close();

  return data;
};

module.exports = scrapeSinglePlayerTransaction;
