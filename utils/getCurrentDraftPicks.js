/**
 * Create an array of objects for draft picks by regex testing the string
 * if the string contain values such as `2013 1st round draft pick` or 
 * `1st round (30th pick)`
 * @param tradeString The string you are testing
 * @return Returns array of picks  `[{ pick: '', name: '', id: '' }]`
 */
const getCurrentDraftPicks = (tradeString) => {
  /**ex: `2013 1st round draft pick` */
  const assetRegex = /(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;
  /**ex: `1st round (30th pick)` */
  const draftedRegex = /(([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round)\s\(([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(pick\)))/g;
  const isMatch = tradeString.match(assetRegex) || tradeString.match(draftedRegex);
  const picksArray = isMatch.map((pick) => {
    return {
      pick,
      name: '',
      id: ''
    };
  });
  return isMatch ? picksArray : [];
};

module.exports = getCurrentDraftPicks;
