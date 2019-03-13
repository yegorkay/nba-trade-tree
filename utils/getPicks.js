const _ = require('lodash');
const $ = require('cheerio');

const testString = `July 18, 2018: Traded by the San Antonio Spurs with Danny Green 
and cash to the Toronto Raptors for DeMar DeRozan, Jakob Poeltl and 
a 2019 1st round draft pick. (2019 1st-rd pick is top-20 protected.) $5MM`;

const testString2 = `January 29, 2018: Traded by the Detroit Pistons with Avery Bradley, Boban Marjanovic, 
a 2018 1st round draft pick (Miles Bridges was later selected) and a 2019 2nd round draft pick to the Los Angeles Clippers 
for Blake Griffin, Brice Johnson and Willie Reed.`;

const testString3 = `July 11, 2012: Traded by the Los Angeles Lakers (as a future 2013 1st round draft pick) with a 2013 2nd round draft pick (Alex Oriakhi was later selected), a 2014 2nd round draft pick (Johnny O'Bryant was later selected) and a 2018 1st round draft pick (Mikal Bridges was later selected) to the Phoenix Suns for Steve Nash.`;

const getAssets = (assetsArray) => {
  if (assetsArray !== null) {
    return assetsArray.map((asset) => {
      return {
        pick: asset,
        name: ''
      };
    });
  } else {
    return [];
  }
};

const getDraftedPlayers = (playerArray) =>
  playerArray.map((playerData) => {
    const playerString = playerData.split('(');
    return {
      pick: playerString[0].trim(),
      name: playerString[1].split('was')[0].trim()
    };
  });

// These regex consts are used throughout, hence outside of a variable scope
const playerRegex = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
const assetRegex = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;

const getPicks = (tradeString) => {
  const playerMatch = tradeString.match(playerRegex);
  const assetMatch = tradeString.match(assetRegex);

  const assets = getAssets(assetMatch);

  if (playerMatch !== null) {
    const draftedPlayers = getDraftedPlayers(playerMatch);
    /** `Future` indicates that the player we are searching was drafted. Therefore, we don't want him in this data */
    const undraftedPicks = assets.filter((asset) =>
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

const splitString = (tradeString) => {
  const isMultiTeam = tradeString.includes('As part of a');
  const hasAssets = (trade) =>
    playerRegex.test(trade) || assetRegex.test(trade);
  // [0] tradedBy
  // [1] tradedTo
  return (
    tradeString
      // `to the` for 1to1 trades, `;` for multi team
      .split(isMultiTeam ? ';' : 'to the')
      .map((splitString) => splitString.trim())
      .filter((trade) => (isMultiTeam ? hasAssets(trade) : trade))
  );
};

const multi = `February 7, 2019: As part of a 3-team trade, traded by the New Orleans Pelicans to the Milwaukee Bucks; the Detroit Pistons traded Stanley Johnson to the New Orleans Pelicans; the Milwaukee Bucks traded Thon Maker to the Detroit Pistons; and the Milwaukee Bucks traded Jason Smith, a 2019 2nd round draft pick, a 2020 2nd round draft pick, a 2020 2nd round draft pick and a 2021 2nd round draft pick to the New Orleans Pelicans. (Pick is DEN's 2019 second-round pick, top-55 protected.) (Pick is WAS's 2020 second-round pick.) (Pick is WAS's 2021 second-round pick.)`;

console.log(splitString(multi));

module.exports = getPicks;
