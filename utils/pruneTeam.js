const settings = require('../settings');

const { teamNames } = settings;
/**
 * Removes array values that contain team names
 * @param {*} tradeArray The array of all scraped trade assets 
 * @return {*} Returns an array of players
 */
const pruneTeam = (tradeArray) => {
  return tradeArray.filter(
    (tradeTarget) =>
      !teamNames.find((team) => tradeTarget.name === team.teamName)
  );
};

module.exports = pruneTeam;
