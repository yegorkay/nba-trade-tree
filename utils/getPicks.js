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
  // console.log(index)
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

const getPicks = (tradeString) => {
  const teamsInvolved = getTeamsInString(tradeString);
  const mappedData = splitString(tradeString)
    .map((tradeFragment, index) => joinPicks(tradeFragment, teamsInvolved, index))
    .filter((picksArray) => picksArray.length > 0);

  return _.flatten(mappedData);
};

module.exports = getPicks;
