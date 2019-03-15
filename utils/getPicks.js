const _ = require('lodash');
const $ = require('cheerio');
const teamNames = require('../settings/teamNames');
const getPlayerId = require('./getPlayerId');

// These regex consts are used throughout, hence outside of a variable scope
const PLAYER_REGEX = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
const ASSET_REGEX = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;

/**
 * Formats the data into an array of picks (also drafted players if they exist)
 * @param {*} assetsArray The array of all scraped trade assets 
 * @param {*} teamsInvolved all teams involved in the trade
 * @param {*} index index `[0]` = tradedBy , `[1]` = tradedTo 
 * @return {*} Returns an array of assets
 */
const getAssets = (assetsArray, teamsInvolved, index) => {
  if (assetsArray !== null) {
    return assetsArray.map((asset) => {
      const isDrafted = asset.includes('(');
      const draftedPlayer = asset.split('(');
      const getPlayer = (player) => player.replace('was', '').trim();
      return {
        name: isDrafted ? $(getPlayer(draftedPlayer[1])).text() : '',
        playerId: isDrafted
          ? getPlayerId($(getPlayer(draftedPlayer[1])).attr('href'))
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

/**
 * Gets all picks for each `tradeString`
 * @param {*} tradeString The string we are finding our picks in
 * @param {*} teamsInvolved The teams involved for our picks
 * @param {*} index index `[0]` = tradedBy , `[1]` = tradedTo 
 * @return {*} Returns all picks for each `tradeString` fragment (see `getPicks`)
 */
const findPicks = (tradeString, teamsInvolved, index) => {
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

/**
 * Splits the trade string into two pieces (`[0]` = tradedBy, `[1]` = tradedTo)
 * @param {*} tradeString The string we are splitting
 * @return {*} Returns an array of strings `(length === 2)`
 */
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
/**
 * Sorts array of teams by `stringIndex` property
 * @param {*} a First element
 * @param {*} b Second element
 * @return {*} Returns sorted array of teams
 */
const compareStringIndex = (a, b) => {
  if (a.stringIndex < b.stringIndex) {
    return -1;
  }
  if (a.stringIndex > b.stringIndex) {
    return 1;
  }
  return 0;
};

/**
 * Finds all existing teams in a string, and returns the array of teams in order of appearance
 * @param {*} tradeString The string where we will find our teams in
 * @return {*} Returns an array of teams 
 */
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

/**
 * Get all picks with correct object values
 * @param {*} tradeString The string where we will find our picks in
 * @return {*} Returns an array of picks 
 */
const getPicks = (tradeString) => {
  const isMultiTeam = tradeString.includes('As part of a ');
  const tradePiece = splitString(tradeString);
  // if multiteam, we split string, otherwise we get teams in string
  const teamsInvolved = getTeamsInString(
    isMultiTeam ? tradePiece : tradeString
  );

  const mappedData = tradePiece
    .map((tradeFragment, index) =>
      findPicks(tradeFragment, teamsInvolved, index)
    )
    .filter((picksArray) => picksArray.length > 0);
  return _.flatten(mappedData);
};

module.exports = getPicks;
