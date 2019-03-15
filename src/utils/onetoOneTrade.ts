import $ from "cheerio";
import { IPlayer } from './../models';
import { getAbbr } from './getAbbr';
import { getPlayerId } from './getPlayerId';
/**
 * Maps over data to get an array of players
 * @param {*} data The data we are mapping
 * @param {*} tradedBy The team our selected player was traded by
 * @param {*} tradedTo The team our selected player was traded to
 * @param {*} isTradedBy A boolean switch that determines whether the player was traded by a team, or for a team
 * @return {*} Returns an array of player objects
 */
const getPlayerObj = (data: Cheerio, tradedBy: string, tradedTo: string, isTradedBy: boolean): IPlayer[] => {
  return $(data)
    .map(function (i, ele) {
      return {
        name: $(ele).text(),
        playerId: getPlayerId($(ele).attr('href')),
        tradedBy: getAbbr(isTradedBy ? tradedBy : tradedTo),
        tradedTo: getAbbr(isTradedBy ? tradedTo : tradedBy)
      };
    })
    .get();
};

/**
 * Get the array of players where correct tradedTo and tradedBy values are assigned
 * @param {*} tradeString The HTML transaction string
 * @param {*} tradedBy The team our selected player was traded by
 * @param {*} tradedTo The team our selected player was traded to
 * @return {*} Returns an array of player objects
 */
export const oneToOneTrade = (tradeString: string, tradedBy: string, tradedTo: string) => {
  const firstHalfData: Cheerio = $(tradeString)
    .children('strong:first-child + a:first-of-type')
    .nextUntil('a[data-attr-to]');

  const secondHalfData: Cheerio = $(tradeString).children('a[data-attr-to]').nextAll();

  const firstHalf: IPlayer[] = getPlayerObj(firstHalfData, tradedBy, tradedTo, true);
  const secondHalf: IPlayer[] = getPlayerObj(secondHalfData, tradedBy, tradedTo, false);

  /**
   * WE need to check if data even exists in the first half,
   * otherwise, tradedTo/tradedBy are incorrect
   */
  if (firstHalfData.text().length > 0) {
    return firstHalf.concat(secondHalf);
  } else {
    return secondHalf;
  }
};