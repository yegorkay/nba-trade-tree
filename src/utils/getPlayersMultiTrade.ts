import $ from 'cheerio';
import _ from "lodash";
import { IPlayer } from './../models';
import { getPlayerId } from './getPlayerId';
import { splitTradeString } from './splitTradeString';
import { getTeamsInString } from './getTeamsInString';

/**
 * Formats the array by removing any drafted assets if they exist
 * @param {*} tradeString The string where we will find our players in
 * @param {*} playerData The data which we are filtering 
 * @return {*} Returns an array of traded players (`NO assets if they exist`)
 */
const formatMultiTrade = (tradeString: string | null, playerData: IPlayer[]) => {

  // TODO get this exported
  const PLAYER_REGEX: RegExp = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;

  /** Null check for our trade string */
  if (tradeString) {

    const draftedAssets: RegExpMatchArray | null = tradeString.match(PLAYER_REGEX);

    /** Null check for our array */
    if (draftedAssets) {
      /** draftedArray returns an array of drafted assets (names) */
      const draftedArray: string[] = draftedAssets.map((player) => $(player).text().split('(')[1].replace('was', '').trim())
      const filteredPlayerData: IPlayer[] = playerData.filter(
        (player) =>
          !draftedArray.find((draftedAsset) => player.name === draftedAsset)
      );
      return filteredPlayerData;
    } else {
      return playerData;
    }
  } else {
    return [];
  }
}

/**
 * Get all players involved in multitrade
 * @param {*} tradeString The string where we will find our players in
 * @return {*} Returns an array of traded players in a multi-team scenario 
 */
export const getPlayersMultiTrade = (tradeString: string | null): IPlayer[] | [] => {
  if (tradeString) {

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

    return formatMultiTrade(tradeString, _.flatten(playerData))

  } else {
    return []
  }
}