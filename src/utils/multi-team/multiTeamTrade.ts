import _ from "lodash";
const chunkArrayByElement = require('./chunkArrayByElement');
const splitArray = require('./splitArray');
const prunePlayers = require('./prunePlayers');
const formatMultiTeam = require('./formatMultiTeam');

interface IAllTradeValues {
  name: string;
  playerId: string;
}

/**
 * **multi-team:** Returns an array of players who were involved 
 * in a multi-team trade (more than 2 trade partners)
 * @param {*} tradedPlayers The array of players
 * @param {*} tradedBy The team the original player was traded by
 * @return Returns a flattened array of all players traded in a transaction
 */
export const multiTeamTrade = (tradedPlayers: IAllTradeValues[], tradedBy: string) => {
  const chunkedValues = chunkArrayByElement(
    splitArray(tradedPlayers, tradedBy),
    'match'
  );
  const tradedToArray = prunePlayers(tradedPlayers);
  return _.flatten(formatMultiTeam(chunkedValues, tradedToArray));
};