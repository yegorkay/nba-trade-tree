const puppeteer = require('puppeteer');
const $ = require('cheerio');
const utils = require('../utils');
const settings = require('../settings');

const { bballPrefix } = settings;
const {
  getAbbr,
  pruneTeam,
  getDraftPick,
  extractDraftPick,
  mergePlayersAndPicks
} = utils;

const scrapeSinglePlayerTransaction = async (playerUrl, playerTradeDate) => {
  let data = [];
  const selector = '#div_transactions p';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(playerUrl);
  const html = await page.content();

  const playerDraftPosition = extractDraftPick(
    $(`${selector}:contains("Drafted by")`, html).text()
  );

  $(selector, html).each(function() {
    const tradeString = $(this).text();
    const gLeague = 'G-League';
    const isGLeague = tradeString.indexOf(gLeague) !== -1;

    const status = $(this)
      .clone()
      .find('strong:nth-child(1)')
      .remove()
      .end()
      .text()
      .split(' ')[1]
      .toLowerCase();

    const notTraded =
      status === 'drafted' || status === 'signed' || status === 'waived';

    const transactionDate = $(this)
      .children('strong:nth-child(1)')
      .text();

    const tradedBy = $(this)
      .children('strong:first-child + a')
      .text();

    const tradedTo = $(this)
      .children('a[data-attr-to]')
      .text();

    const tradedForArray = $(this)
      .children('a:not(:nth-of-type(-n + 1))')
      .map(function() {
        return {
          name: $(this).text(),
          link: `${bballPrefix}${$(this).attr('href')}`
        };
      })
      .get();

    const assets = notTraded
      ? []
      : getDraftPick(tradeString, playerDraftPosition);

    const tradedFor = notTraded ? [] : pruneTeam(tradedForArray);

    if (!isGLeague) {
      data.push({
        status,
        transactionDate,
        tradedBy: getAbbr(tradedBy),
        tradedTo: notTraded ? '' : getAbbr(!isGLeague ? tradedTo : ''),
        tradedFor: mergePlayersAndPicks(tradedFor, assets)
      });
    }
  });

  await browser.close();

  const dateTradedIndex = data.findIndex(
    (date) => date.transactionDate === playerTradeDate
  );

  return data.splice(dateTradedIndex);
};

module.exports = scrapeSinglePlayerTransaction;
