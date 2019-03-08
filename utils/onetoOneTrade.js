const $ = require('cheerio');
const getAbbr = require('./getAbbr');
const getPlayerId = require('./getPlayerId');
/** Returns proper array where correct tradedTo and tradedBy values are assigned  */

const getPlayerObj = (data, tradedBy, tradedTo, isFirstHalf = true) => {
  return data
    .map(function() {
      return {
        name: $(this).text(),
        playerId: getPlayerId($(this).attr('href')),
        tradedBy: getAbbr(isFirstHalf ? tradedBy : tradedTo),
        tradedTo: getAbbr(isFirstHalf ? tradedTo : tradedBy)
      };
    })
    .get();
};

// const testHtml = `<p class="transaction "><strong>February 6, 2019</strong>: Traded by the <a data-attr-from="LAC" href="/teams/LAC/2019.html">Los Angeles Clippers</a> with <a href="/players/m/marjabo01.html">Boban Marjanovic</a> and <a href="/players/s/scottmi01.html">Mike Scott</a> to the <a data-attr-to="PHI" href="/teams/PHI/2019.html">Philadelphia 76ers</a> for <a href="/players/c/chandwi01.html">Wilson Chandler</a>, <a href="/players/m/muscami01.html">Mike Muscala</a>, <a href="/players/s/shamela01.html">Landry Shamet</a>, a 2020 1st round draft pick, a 2021 1st round draft pick, a 2021 2nd round draft pick and a 2023 2nd round draft pick. (Pick is top-14 protected.) (Pick is MIA's 2021 1st-round pick.) (Pick is DET's 2021 2nd-round pick.) (Pick is DET's 2023 2nd-round pick.)</p>`;
const testHtml = `<p class="transaction "><strong>February 16, 2016</strong>: Traded by the <a data-attr-from="ORL" href="/teams/ORL/2016.html">Orlando Magic</a> to the <a data-attr-to="DET" href="/teams/DET/2016.html">Detroit Pistons</a> for <a href="/players/i/ilyaser01.html">Ersan Ilyasova</a> and <a href="/players/j/jennibr01.html">Brandon Jennings</a>.</p>`;
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
// console.log(
//   oneToOneTrade($(testHtml), 'Los Angeles Clippers', 'Philadelphia 76ers')
// );
// console.log(oneToOneTrade($(testHtml), 'Orlando Magic', 'Detroit Pistons'));

module.exports = oneToOneTrade;
