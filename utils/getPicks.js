const _ = require('lodash');
const teamNames = require('../settings/teamNames');

const getAssets = (assetsArray, teamsInvolved, index) => {
  // index [0] = tradedBy , [1] = tradedTo (for 1to1 traded)
  if (assetsArray !== null) {
    return assetsArray.map((asset) => {
      return {
        pick: asset,
        name: '',
        tradedBy: teamsInvolved[index === 0 ? 0 : 1],
        tradedTo: teamsInvolved[index === 0 ? 1 : 0]
      };
    });
  } else {
    return [];
  }
};

const getDraftedPlayers = (playerArray, teamsInvolved, index) => {
  // index [0] = tradedBy , [1] = tradedTo (for 1to1 traded)
  return playerArray.map((playerData) => {
    const playerString = playerData.split('(');
    return {
      pick: playerString[0].trim(),
      name: playerString[1].split('was')[0].trim(),
      tradedBy: teamsInvolved[index === 0 ? 0 : 1],
      tradedTo: teamsInvolved[index === 0 ? 1 : 0]
    };
  });
};

// These regex consts are used throughout, hence outside of a variable scope
const playerRegex = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
const assetRegex = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;

const joinPicks = (tradeString, teamsInvolved, index) => {
  const playerMatch = tradeString.match(playerRegex);
  const assetMatch = tradeString.match(assetRegex);

  const assets = getAssets(assetMatch, teamsInvolved, index);
  if (playerMatch !== null) {
    const draftedPlayers = getDraftedPlayers(playerMatch, teamsInvolved, index);
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
    playerRegex.test(trade) || assetRegex.test(trade);
  return (
    tradeString
      // `to the` for 1to1 trades, `;` for multi team
      .split(isMultiTeam ? ';' : 'to the')
      .map((splitString) => splitString.trim())
      .filter((trade) => (isMultiTeam ? hasAssets(trade) : trade))
  );
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
      teams.push({ abbr: teamNames[i].teamAbr, stringIndex: tradeString.indexOf(team) });
    }
  }

  const compareStringIndex = (a, b) => {
    if (a.stringIndex < b.stringIndex) { return -1 };
    if (a.stringIndex > b.stringIndex) { return 1 };
    return 0;
  }

  return teams.sort(compareStringIndex).map((team) => team.abbr);
};

const getPicks = (tradeString) => {

  const isMultiTeam = tradeString.includes('As part of a ');
  const tradeFragment = splitString(tradeString);
  // if multiteam, we split string, otherwise we get teams in string
  const teamsInvolved = isMultiTeam ? getTeamsInString(tradeFragment) : getTeamsInString(tradeString);
  // console.log(teamsInvolved)
  const mappedData = tradeFragment
    .map((tradeFragment, index) => joinPicks(tradeFragment, teamsInvolved, index))
    .filter((picksArray) => picksArray.length > 0);
  return _.flatten(mappedData);
};

const test = `July 12, 2013: Traded by the Brooklyn Nets (as a future 2017 1st round draft pick) with Keith Bogans, MarShon Brooks, Kris Humphries, Kris Joseph, Gerald Wallace, a 2014 1st round draft pick (James Young was later selected), a 2016 1st round draft pick (Jaylen Brown was later selected) and a 2018 1st round draft pick (Collin Sexton was later selected) to the Boston Celtics for Kevin Garnett, Paul Pierce, Jason Terry, D.J. White, a 2017 1st round draft pick (Kyle Kuzma was later selected) and a 2017 2nd round draft pick (Aleksandar Vezenkov was later selected). (BOS got 2017 #1 overall pick from BRK as result of pick swap)`;
const test2 = `February 7, 2019: As part of a 3-team trade, traded by the New Orleans Pelicans to the Milwaukee Bucks; the Detroit Pistons traded Stanley Johnson to the New Orleans Pelicans; the Milwaukee Bucks traded Thon Maker to the Detroit Pistons; and the Milwaukee Bucks traded Jason Smith, a 2019 2nd round draft pick, a 2020 2nd round draft pick, a 2020 2nd round draft pick and a 2021 2nd round draft pick to the New Orleans Pelicans. (Pick is DEN's 2019 second-round pick, top-55 protected.) (Pick is WAS's 2020 second-round pick.) (Pick is WAS's 2021 second-round pick.)`;
const ay = `February 6, 2019: Traded by the Los Angeles Clippers with Boban Marjanovic and Mike Scott to the Philadelphia 76ers for Wilson Chandler, Mike Muscala, Landry Shamet, a 2020 1st round draft pick, a 2021 1st round draft pick, a 2021 2nd round draft pick and a 2023 2nd round draft pick. (Pick is top-14 protected.) (Pick is MIA's 2021 1st-round pick.) (Pick is DET's 2021 2nd-round pick.) (Pick is DET's 2023 2nd-round pick.)`;

// this is returning incorrect tradeBy/tradedTo
const hard = `October 27, 2012: Traded by the Oklahoma City Thunder with Cole Aldrich, Daequan Cook and Lazar Hayward to the Houston Rockets for Jeremy Lamb, Kevin Martin, a 2013 1st round draft pick (Steven Adams was later selected), a 2013 2nd round draft pick (Alex Abrines was later selected) and a 2014 1st round draft pick (Mitch McGary was later selected).`;
const kawhi = `July 18, 2018: Traded by the San Antonio Spurs with Danny Green and cash to the Toronto Raptors for DeMar DeRozan, Jakob Poeltl and a 2019 1st round draft pick. (2019 1st-rd pick is top-20 protected.) $5MM`;
const toby = `February 6, 2019: Traded by the Los Angeles Clippers with Boban Marjanovic and Mike Scott to the Philadelphia 76ers for Wilson Chandler, Mike Muscala, Landry Shamet, a 2020 1st round draft pick, a 2021 1st round draft pick, a 2021 2nd round draft pick and a 2023 2nd round draft pick. (Pick is top-14 protected.) (Pick is MIA's 2021 1st-round pick.) (Pick is DET's 2021 2nd-round pick.) (Pick is DET's 2023 2nd-round pick.)`;
const toby2 = `January 29, 2018: Traded by the Detroit Pistons with Avery Bradley, Boban Marjanovic, a 2018 1st round draft pick (Miles Bridges was later selected) and a 2019 2nd round draft pick to the Los Angeles Clippers for Blake Griffin, Brice Johnson and Willie Reed.`;

const alphaTest = `Traded by the Phoenix Suns to the Denver Nuggets`

console.log(getPicks(kawhi))

module.exports = getPicks;
