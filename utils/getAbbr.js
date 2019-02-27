const settings = require('../settings');

const getAbbr = (teamName) => {
  const { teamNames } = settings;
  const index = teamNames.findIndex((team) => team.teamName === teamName);
  return teamNames[index].teamAbr;
};

module.exports = getAbbr;
