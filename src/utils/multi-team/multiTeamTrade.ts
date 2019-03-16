import { IPlayer } from './../../models';
import _ from 'lodash';
import { chunkArrayByElement } from './chunkArrayByElement';
import { splitArray } from './splitArray';
import { prunePlayers } from './prunePlayers';
import { formatMultiTeam } from './formatMultiTeam';
// interface IAllTradeValues {
//   name: string;
//   playerId: string;
// }

interface ITradedPlayers {
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
export const multiTeamTrade = (
  tradedPlayers: ITradedPlayers[],
  tradedBy: string
) => {
  const chunkedValues: any = chunkArrayByElement(
    splitArray(tradedPlayers, tradedBy),
    'match'
  );
  const tradedToArray = prunePlayers(tradedPlayers);
  return _.flatten(formatMultiTeam(chunkedValues, tradedToArray));
};
