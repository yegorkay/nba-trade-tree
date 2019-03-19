import { IPlayer } from './../models';
/**
 * Removes array values that contain players who were **traded**
 * @param {*} tradedForArray The array of all scraped trade assets
 * @param {*} assetsArray The array of all scraped assets (picks)
 * @return {*} Returns an array of draft picks
 */
export const pruneTradedPlayers = (
  tradedForArray: IPlayer[],
  assetsArray: IPlayer[]
) => {
  return tradedForArray.filter(
    (tradeTarget) =>
      !assetsArray.find(
        (player) =>
          tradeTarget.name === player.name || tradeTarget.name === 'future'
      )
  );
};
