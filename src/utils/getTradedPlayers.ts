import $ from 'cheerio';
import _ from 'lodash';
import { IPlayer } from './../models';
import { regex } from './../settings';
import { getPlayerId } from './getPlayerId';
import { splitTradeString } from './splitTradeString';
import { getTeamsInString } from './getTeamsInString';

/**
 * Formats the array by removing any drafted assets if they exist
 * @param {*} tradeString The string where we will find our players in
 * @param {*} playerData The data which we are filtering
 * @return {*} Returns an array of traded players (`NO assets if they exist`)
 */
const formatMultiTrade = (
  tradeString: string | null,
  playerData: IPlayer[]
) => {
  const { PLAYER_REGEX } = regex;
  /** Null check for our trade string */
  if (tradeString) {
    const draftedAssets: RegExpMatchArray | null = tradeString.match(
      PLAYER_REGEX
    );

    /** Null check for our array */
    if (draftedAssets) {
      /** draftedArray returns an array of drafted assets (names) */
      const draftedArray: string[] = draftedAssets.map((player) =>
        $(player)
          .text()
          .split('(')[1]
          .replace('was', '')
          .trim()
      );
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
};

/**
 * Get all players involved in a trade
 * @param {*} tradeString The string where we will find our players in
 * @param {*} tradedTo The team players are traded to
 * @param {*} tradedBy The team players are traded by
 * @return {*} Returns an array of traded players in a multi-team scenario
 */
export const getTradedPlayers = (
  tradeString: string | null,
  tradedBy: string,
  tradedTo: string
): IPlayer[] | [] => {
  if (tradeString) {
    const isMultiTeam = tradeString.includes('As part of a ');
    const tradeStrings: string[] = splitTradeString(tradeString, false);
    // Wrap all strings in html wrapper so I can parse the data.
    const wrapInDiv: string[] = tradeStrings.map((str) => `<div>${str}</div>`);

    const playerData: IPlayer[][] = wrapInDiv.map(
      (htmlNode, nodeIndex): IPlayer[] => {
        return $(htmlNode)
          .children('a:not([data-attr-from]):not([data-attr-to])')
          .map((_i: number, ele: CheerioElement) => {
            return {
              name: $(ele).text(),
              playerId: getPlayerId($(ele).attr('href')),
              tradedBy: isMultiTeam
                ? getTeamsInString(htmlNode)[0]
                : nodeIndex === 0
                  ? tradedBy
                  : tradedTo,
              tradedTo: isMultiTeam
                ? getTeamsInString(htmlNode)[1]
                : nodeIndex === 1
                  ? tradedBy
                  : tradedTo
            };
          })
          .get();
      }
    );

    return formatMultiTrade(tradeString, _.flatten(playerData));
  } else {
    return [];
  }
};
