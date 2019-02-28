const extractDraftPick = (str) => {
  const hasDrafted = str.match(/(Drafted)/g);

  if (hasDrafted) {
    const regex = /\b((^19[5-9]\d|20[0-4]\d|2050$):)|(Drafted)|(([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round))/g;
    const isMatch = str.match(regex);
    const draftString = `${isMatch[0].replace(':', '')} ${
      isMatch[2]
      } draft pick`;
    return draftString;
  } else {
    return '';
  }
};

module.exports = extractDraftPick;
