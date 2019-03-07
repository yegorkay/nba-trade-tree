const $ = require('cheerio');
const getAbbr = require('./getAbbr');
const getPlayerId = require('./getPlayerId');
/** Returns proper array where correct tradedTo and tradedBy values are assigned  */

const testHtml = `<p class="transaction "><strong>February 6, 2019</strong>: Traded by the <a data-attr-from="LAC" href="/teams/LAC/2019.html">Los Angeles Clippers</a> with <a href="/players/m/marjabo01.html">Boban Marjanovic</a> and <a href="/players/s/scottmi01.html">Mike Scott</a> to the <a data-attr-to="PHI" href="/teams/PHI/2019.html">Philadelphia 76ers</a> for <a href="/players/c/chandwi01.html">Wilson Chandler</a>, <a href="/players/m/muscami01.html">Mike Muscala</a>, <a href="/players/s/shamela01.html">Landry Shamet</a>, a 2020 1st round draft pick, a 2021 1st round draft pick, a 2021 2nd round draft pick and a 2023 2nd round draft pick. (Pick is top-14 protected.) (Pick is MIA's 2021 1st-round pick.) (Pick is DET's 2021 2nd-round pick.) (Pick is DET's 2023 2nd-round pick.)</p>`;

const oneToOneTrade = (tradeString, tradedBy, tradedTo) => {

  const firstHalf = tradeString.children('strong:first-child + a:first-of-type').nextUntil('a[data-attr-to]').map(function () {
    return {
      name: $(this).text(),
      playerId: getPlayerId($(this).attr('href')),
      tradedBy: getAbbr(tradedBy),
      tradedTo: getAbbr(tradedTo)
    };
  })
    .get();

  const secondHalf = tradeString.children('a[data-attr-to]').nextAll().map(function () {
    return {
      name: $(this).text(),
      playerId: getPlayerId($(this).attr('href')),
      tradedBy: getAbbr(tradedTo),
      tradedTo: getAbbr(tradedBy)
    };
  })
    .get();

  return firstHalf.concat(secondHalf)

}

console.log(oneToOneTrade($(testHtml), 'Los Angeles Clippers', 'Philadelphia 76ers'))

module.exports = oneToOneTrade;