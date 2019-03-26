import { regex } from '../settings';

/**
 * Splits the trade string into two pieces (`[0]` = tradedBy, `[1]` = tradedTo)
 * @param {*} tradeString The string we are splitting
 * @param {*} forAssets Splitting and filtering by draft picks (default `true`)
 * @return {*} Returns an array of strings `(length === 2)`
 */
export const splitTradeString = (
  tradeString: string,
  forAssets: boolean = true
): string[] => {
  const { PLAYER_REGEX, ASSET_REGEX } = regex;

  const isMultiTeam = tradeString.includes('As part of a');
  const hasAssets = (trade: string): boolean =>
    PLAYER_REGEX.test(trade) || ASSET_REGEX.test(trade);

  const stringData = tradeString
    // `to the` for 1to1 trades, `;` for multi team
    .split(isMultiTeam ? ';' : 'to the')
    .map((splitString) => splitString.trim());
  return forAssets
    ? stringData.filter((trade) => (isMultiTeam ? hasAssets(trade) : trade))
    : stringData;
};
