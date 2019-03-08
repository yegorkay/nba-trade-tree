/**
 * Returns a string for a matching draft pick
 * @param {*} tradeString The transaction string you are testing
 * @param {*} player The player you are regex matching
 * @return {*} Returns a value such as `2013 2nd round draft pick (Alex Oriakhi`
 */
const matchDraftString = (tradeString, player) => {
  /** ex: `2013 2nd round draft pick (Alex Oriakhi` 
   * **(There is no closing bracket on purpose)** */
  const regex = new RegExp(
    `(\\b(19|20)\\d{2}\\b\\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\\s(round draft pick))\\s(\\()(${player})`,
    'g'
  );
  const match = tradeString.match(regex);
  return match ? match[0] : '';
};

const filterByPicks = (playerArray, tradeString, tradedTo = '') => {
  return playerArray
    .map((player) => {
      const { name, playerId } = player;
      const draftString = matchDraftString(tradeString, name).split('(');
      return {
        name: draftString[1],
        playerId,
        tradedTo,
        pick: draftString[0].trim(),
      };
    })
    .filter((player) => player.pick !== '');
};

module.exports = filterByPicks;
