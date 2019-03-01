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

  $(selector, html).each(function () {
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
      .map(function () {
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


    const matchTest = (str, player) => {
      const regex = new RegExp(`(\\b(19|20)\\d{2}\\b\\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\\s(round draft pick))\\s(\\()(${player})`, 'g');
      const match = str.match(regex);
      return match ? match[0] : '';
    }

    const getPickArray = (playerArray, tradeString) => playerArray.map((player) => {
      const { name, link } = player;
      const draftString = matchTest(tradeString, name).split("(");
      return {
        name: draftString[1],
        link: link,
        pick: draftString[0].trim()
      }
    })

    if (!isGLeague) {
      data.push({
        status,
        transactionDate,
        tradedBy: getAbbr(tradedBy),
        tradedTo: notTraded ? '' : getAbbr(!isGLeague ? tradedTo : ''),
        // tradedFor: mergePlayersAndPicks(tradedFor, assets)
        tradedFor,
        // assets
        assets: getPickArray(tradedFor, tradeString).filter((player) => player.pick !== '')
      });
      /**
       * Need to be able to tie pick to player if they were a pick during the time of the trade
       */
    }
  });

  await browser.close();

  const dateTradedIndex = data.findIndex(
    (date) => date.transactionDate === playerTradeDate
  );

  return data.splice(dateTradedIndex);
};

module.exports = scrapeSinglePlayerTransaction;
