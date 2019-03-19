import _ from 'lodash';
import $ from 'cheerio';
import { getTeamsInString } from './getTeamsInString';
import { getPlayerId } from './getPlayerId';
import { splitTradeString } from './splitTradeString';
import { IPlayer } from './../models';
import { regex } from './../settings';

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
    const tradePiece: string[] = splitTradeString(tradeString);
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

// there are no p tags when we are testing so that's why we were getting issues
// const testStr = `<p class="transaction "><strong>June 23, 2011</strong>: As part of a 3-team trade, traded by the <a data-attr-from="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a> with <a href="/players/j/jacksst02.html">Stephen Jackson</a> and <a href="/players/l/livinsh01.html">Shaun Livingston</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/m/maggeco01.html">Corey Maggette</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; the <a data-attr-from="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a> traded <a href="/players/f/fredeji01.html">Jimmer Fredette</a> and <a href="/players/s/salmojo01.html">John Salmons</a> to the <a data-attr-to="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a>; the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/b/biyombi01.html">Bismack Biyombo</a> to the <a data-attr-to="CHA" href="/teams/CHA/2011.html">Charlotte Bobcats</a>; and  the <a data-attr-from="SAC" href="/teams/SAC/2011.html">Sacramento Kings</a> traded <a href="/players/u/udrihbe01.html">Beno Udrih</a> to the <a data-attr-to="MIL" href="/teams/MIL/2011.html">Milwaukee Bucks</a>.</p>`;
// const testStr2 = `<p class="transaction "><strong>February 7, 2019</strong>: As part of a 3-team trade, traded by the <a data-attr-from="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a> to the <a data-attr-to="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a>; the <a data-attr-from="DET" href="/teams/DET/2019.html">Detroit Pistons</a> traded <a href="/players/j/johnsst04.html">Stanley Johnson</a> to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>; the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/m/makerth01.html">Thon Maker</a> to the <a data-attr-to="DET" href="/teams/DET/2019.html">Detroit Pistons</a>; and  the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/s/smithja02.html">Jason Smith</a>, a 2019 2nd round draft pick, a 2020 2nd round draft pick, a 2020 2nd round draft pick and a 2021 2nd round draft pick to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>. (Pick is DEN's 2019 second-round pick, top-55 protected.) (Pick is WAS's 2020 second-round pick.) (Pick is WAS's 2021 second-round pick.)</p>`;
// const test3 = `<p class="transaction "><strong>August 2, 2005</strong>: As part of a 5-team trade, traded by the <a data-attr-from="BOS" href="/teams/BOS/2006.html">Boston Celtics</a> to the <a data-attr-to="MIA" href="/teams/MIA/2006.html">Miami Heat</a>; the <a data-attr-from="MEM" href="/teams/MEM/2006.html">Memphis Grizzlies</a> traded <a href="/players/e/emmetan01.html">Andre Emmett</a>, <a href="/players/p/poseyja01.html">James Posey</a> and <a href="/players/w/willija02.html">Jason Williams</a> to the <a data-attr-to="MIA" href="/teams/MIA/2006.html">Miami Heat</a>; the <a data-attr-from="MEM" href="/teams/MEM/2006.html">Memphis Grizzlies</a> traded <a href="/players/o/ostergr01.html">Greg Ostertag</a> to the <a data-attr-to="UTA" href="/teams/UTA/2006.html">Utah Jazz</a>; the <a data-attr-from="MIA" href="/teams/MIA/2006.html">Miami Heat</a> traded <a href="/players/m/miralal01.html">Albert Miralles</a>, <a href="/players/w/woodsqy01.html">Qyntel Woods</a>, a 2006 2nd round draft pick (<a href="/players/b/bavcied01.html">Edin Bavcic</a> was later selected) and a 2008 2nd round draft pick (<a href="/players/p/pekovni01.html">Nikola Pekovic</a> was later selected) to the <a data-attr-to="BOS" href="/teams/BOS/2006.html">Boston Celtics</a>; the <a data-attr-from="MIA" href="/teams/MIA/2006.html">Miami Heat</a> traded <a href="/players/j/jonesed02.html">Eddie Jones</a> to the <a data-attr-to="MEM" href="/teams/MEM/2006.html">Memphis Grizzlies</a>; the <a data-attr-from="MIA" href="/teams/MIA/2006.html">Miami Heat</a> traded <a href="/players/b/butlera01.html">Rasual Butler</a> to the <a data-attr-to="NOK" href="/teams/NOK/2006.html">New Orleans/Oklahoma City Hornets</a>; the <a data-attr-from="NOK" href="/teams/NOK/2006.html">New Orleans/Oklahoma City Hornets</a> traded Roberto Duenas to the <a data-attr-to="MIA" href="/teams/MIA/2006.html">Miami Heat</a>; the <a data-attr-from="UTA" href="/teams/UTA/2006.html">Utah Jazz</a> traded <a href="/players/b/borchcu01.html">Curtis Borchardt</a> to the <a data-attr-to="BOS" href="/teams/BOS/2006.html">Boston Celtics</a>; the <a data-attr-from="UTA" href="/teams/UTA/2006.html">Utah Jazz</a> traded <a href="/players/l/lopezra01.html">Raul Lopez</a> to the <a data-attr-to="MEM" href="/teams/MEM/2006.html">Memphis Grizzlies</a>; and  the <a data-attr-from="UTA" href="/teams/UTA/2006.html">Utah Jazz</a> traded <a href="/players/s/snydeki01.html">Kirk Snyder</a> to the <a data-attr-to="NOK" href="/teams/NOK/2006.html">New Orleans/Oklahoma City Hornets</a>.</p>`;
// const test4 = `<p class="transaction "><strong>February 6, 2019</strong>: Traded by the <a data-attr-from="LAC" href="/teams/LAC/2019.html">Los Angeles Clippers</a> with <a href="/players/m/marjabo01.html">Boban Marjanovic</a> and <a href="/players/s/scottmi01.html">Mike Scott</a> to the <a data-attr-to="PHI" href="/teams/PHI/2019.html">Philadelphia 76ers</a> for <a href="/players/c/chandwi01.html">Wilson Chandler</a>, <a href="/players/m/muscami01.html">Mike Muscala</a>, <a href="/players/s/shamela01.html">Landry Shamet</a>, a 2020 1st round draft pick, a 2021 1st round draft pick, a 2021 2nd round draft pick and a 2023 2nd round draft pick. (Pick is top-14 protected.) (Pick is MIA's 2021 1st-round pick.) (Pick is DET's 2021 2nd-round pick.) (Pick is DET's 2023 2nd-round pick.)</p>`;
// const test5 = `<p class="transaction "><strong>October 27, 2012</strong>: Traded by the <a data-attr-from="OKC" href="/teams/OKC/2013.html">Oklahoma City Thunder</a> with <a href="/players/a/aldrico01.html">Cole Aldrich</a>, <a href="/players/c/cookda02.html">Daequan Cook</a> and <a href="/players/h/haywala01.html">Lazar Hayward</a> to the <a data-attr-to="HOU" href="/teams/HOU/2013.html">Houston Rockets</a> for <a href="/players/l/lambje01.html">Jeremy Lamb</a>, <a href="/players/m/martike02.html">Kevin Martin</a>, a 2013 1st round draft pick (<a href="/players/a/adamsst01.html">Steven Adams</a> was later selected), a 2013 2nd round draft pick (<a href="/players/a/abrinal01.html">Alex Abrines</a> was later selected) and a 2014 1st round draft pick (<a href="/players/m/mcgarmi01.html">Mitch McGary</a> was later selected).</p>`;
// console.log(util.inspect(getTradedPlayers(test4, 'LAC', 'PHI'), false, null, true));
// getTradedPlayers(test3)
