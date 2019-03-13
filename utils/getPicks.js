const _ = require('lodash');
const teamNames = require('../settings/teamNames');

const getAssets = (assetsArray, teamsInvolved) => {
  if (assetsArray !== null) {
    return assetsArray.map((asset) => {
      return {
        pick: asset,
        name: '',
        tradedBy: teamsInvolved[0],
        tradedTo: teamsInvolved[1]
      };
    });
  } else {
    return [];
  }
};

const getDraftedPlayers = (playerArray, teamsInvolved) => {
  return playerArray.map((playerData) => {
    const playerString = playerData.split('(');
    return {
      pick: playerString[0].trim(),
      name: playerString[1].split('was')[0].trim(),
      tradedBy: teamsInvolved[0],
      tradedTo: teamsInvolved[1]
    };
  });
};

// These regex consts are used throughout, hence outside of a variable scope
const playerRegex = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
const assetRegex = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;

const joinPicks = (tradeString, teamsInvolved) => {
  const playerMatch = tradeString.match(playerRegex);
  const assetMatch = tradeString.match(assetRegex);

  const assets = getAssets(assetMatch, teamsInvolved);

  if (playerMatch !== null) {
    const draftedPlayers = getDraftedPlayers(playerMatch, teamsInvolved);
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

const getTeamsInString = (tradeString) => {
  let teams = [];
  for (let i = 0; i < teamNames.length; i++) {
    const team = teamNames[i].teamName;
    if (new RegExp(`\\b${team}\\b`, 'g').test(tradeString)) {
      teams.push(teamNames[i].teamAbr);
    }
  }
  return teams;
};

const allPicks = (tradeString) => {
  const teamsInvolved = getTeamsInString(tradeString);
  const mappedData = splitString(tradeString)
    .map((tradeFragment) => joinPicks(tradeFragment, teamsInvolved))
    .filter((picksArray) => picksArray.length > 0);

  return _.flatten(mappedData);
};

module.exports = allPicks;
