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

const test =
  'June 27, 2013: Drafted by the Phoenix Suns in the 1st round (30th pick) of the 2013 NBA Draft.';
console.log(extractDraftPick(test));
const ex =
  "July 11, 2012: Traded by the Los Angeles Lakers (as a future 2013 1st round draft pick) with a 2013 2nd round draft pick (Alex Oriakhi was later selected), a 2014 2nd round draft pick (Johnny O'Bryant was later selected) and a 2018 1st round draft pick (Mikal Bridges was later selected) to the Phoenix Suns for Steve Nash.";

console.log(extractDraftPick(ex));
const fultz =
  'June 22, 2017: Drafted by the Philadelphia 76ers in the 1st round (1st pick) of the 2017 NBA Draft.';
console.log(extractDraftPick(fultz));

module.exports = extractDraftPick;
