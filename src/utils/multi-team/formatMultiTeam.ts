import { getAbbr } from './../getAbbr';
interface IAllTradeValues {
  name: string;
  playerId: string;
}
/**
 * **multi-team:** Formats the array of arrays of players into the correct object values
 * @param {*} chunkedArray The chunked array of players
 * @param {*} tradedToArray All the teams that the players were traded to
 * @return Returns an array of arrays with all the traded players involved in the transaction
 */

export const formatMultiTeam = (chunkedArray: IAllTradeValues[][], tradedToArray: IAllTradeValues[]) =>
  chunkedArray.map((chunk, index) => {
    return chunk
      .map((tradedPlayers, chunkIndex) => {
        const { name, playerId } = tradedPlayers;
        return (
          chunkIndex !== 0 && {
            name,
            playerId,
            tradedBy: getAbbr(chunk[0].name),
            tradedTo: getAbbr(tradedToArray[index].name)
          }
        );
      })
      .filter((val) => typeof val !== 'boolean');
    // filtering by boolean because if the chunkIndex !== 0, then it will return false
  });