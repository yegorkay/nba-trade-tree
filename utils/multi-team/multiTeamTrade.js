const _ = require('lodash');
const chunkArrayByElement = require('./chunkArrayByElement');
const splitArray = require('./splitArray');
const prunePlayers = require('./prunePlayers');
const formatMultiTeam = require('./formatMultiTeam');

const multiTeamTrade = (tradedPlayers, tradedBy) => {
  const chunkedValues = chunkArrayByElement(
    splitArray(tradedPlayers, tradedBy),
    'match'
  );
  const tradedToArray = prunePlayers(tradedPlayers);
  return _.flatten(formatMultiTeam(chunkedValues, tradedToArray));
};

module.exports = multiTeamTrade;