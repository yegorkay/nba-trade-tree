const settings = require('../settings');

/**
 * Get the  `abbreviation` for a `team name`
 * @param teamName The team name to convert to an abbreviation.
 * @return Returns abbreviation `("Toronto Raptors" => "TOR")`
 */
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
