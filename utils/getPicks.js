const _ = require('lodash');
const teamNames = require('../settings/teamNames');

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
        pick: isDrafted ? draftedPlayer[0].trim() : asset,
        name: isDrafted ? draftedPlayer[1].replace('was', '').trim() : '',
        tradedBy: teamsInvolved[index === 0 ? 0 : 1],
        tradedTo: teamsInvolved[index === 0 ? 1 : 0]
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
  if (a.stringIndex < b.stringIndex) { return -1 };
  if (a.stringIndex > b.stringIndex) { return 1 };
  return 0;
}

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

  return teams.sort(compareStringIndex).map((team) => team.abbr);
};

const getPicks = (tradeString) => {

  const isMultiTeam = tradeString.includes('As part of a ');
  const tradeFragment = splitString(tradeString);
  // if multiteam, we split string, otherwise we get teams in string
  const teamsInvolved = isMultiTeam ? getTeamsInString(tradeFragment) : getTeamsInString(tradeString);

  const mappedData = tradeFragment
    .map((tradeFragment, index) => joinPicks(tradeFragment, teamsInvolved, index))
    .filter((picksArray) => picksArray.length > 0);
  return _.flatten(mappedData);
};

module.exports = getPicks;
