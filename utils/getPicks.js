const _ = require('lodash');
const $ = require('cheerio');
const teamNames = require('../settings/teamNames');
const getPlayerId = require('./getPlayerId');

// These regex consts are used throughout, hence outside of a variable scope
const PLAYER_REGEX = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
const ASSET_REGEX = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;

const getAssets = (assetsArray, teamsInvolved, index) => {
  // index [0] = tradedBy , [1] = tradedTo (for 1to1 traded)
  if (assetsArray !== null) {
    return assetsArray.map((asset) => {
      const isDrafted = asset.includes('(');
      const draftedPlayer = asset.split('(');
      return {
        name: isDrafted
          ? $(draftedPlayer[1].replace('was', '').trim()).text()
          : '',
        playerId: isDrafted
          ? getPlayerId(
              $(draftedPlayer[1].replace('was', '').trim()).attr('href')
            )
          : '',
        tradedBy: teamsInvolved[index === 0 ? 0 : 1],
        tradedTo: teamsInvolved[index === 0 ? 1 : 0],
        pick: isDrafted ? draftedPlayer[0].trim() : asset
      };
    });
  } else {
    return [];
  }
};

const joinPicks = (tradeString, teamsInvolved, index) => {
  const playerMatch = tradeString.match(PLAYER_REGEX);
  const assetMatch = tradeString.match(ASSET_REGEX);

  const assets = getAssets(assetMatch, teamsInvolved, index);

  if (playerMatch !== null) {
    const draftedPlayers = getAssets(playerMatch, teamsInvolved, index);
    /** `Future` indicates that the player we are searching was drafted. Therefore, we don't want him in this data */
    const undraftedPicks = assets.filter((asset) =>
      draftedPlayers.find(
        (player) => player.pick !== asset.pick && !asset.pick.includes('future')
      )
    );
    return _.unionBy(draftedPlayers, undraftedPicks, 'pick');
  } else {
    // there are no drafted players in the string
    return assets;
  }
};

const splitString = (tradeString) => {
  const isMultiTeam = tradeString.includes('As part of a');
  const hasAssets = (trade) =>
    PLAYER_REGEX.test(trade) || ASSET_REGEX.test(trade);
  return (
    tradeString
      // `to the` for 1to1 trades, `;` for multi team
      .split(isMultiTeam ? ';' : 'to the')
      .map((splitString) => splitString.trim())
      .filter((trade) => (isMultiTeam ? hasAssets(trade) : trade))
  );
};

const compareStringIndex = (a, b) => {
  if (a.stringIndex < b.stringIndex) {
    return -1;
  }
  if (a.stringIndex > b.stringIndex) {
    return 1;
  }
  return 0;
};

// this returns the array in alphabetical order. We want to return it in order of appearance
const getTeamsInString = (tradeString) => {
  let teams = [];
  for (let i = 0; i < teamNames.length; i++) {
    const team = teamNames[i].teamName;
    if (new RegExp(`\\b${team}\\b`, 'g').test(tradeString)) {
      /**
       * might need to optimize this... I am seeing which index is first, sorting the array
       * by index size, then mapping it over to get back the teams I want in order...
       */
      teams.push({
        abbr: teamNames[i].teamAbr,
        stringIndex: tradeString.indexOf(team)
      });
    }
  }

  return teams.sort(compareStringIndex).map((team) => team.abbr);
};

const getPicks = (tradeString) => {
  const isMultiTeam = tradeString.includes('As part of a ');
  const tradePiece = splitString(tradeString);
  // if multiteam, we split string, otherwise we get teams in string
  const teamsInvolved = getTeamsInString(
    isMultiTeam ? tradePiece : tradeString
  );

  const mappedData = tradePiece
    .map((tradeFragment, index) =>
      joinPicks(tradeFragment, teamsInvolved, index)
    )
    .filter((picksArray) => picksArray.length > 0);
  return _.flatten(mappedData);
};

const ay = `January 29, 2018: Traded by the Detroit Pistons with Avery Bradley, Boban Marjanovic, a 2018 1st round draft pick (Miles Bridges was later selected) and a 2019 2nd round draft pick to the Los Angeles Clippers for Blake Griffin, Brice Johnson and Willie Reed.`;
const html = `<p class="transaction "><strong>January 29, 2018</strong>: Traded by the <a data-attr-from="DET" href="/teams/DET/2018.html">Detroit Pistons</a> with <a href="/players/b/bradlav01.html">Avery Bradley</a>, <a href="/players/m/marjabo01.html">Boban Marjanovic</a>, a 2018 1st round draft pick (<a href="/players/b/bridgmi02.html">Miles Bridges</a> was later selected) and a 2019 2nd round draft pick to the <a data-attr-to="LAC" href="/teams/LAC/2018.html">Los Angeles Clippers</a> for <a href="/players/g/griffbl01.html">Blake Griffin</a>, <a href="/players/j/johnsbr02.html">Brice Johnson</a> and <a href="/players/r/reedwi02.html">Willie Reed</a>.</p>`;
// console.log($('a:contains("Miles Bridges")', html).attr('href'));

const hardHtml = `<p class="transaction "><strong>October 27, 2012</strong>: Traded by the <a data-attr-from="OKC" href="/teams/OKC/2013.html">Oklahoma City Thunder</a> with <a href="/players/a/aldrico01.html">Cole Aldrich</a>, <a href="/players/c/cookda02.html">Daequan Cook</a> and <a href="/players/h/haywala01.html">Lazar Hayward</a> to the <a data-attr-to="HOU" href="/teams/HOU/2013.html">Houston Rockets</a> for <a href="/players/l/lambje01.html">Jeremy Lamb</a>, <a href="/players/m/martike02.html">Kevin Martin</a>, a 2013 1st round draft pick (<a href="/players/a/adamsst01.html">Steven Adams</a> was later selected), a 2013 2nd round draft pick (<a href="/players/a/abrinal01.html">Alex Abrines</a> was later selected) and a 2014 1st round draft pick (<a href="/players/m/mcgarmi01.html">Mitch McGary</a> was later selected).</p>`;
const miro = `<p class="transaction "><strong>February 7, 2019</strong>: As part of a 3-team trade, traded by the <a data-attr-from="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a> to the <a data-attr-to="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a>; the <a data-attr-from="DET" href="/teams/DET/2019.html">Detroit Pistons</a> traded <a href="/players/j/johnsst04.html">Stanley Johnson</a> to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>; the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/m/makerth01.html">Thon Maker</a> to the <a data-attr-to="DET" href="/teams/DET/2019.html">Detroit Pistons</a>; and  the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/s/smithja02.html">Jason Smith</a>, a 2019 2nd round draft pick, a 2020 2nd round draft pick, a 2020 2nd round draft pick and a 2021 2nd round draft pick to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>. (Pick is DEN's 2019 second-round pick, top-55 protected.) (Pick is WAS's 2020 second-round pick.) (Pick is WAS's 2021 second-round pick.)</p>`;

console.log(getPicks(html));

module.exports = getPicks;
