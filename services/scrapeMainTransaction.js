const puppeteer = require('puppeteer');
const $ = require('cheerio');
const bballPrefix = require('../settings');

const scrapeMainTransaction = async (f1, f2, tradeTableIndex = 0) => {
  let data = [];
  let tradeDates = [];
  const selector = `#st_${tradeTableIndex} tr`;
  const tradeURL = `${bballPrefix}/friv/trades.fcgi?f1=${f1}&f2=${f2}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(tradeURL);
  const html = await page.content();

  $('p.transaction strong', html).each(function() {
    const date = $(this).text();
    tradeDates.push(date);
  });

  $(selector, html)
    .not('.thead')
    .each(function() {
      const child = (index) =>
        $(this)
          .children(`td:nth-child(${index})`)
          .text();
      const suffix = $(this)
        .children(`td:nth-child(1)`)
        .children('a')
        .attr('href');
      const player = child(1);
      const prevTeam = child(2);
      const currTeam = child(10);
      data.push({
        player,
        prevTeam,
        currTeam,
        link: `${bballPrefix}${suffix}#all_transactions`,
        tradeDate: tradeDates[tradeTableIndex]
      });
    });

  await browser.close();

  return data;
};

module.exports = scrapeMainTransaction;
