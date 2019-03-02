const settings = require('../settings');

const { teamNames } = settings;

const pruneTeam = (tradeArray) => {
  return tradeArray.filter(
    (tradeTarget) =>
      !teamNames.find((team) => tradeTarget.name === team.teamName)
  );
};

module.exports = pruneTeam;
