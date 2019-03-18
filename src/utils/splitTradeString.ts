
// These regex consts are used throughout, hence outside of a variable scope
const PLAYER_REGEX: RegExp = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
const ASSET_REGEX: RegExp = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;
/**
 * Splits the trade string into two pieces (`[0]` = tradedBy, `[1]` = tradedTo)
 * @param {*} tradeString The string we are splitting
 * @param {*} forAssets Splitting and filtering by draft picks (default `true`)
 * @return {*} Returns an array of strings `(length === 2)`
 */
export const splitTradeString = (tradeString: string, forAssets: boolean = true) => {
  const isMultiTeam = tradeString.includes('As part of a');
  const hasAssets = (trade: string): boolean =>
    PLAYER_REGEX.test(trade) || ASSET_REGEX.test(trade);

  const stringData = tradeString
    // `to the` for 1to1 trades, `;` for multi team
    .split(isMultiTeam ? ';' : 'to the')
    .map((splitString) => splitString.trim());

  return forAssets ? stringData.filter((trade) => (isMultiTeam ? hasAssets(trade) : trade)) : stringData;
};