const puppeteer = require('puppeteer');
const $ = require('cheerio');
const _ = require('lodash');
const utils = require('../utils');

const {
  getAbbr,
  pruneTeam,
  pruneTradedPlayers,
  filterByPicks,
  getPlayerId,
  isCurrentYear,
  fetchCurrentDraftPicks,
  isMultiTeam,
  chunkArrayByElement,
  splitArray,
  prunePlayers,
  formatMultiTeam
} = utils;

const gLeague = 'G-League';

/**
 * @param {*} htmlString (our tradedString)
 * @param {*} index (1 = status, 5 = allTeamsInvolved, 7 = status (multi-team))
 * @return {*} string
 */
const splitTradeString = (htmlString, index) => {
  return htmlString
    .clone()
    .find('strong:nth-child(1)')
    .remove()
    .end()
    .text()
    .split(' ')[index];
};

const scrapeSinglePlayerTransaction = async (playerUrl, playerTradeDate) => {
  let data = [];
  const selector = '#div_transactions p';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(playerUrl);
  const html = await page.content();

  $(selector, html).each(function () {

    const tradeString = $(this).text();
    const isGLeague = tradeString.indexOf(gLeague) !== -1;

    const allTeamsInvolved = splitTradeString($(this), 5);
    const isMultiTrade = isMultiTeam(allTeamsInvolved);

    const status = splitTradeString($(this), isMultiTrade ? 7 : 1).toLowerCase();
    const isNotTraded = status !== 'traded';

    const transactionDate = $(this)
      .children('strong:nth-child(1)')
      .text();

    const tradedBy = $(this)
      .children('strong:first-child + a')
      .text();

    // this is the first issue we encounter when we have a multi team trade. It returns a string it cannot parse
    // we are going to return an array and get the first element since it's cleaner than a ternary

    const tradedTo = $(this)
      .children('a[data-attr-to]')
      .map(function () {
        return $(this).text();
      })
      .get()[0];

    const tradedPlayers = $(this)
      .children('a:not(:nth-of-type(-n + 1))')
      .map(function () {

        const playerData = {
          name: $(this).text(),
          playerId: getPlayerId($(this).attr('href')),
        }
        // ! tradedTo is incorrect if more than one player is involved in 1 to 1 team trades
        return isMultiTrade
          ? playerData
          : Object.assign(playerData, { tradedTo: isNotTraded ? '' : getAbbr(!isGLeague ? tradedBy : '') })
      })
      .get();

    const allTradePieces = isNotTraded ? [] : pruneTeam(tradedPlayers);

    const isMultiTeamTradedPlayers = () => {
      const chunkedValues = chunkArrayByElement(
        splitArray(tradedPlayers, tradedBy),
        'match'
      );
      const tradedToArray = prunePlayers(tradedPlayers);
      return _.flatten(formatMultiTeam(chunkedValues, tradedToArray))
    }


    if (!isGLeague) {

      const tradedPicks = isNotTraded
        ? []
        : filterByPicks(allTradePieces, tradeString, getAbbr(tradedTo));

      data.push({
        status,
        transactionDate,
        tradedBy: getAbbr(tradedBy),
        tradedTo: isNotTraded ? '' : getAbbr(tradedTo),
        tradedPlayers: isMultiTeam ? isMultiTeamTradedPlayers() : pruneTradedPlayers(allTradePieces, tradedPicks),
        tradedPicks: !isCurrentYear(transactionDate)
          ? tradedPicks
          : fetchCurrentDraftPicks(tradeString, transactionDate)
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
