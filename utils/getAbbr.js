const settings = require('../settings');

const getAbbr = (teamName) => {
  if (teamName !== '') {
    const { teamNames } = settings;
    const index = teamNames.findIndex((team) => team.teamName === teamName);
    return index !== -1 ? teamNames[index].teamAbr : teamName;
  } else {
    return '';
  }
};

module.exports = getAbbr;
