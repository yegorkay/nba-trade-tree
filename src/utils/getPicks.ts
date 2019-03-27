import _ from 'lodash';
import $ from 'cheerio';
import { splitTradeString, getPlayerId, getTeamsInString } from '../utils';
import { IPlayer } from '../models';
import { regex } from '../settings';

/**
 * Formats the data into an array of picks (also drafted players if they exist)
 * @param {*} assetsArray The array of all scraped trade assets
 * @param {*} teamsInvolved all teams involved in the trade
 * @param {*} index index `[0]` = tradedBy , `[1]` = tradedTo
 * @return {*} Returns an array of assets
 */
const getAssets = (
  assetsArray: RegExpMatchArray | null,
  teamsInvolved: string[],
  index: number
): IPlayer[] => {
  if (assetsArray !== null) {
    return assetsArray.map((asset) => {
      const isDrafted: boolean = asset.includes('(');
      const draftedPlayer: string[] = asset.split('(');
      const getPlayer = (player: string): string =>
        player.replace('was', '').trim();
      return {
        name: isDrafted ? $(getPlayer(draftedPlayer[1])).text() : '',
        playerId: isDrafted
          ? getPlayerId($(getPlayer(draftedPlayer[1])).attr('href'))
          : '',
        tradedBy: teamsInvolved[index === 0 ? 0 : 1],
        tradedTo: teamsInvolved[index === 0 ? 1 : 0],
        pick: isDrafted ? draftedPlayer[0].trim() : asset
      };
    });
  } else {
    return [];
  }
};

/**
 * Gets all picks for each `tradeString`
 * @param {*} tradeString The string we are finding our picks in
 * @param {*} teamsInvolved The teams involved for our picks
 * @param {*} index index `[0]` = tradedBy , `[1]` = tradedTo
 * @return {*} Returns all picks for each `tradeString` fragment (see `getPicks`)
 */
const findPicks = (
  tradeString: string,
  teamsInvolved: string[],
  index: number
): IPlayer[] => {

  const { PLAYER_REGEX, ASSET_REGEX } = regex;

  const playerMatch: RegExpMatchArray | null = tradeString.match(PLAYER_REGEX);
  const assetMatch: RegExpMatchArray | null = tradeString.match(ASSET_REGEX);

  const assets: IPlayer[] = getAssets(assetMatch, teamsInvolved, index);

  if (playerMatch !== null) {
    const draftedPlayers: IPlayer[] = getAssets(
      playerMatch,
      teamsInvolved,
      index
    );
    /** `Future` indicates that the player we are searching was drafted. Therefore, we don't want him in this data */
    const undraftedPicks: IPlayer[] = assets.filter((asset) =>
      draftedPlayers.find(
        (player) => player.pick !== asset.pick && !asset.pick.includes('future')
      )
    );
    return _.unionBy(draftedPlayers, undraftedPicks, 'pick');
  } else {
    // there are no drafted players in the string
    return assets;
  }
};

/**
 * Get all picks with correct object values
 * @param {*} tradeString The string where we will find our picks in
 * @return {*} Returns an array of picks
 */
export const getPicks = (tradeString: string | null): IPlayer[] => {
  if (tradeString !== null) {
    const isMultiTeam: boolean = tradeString.includes('As part of a ');
    // remove <strong /> tag which breaks getting picks that contain "future"
    const tradePiece: string[] = splitTradeString(tradeString.replace(regex.STRONG_TAG_REGEX, ''));
    // if multiteam, we split string, otherwise we get teams in string
    const mappedData = tradePiece
      .map((tradeFragment, index) =>
        findPicks(
          tradeFragment,
          getTeamsInString(isMultiTeam ? tradeFragment : tradeString),
          index
        )
      )
      .filter((picksArray) => picksArray.length > 0);
    return _.flatten(mappedData);
  } else {
    return [];
  }
};