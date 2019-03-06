const settings = require('../settings');
const $ = require('cheerio');
const _ = require('lodash');
const getAbbr = require('./getAbbr');
const getPlayerId = require('./getPlayerId');

const { teamNames } = settings;

const pruneTeam = (tradeArray) => {
  return tradeArray.filter(
    (tradeTarget) =>
      !teamNames.find((team) => tradeTarget.name === team.teamName)
  );
};

const testHtml = `<p class="transaction "><strong>June 23, 2011</strong>: As part of a 3-team trade, traded by the <a data-attr-from="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a> with <a href="/players/j/jacksst02.html">Stephen Jackson</a> and <a href="/players/l/livinsh01.html">Shaun Livingston</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/m/maggeco01.html">Corey Maggette</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/f/fredeji01.html">Jimmer Fredette</a> and <a href="/players/s/salmojo01.html">John Salmons</a> to the <a data-attr-to="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a>; the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/b/biyombi01.html">Bismack Biyombo</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; and  the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/u/udrihbe01.html">Beno Udrih</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>.</p>`;
// if tradeString contains teamsInvolved, do this stuff
const teamsInvolved = $(testHtml)
  .clone()
  .find('strong:nth-child(1)')
  .remove()
  .end()
  .text()
  .split(' ')[5];

/** i.e. if string contains "3-team" */
// const isMultiTeam = /([3-9]|[12][0-9]|30)/g.test(teamsInvolved);
// console.log({ isMultiTeam })

const tradePartners = $(testHtml)
  .children('a[data-attr-to]')
  .map(function () {
    return getAbbr($(this).text());
  })
  .get();

const tradedBy = /*getAbbr(*/
  $(testHtml)
    .children('strong:first-child + a')
    .text()
/*);*/

const tradedPlayers = $(testHtml)
  .children('a:not(:nth-of-type(-n + 1))')
  .map(function () {
    return {
      name: $(this).text(),
      playerId: getPlayerId($(this).attr('href'))
    };
  })
  .get();

// console.log({
//   teamsInvolved,
//   tradedBy,
//   tradePartners: _.uniq(tradePartners),
//   // tradedPlayers: pruneTeam(tradedPlayers),
//   allValues
// });

/**
 * * [ 'Stephen Jackson', 'Shaun Livingston' ]
 * ! [ 'Corey Maggette' ]
 * ! [ 'Jimmer Freddete', 'John Salmons' ]
 * ! [ 'Bismack Biyombo' ]
 * * [ 'Beno Udrih' ] 
 */

const tradedByLoop = () => {
  let arr = [];
  for (i = 0; i < tradedPlayers.length - 1; i++) {

    const prevNextIdsMatch = tradedPlayers[i].playerId === tradedPlayers[i + 1].playerId;
    // The first team chunk is always implicitly tied to the player we are scraping
    if (i === 0) {
      arr.push({ name: tradedBy })
    }
    if (!prevNextIdsMatch) {
      arr.push(tradedPlayers[i])
    } else {
      arr.push("match");
    }
  }
  return arr;
}

const chunk = (arr, c) => {
  return arr.reduce((m, o) => {
    if (o === c) {
      m.push([]);
    } else {
      m[m.length - 1].push(o);
    }
    return m;
  }, [[]]).filter((array) => array.length > 0);
}

const chunkedValues = chunk(tradedByLoop(), 'match');

const prunePlayers = (tradeArray) => {
  return tradeArray.filter(
    (tradeTarget) =>
      teamNames.find((team) => tradeTarget.name === team.teamName)
  );
};

// there will always be an even amount of teams. A team that is trading, one that is receiving
const tradedToArray = prunePlayers(tradedPlayers).filter((x, i) => i % 2 === 0);

const mapToFormat = (array) => array.map((chunk, index) => {
  return chunk.map((tradedPlayers, chunkIndex) => {
    const { name, playerId } = tradedPlayers
    return chunkIndex !== 0 && {
      name,
      playerId,
      tradedBy: getAbbr(chunk[0].name),
      tradedTo: getAbbr(tradedToArray[index].name)
    };
  }).filter((val) => typeof val !== "boolean")
})

const flatten = (arr) => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

console.log(flatten(mapToFormat(chunkedValues)))

module.exports = pruneTeam;
