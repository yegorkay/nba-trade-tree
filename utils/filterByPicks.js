const _ = require('lodash');

/**
 * Returns a string for a matching draft pick
 * @param {*} tradeString The transaction string you are testing
 * @param {*} player The player you are regex matching
 * @return {*} Returns a value such as `2013 2nd round draft pick (Alex Oriakhi`
 */
const matchDraftString = (tradeString, player) => {
  /** ex: `2013 2nd round draft pick (Alex Oriakhi`
   * **(There is no closing bracket on purpose)** */
  const playerRegex = new RegExp(
    `(\\b(19|20)\\d{2}\\b\\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\\s(round draft pick))\\s(\\()(${player})`,
    'g'
  );
  const assetRegex = /(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;
  const match = tradeString.match(playerRegex);
  // console.log(tradeString.match(assetRegex));
  if (match !== null) {
    const pick = tradeString.match(assetRegex);
    const pickPlusPlayer = tradeString.match(playerRegex);
    /** We need this removePlayer map because we are filtering without the player after */
    const removePlayer = pickPlusPlayer.map((player) =>
      player.split('(')[0].trim()
    );
    const filtered = pick.filter((item) => !removePlayer.includes(item));
    const result = pickPlusPlayer.concat(filtered);
    return result;
  } else {
    return [];
  }
};

/**
 * Get the array of picks
 * @param {*} playerArray The array of all players involved
 * @param {*} tradeString The HTML transaction string
 * @param {*} tradedTo Where the pick was traded to (**Needs to be fixes**)
 * @return {*} Returns a filtered array with only assets (picks)
 */
const filterByPicks = (playerArray, tradeString, tradedTo = '') => {
  const picks = playerArray
    .map((player) => {
      const { name, playerId } = player;
      const picksArray = matchDraftString(tradeString, name);
      if (picksArray.length > 0) {
        const data = picksArray.map((pick) => {
          /** If the `(` exists, then the player is drafted */
          const isDrafted = pick.includes('(');
          const getDraftString = (index) => pick.split('(')[index].trim();
          return {
            name: isDrafted ? getDraftString(1) : '',
            playerId: isDrafted ? playerId : '',
            tradedTo,
            pick: getDraftString(0)
          };
        });
        return data;
      }
    })
    .filter((player) => player !== undefined);
  return _.flatten(picks);
};

const testString = `July 18, 2018: Traded by the San Antonio Spurs with Danny Green 
and cash to the Toronto Raptors for DeMar DeRozan, Jakob Poeltl and 
a 2019 1st round draft pick. (2019 1st-rd pick is top-20 protected.) $5MM`;
//
const testData = [
  { name: 'Danny Green', playerId: 'greenda02' },
  { name: 'DeMar DeRozan', playerId: 'derozde01' },
  { name: 'Jakob Poeltl', playerId: 'poeltja01' }
];

const tradedTo = `TOR`;

const testString2 = `January 29, 2018: Traded by the Detroit Pistons with Avery Bradley, Boban Marjanovic, 
a 2018 1st round draft pick (Miles Bridges was later selected) and a 2019 2nd round draft pick to the Los Angeles Clippers 
for Blake Griffin, Brice Johnson and Willie Reed.`;

const testData2 = [
  { name: 'Avery Bradley', playerId: 'bradlav01' },
  { name: 'Boban Marjanovic', playerId: 'marjabo01' },
  { name: 'Miles Bridges', playerId: 'bridgmi02' },
  { name: 'Blake Griffin', playerId: 'griffbl01' },
  { name: 'Brice Johnson', playerId: 'johnsbr02' },
  { name: 'Willie Reed', playerId: 'reedwi02' }
];

const tradedTo2 = `LAC`;

filterByPicks(testData, testString, tradedTo);
filterByPicks(testData2, testString2, tradedTo2);

const testString3 = `July 11, 2012: Traded by the Los Angeles Lakers (as a future 2013 1st round draft pick) with a 2013 2nd round draft pick (Alex Oriakhi was later selected), a 2014 2nd round draft pick (Johnny O'Bryant was later selected) and a 2018 1st round draft pick (Mikal Bridges was later selected) to the Phoenix Suns for Steve Nash.`;

const getAssets = (assetsArray) =>
  assetsArray.map((asset) => {
    return {
      pick: asset,
      name: ''
    };
  });

const getDraftedPlayers = (playerArray) =>
  playerArray.map((playerData) => {
    const playerString = playerData.split('(');
    return {
      pick: playerString[0].trim(),
      name: playerString[1].split('was')[0].trim()
    };
  });

const getPicks = (tradeString) => {
  const playerRegex = /(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick)\s(.*?)was/g;
  const assetRegex = /(future\s)?(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;

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
    console.log(_.unionBy(draftedPlayers, undraftedPicks, 'pick'));
  } else {
    // there are no drafted players in the string
    console.log({ assets });
  }

  return playerRegex.exec(tradeString);
};

getPicks(testString3);
// if playerMatch === null

module.exports = filterByPicks;
