const settings = require('../../settings');

const { teamNames } = settings;

/**
 * **multi-team:** Removes all players from our array and returns the teams
 * @param {*} tradeArray the array that contains teams and players
 * @return {*} Returns a filtered array where the only values are teams
 */
const prunePlayers = (tradeArray) => {
  return tradeArray
    .filter((tradeTarget) =>
      teamNames.find((team) => tradeTarget.name === team.teamName)
    )
    .filter((x, i) => i % 2 === 0);
  /** We always have an even amount of teams. A team trading, and a team receiving. Hence the modulus */
};

module.exports = prunePlayers;
