const settings = require('../settings');
const $ = require('cheerio');
const _ = require('lodash');

const getAbbr = require('./getAbbr');
const getPlayerId = require('./getPlayerId');

const chunkArrayByElement = require('./multi-team/chunkArrayByElement');
const prunePlayers = require('./multi-team/prunePlayers');
const splitArray = require('./multi-team/splitArray');
const formatMultiTeam = require('./multi-team/formatMultiTeam');
const isMultiTeam = require('./multi-team/isMultiTeam');

const { teamNames } = settings;

const pruneTeam = (tradeArray) => {
  return tradeArray.filter(
    (tradeTarget) =>
      !teamNames.find((team) => tradeTarget.name === team.teamName)
  );
};

// const testHtml = `<p class="transaction "><strong>June 23, 2011</strong>: As part of a 3-team trade, traded by the <a data-attr-from="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a> with <a href="/players/j/jacksst02.html">Stephen Jackson</a> and <a href="/players/l/livinsh01.html">Shaun Livingston</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/m/maggeco01.html">Corey Maggette</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/f/fredeji01.html">Jimmer Fredette</a> and <a href="/players/s/salmojo01.html">John Salmons</a> to the <a data-attr-to="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a>; the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/b/biyombi01.html">Bismack Biyombo</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; and  the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/u/udrihbe01.html">Beno Udrih</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>.</p>`;
const testHtml = `<p class="transaction "><strong>February 6, 2019</strong>: Traded by the <a data-attr-from="LAC" href="/teams/LAC/2019.html">Los Angeles Clippers</a> with <a href="/players/m/marjabo01.html">Boban Marjanovic</a> and <a href="/players/s/scottmi01.html">Mike Scott</a> to the <a data-attr-to="PHI" href="/teams/PHI/2019.html">Philadelphia 76ers</a> for <a href="/players/c/chandwi01.html">Wilson Chandler</a>, <a href="/players/m/muscami01.html">Mike Muscala</a>, <a href="/players/s/shamela01.html">Landry Shamet</a>, a 2020 1st round draft pick, a 2021 1st round draft pick, a 2021 2nd round draft pick and a 2023 2nd round draft pick. (Pick is top-14 protected.) (Pick is MIA's 2021 1st-round pick.) (Pick is DET's 2021 2nd-round pick.) (Pick is DET's 2023 2nd-round pick.)</p>`;
// if tradeString contains teamsInvolved, do this stuff
const getTeamsInvolvedOrStatus = (tradeString, status = true) => {
  return $(tradeString)
    .clone()
    .find('strong:nth-child(1)')
    .remove()
    .end()
    .text()
    .split(' ')[status ? 7 : 5];
};

const teamsInvolved = getTeamsInvolvedOrStatus(testHtml, false);

const status = getTeamsInvolvedOrStatus(testHtml).toLowerCase();

const tradedBy = $(testHtml)
  .children('strong:first-child + a')
  .text();

const transactionDate = $(testHtml)
  .children('strong:nth-child(1)')
  .text();

const tradedTo = $(testHtml)
  .children('a[data-attr-to]')
  .map(function () {
    return $(this).text();
  })
  .get();

const tradedPlayers = $(testHtml)
  .children('a:not(:nth-of-type(-n + 1))')
  .map(function () {
    return {
      name: $(this).text(),
      playerId: getPlayerId($(this).attr('href'))
    };
  })
  .get();

const chunkedValues = chunkArrayByElement(
  splitArray(tradedPlayers, tradedBy),
  'match'
);

const tradedToArray = prunePlayers(tradedPlayers);

// console.log({
//   isMultiTeam: isMultiTeam(teamsInvolved),
//   status,
//   transactionDate,
//   tradedBy: getAbbr(tradedBy),
//   tradedTo: getAbbr(tradedTo[0]),
//   tradedPlayers: _.flatten(formatMultiTeam(chunkedValues, tradedToArray))
// });

module.exports = pruneTeam;
