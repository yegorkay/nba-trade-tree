import _ from "lodash";
import $ from "cheerio";
import { getTeamsInString } from './getTeamsInString';
import { getPlayerId } from './getPlayerId';
import { splitTradeString } from './splitTradeString';
import { getPlayersMultiTrade } from './getPlayersMultiTrade';
import { IPlayer } from './../models';
import util from 'util';

// These regex consts are used throughout, hence outside of a variable scope
const PLAYER_REGEX: RegExp = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
const ASSET_REGEX: RegExp = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;

/**
 * Formats the data into an array of picks (also drafted players if they exist)
 * @param {*} assetsArray The array of all scraped trade assets 
 * @param {*} teamsInvolved all teams involved in the trade
 * @param {*} index index `[0]` = tradedBy , `[1]` = tradedTo 
 * @return {*} Returns an array of assets
 */
const getAssets = (assetsArray: RegExpMatchArray | null, teamsInvolved: string[], index: number): IPlayer[] => {
  if (assetsArray !== null) {
    return assetsArray.map((asset) => {
      const isDrafted: boolean = asset.includes('(');
      const draftedPlayer: string[] = asset.split('(');
      const getPlayer = (player: string): string => player.replace('was', '').trim();
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
const findPicks = (tradeString: string, teamsInvolved: string[], index: number) => {
  const playerMatch: RegExpMatchArray | null = tradeString.match(PLAYER_REGEX);
  const assetMatch: RegExpMatchArray | null = tradeString.match(ASSET_REGEX);

  const assets: IPlayer[] = getAssets(assetMatch, teamsInvolved, index);

  if (playerMatch !== null) {
    const draftedPlayers: IPlayer[] = getAssets(playerMatch, teamsInvolved, index);
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
export const getPicks = (tradeString: string | null) => {
  if (tradeString !== null) {
    const isMultiTeam: boolean = tradeString.includes('As part of a ');
    const tradePiece: string[] = splitTradeString(tradeString);
    // if multiteam, we split string, otherwise we get teams in string
    const mappedData = tradePiece
      .map((tradeFragment, index) =>
        findPicks(tradeFragment, getTeamsInString(
          isMultiTeam ? tradeFragment : tradeString
        ), index)
      )
      .filter((picksArray) => picksArray.length > 0);
    return _.flatten(mappedData);
  } else {
    return [];
  }
};

const testStr = `<p class="transaction "><strong>June 23, 2011</strong>: As part of a 3-team trade, traded by the <a data-attr-from="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a> with <a href="/players/j/jacksst02.html">Stephen Jackson</a> and <a href="/players/l/livinsh01.html">Shaun Livingston</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/m/maggeco01.html">Corey Maggette</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/f/fredeji01.html">Jimmer Fredette</a> and <a href="/players/s/salmojo01.html">John Salmons</a> to the <a data-attr-to="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a>; the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/b/biyombi01.html">Bismack Biyombo</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; and  the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/u/udrihbe01.html">Beno Udrih</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>.</p>`;
const testStr2 = `<p class="transaction "><strong>February 7, 2019</strong>: As part of a 3-team trade, traded by the <a data-attr-from="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a> to the <a data-attr-to="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a>; the <a data-attr-from="DET" href="/teams/DET/2019.html">Detroit Pistons</a> traded <a href="/players/j/johnsst04.html">Stanley Johnson</a> to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>; the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/m/makerth01.html">Thon Maker</a> to the <a data-attr-to="DET" href="/teams/DET/2019.html">Detroit Pistons</a>; and  the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/s/smithja02.html">Jason Smith</a>, a 2019 2nd round draft pick, a 2020 2nd round draft pick, a 2020 2nd round draft pick and a 2021 2nd round draft pick to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>. (Pick is DEN's 2019 second-round pick, top-55 protected.) (Pick is WAS's 2020 second-round pick.) (Pick is WAS's 2021 second-round pick.)</p>`;
console.log(util.inspect(getPlayersMultiTrade(testStr), false, null, true))