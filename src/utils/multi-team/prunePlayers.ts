// import { IPlayer } from './../../models/playerModel';
import { teamNames } from './../../settings';

// TODO rename this to something better and export it
interface IAllTradeValues {
  name: string;
  playerId: string;
}
// has same two properties as IPlayer

/**
 * **multi-team:** Removes all players from our array and returns the teams
 * @param {*} tradeArray the array that contains teams and players
 * @return {*} Returns a filtered array where the only values are teams
 */
export const prunePlayers = (tradeArray: IAllTradeValues[]) => {
  return tradeArray
    .filter((tradeTarget) =>
      teamNames.find((team) => tradeTarget.name === team.teamName)
    )
    .filter((_x, i) => i % 2 === 0);
  /** We always have an even amount of teams. A team trading, and a team receiving. Hence the modulus */
};
