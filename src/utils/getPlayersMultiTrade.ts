import $ from 'cheerio';
import _ from "lodash";
import { IPlayer } from './../models';
import { getPlayerId } from './getPlayerId';
import { splitTradeString } from './splitTradeString';
import { getTeamsInString } from './getTeamsInString';
// need to modify splitString so it doesn't filter for non-pick related data

/**
 * Get all players involved in multitrade
 * @param {*} tradeString The string where we will find our players in
 * @return {*} Returns an array of players 
 */
export const getPlayersMultiTrade = (tradeString: string): IPlayer[] => {

  const tradeStrings: string[] = splitTradeString(tradeString, false);
  // Wrap all strings in html wrapper so I can parse the data. First index has a p tag, so we close with p tag
  const wrapInDiv: string[] = tradeStrings.map((str, index) => index !== 0 ? `<div>${str}</div>` : `${str}</p>`)

  const playerData: IPlayer[][] = wrapInDiv.map((htmlNode): IPlayer[] => {
    return $(htmlNode).children('a:not([data-attr-from]):not([data-attr-to])').map((_i: number, ele: CheerioElement) => {
      return {
        name: $(ele).text(),
        playerId: getPlayerId($(ele).attr('href')),
        tradedBy: getTeamsInString(htmlNode)[0],
        tradedTo: getTeamsInString(htmlNode)[1],
      };
    }).get();
  })
  return _.flatten(playerData);
}