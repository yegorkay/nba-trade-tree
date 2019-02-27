const settings = require('../settings');

const { teamNames } = settings;

const pruneTeam = (tradeArray) => {
  let index = 0;
  for (let i = 0; i < teamNames.length; i++) {
    index = tradeArray.indexOf(teamNames[i].teamName);
    if (index > -1) {
      tradeArray.splice(index, 1);
    }
  }
  return tradeArray;
};

module.exports = pruneTeam;
