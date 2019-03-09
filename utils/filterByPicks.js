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
    return '';
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

const testString = `January 29, 2018: Traded by the Detroit Pistons with Avery Bradley, Boban Marjanovic, a 2018 1st round draft pick (Miles Bridges was later selected) and a 2019 2nd round draft pick to the Los Angeles Clippers for Blake Griffin, Brice Johnson and Willie Reed.`;

const testData = [
  { name: 'Avery Bradley', playerId: 'bradlav01' },
  { name: 'Boban Marjanovic', playerId: 'marjabo01' },
  { name: 'Miles Bridges', playerId: 'bridgmi02' },
  { name: 'Blake Griffin', playerId: 'griffbl01' },
  { name: 'Brice Johnson', playerId: 'johnsbr02' },
  { name: 'Willie Reed', playerId: 'reedwi02' }
];

const tradedTo = `LAC`;

// console.log(_.flatten(filterByPicks(testData, testString, tradedTo)));
console.log(filterByPicks(testData, testString, tradedTo));
// console.log('2018 1st round draft pick'.substring(0, 25));

module.exports = filterByPicks;
