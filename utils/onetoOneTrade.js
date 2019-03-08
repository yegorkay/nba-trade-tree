const $ = require('cheerio');
const getAbbr = require('./getAbbr');
const getPlayerId = require('./getPlayerId');

const getPlayerObj = (data, tradedBy, tradedTo, isFirstHalf = true) => {
  return data
    .map(function () {
      return {
        name: $(this).text(),
        playerId: getPlayerId($(this).attr('href')),
        tradedBy: getAbbr(isFirstHalf ? tradedBy : tradedTo),
        tradedTo: getAbbr(isFirstHalf ? tradedTo : tradedBy)
      };
    })
    .get();
};

/** Returns proper array where correct tradedTo and tradedBy values are assigned  */
const oneToOneTrade = (tradeString, tradedBy, tradedTo) => {
  const firstHalfData = tradeString
    .children('strong:first-child + a:first-of-type')
    .nextUntil('a[data-attr-to]');

  const secondHalfData = tradeString.children('a[data-attr-to]').nextAll();

  const firstHalf = getPlayerObj(firstHalfData, tradedBy, tradedTo, true);
  const secondHalf = getPlayerObj(secondHalfData, tradedBy, tradedTo, false);

  // WE need to check if data even exists in the first half, otherwise, tradedTo/tradedBy are incorrect

  if (firstHalfData.text().length > 0) {
    return firstHalf.concat(secondHalf);
  } else {
    return secondHalf;
  }
};

module.exports = oneToOneTrade;
