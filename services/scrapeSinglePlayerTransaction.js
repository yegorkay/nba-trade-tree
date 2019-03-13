const puppeteer = require('puppeteer');
const $ = require('cheerio');
const utils = require('../utils');

const {
  getAbbr,
  // pruneTeam,
  pruneTradedPlayers,
  getPicks,
  getPlayerId,
  // isCurrentYear,
  // getCurrentDraftPicks,
  isMultiTeam,
  oneToOneTrade,
  multiTeamTrade
} = utils;

const gLeague = 'G-League';

/**
 * @param {*} htmlString (our tradedString)
 * @param {*} index (1 = status, 5 = allTeamsInvolved, 7 = status (multi-team))
 * @return {*} Specified string based on the index you pass. See `param` above
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

  $(selector, html).each(function() {
    const tradeString = $(this).text();
    const isGLeague = tradeString.indexOf(gLeague) !== -1;

    const manyTeamsInvolved = splitTradeString($(this), 5);
    const isMultiTrade = isMultiTeam(manyTeamsInvolved);

    const status = splitTradeString(
      $(this),
      isMultiTrade ? 7 : 1
    ).toLowerCase();
    const isNotTraded = status !== 'traded';

    const transactionDate = $(this)
      .children('strong:nth-child(1)')
      .text();

    const tradedBy = getAbbr(
      $(this)
        .children('strong:first-child + a')
        .text()
    );

    /**
     * we are going to return an array and get the
     * first element since it's cleaner than a
     * ternary if we had a multi team trade
     */
    const tradedTo = getAbbr(
      $(this)
        .children('a[data-attr-to]')
        .map(function() {
          return $(this).text();
        })
        .get()[0]
    );

    const tradedPlayers = $(this)
      .children('a:not(:nth-of-type(-n + 1))')
      .map(function() {
        return {
          name: $(this).text(),
          playerId: getPlayerId($(this).attr('href'))
        };
      })
      .get();

    if (!isGLeague) {
      const tradedPicks = isNotTraded ? [] : getPicks(tradeString);
      // console.log(allTradePieces);
      data.push({
        status,
        transactionDate,
        tradedBy,
        tradedTo: isNotTraded ? '' : tradedTo,
        tradedPlayers: isMultiTrade
          ? multiTeamTrade(tradedPlayers, tradedBy)
          : pruneTradedPlayers(
              oneToOneTrade($(this), tradedBy, tradedTo),
              tradedPicks
            ),
        tradedPicks
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
