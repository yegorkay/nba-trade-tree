const settings = require('../../settings');

const { teamNames } = settings;

/** Removes players and we are left with an array of teams */
const prunePlayers = (tradeArray) => {
  return tradeArray
    .filter((tradeTarget) =>
      teamNames.find((team) => tradeTarget.name === team.teamName)
    )
    .filter((x, i) => i % 2 === 0);
  /** We always have an even amount of teams. A team trading, and a team receiving. Hence the modulus */
};

module.exports = prunePlayers;
