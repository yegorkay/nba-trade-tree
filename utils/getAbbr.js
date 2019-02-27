const settings = require('../settings');

const getAbbr = (teamName) => {
  if (teamName !== '') {
    const { teamNames } = settings;
    const index = teamNames.findIndex((team) => team.teamName === teamName);
    return teamNames[index].teamAbr;
  } else {
    return '';
  }
};

module.exports = getAbbr;
