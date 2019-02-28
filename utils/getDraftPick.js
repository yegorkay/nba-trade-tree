const getDraftPick = (str) => {
  /**ex: 2013 1st round draft pick */
  const assetRegex = /(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;
  /**ex: 1st round (30th pick) */
  const draftedRegex = /(([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round)\s\(([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(pick\)))/g;
  const isMatch = str.match(assetRegex) || str.match(draftedRegex);
  return isMatch ? isMatch : [];
};

module.exports = getDraftPick;
