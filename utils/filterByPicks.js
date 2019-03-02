const matchDraftString = (str, player) => {
  /** ex: 2019 1st round draft pick */
  const regex = new RegExp(
    `(\\b(19|20)\\d{2}\\b\\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\\s(round draft pick))\\s(\\()(${player})`,
    'g'
  );
  const match = str.match(regex);
  return match ? match[0] : '';
};

const filterByPicks = (playerArray, tradeString) => {
  return playerArray
    .map((player) => {
      const { name, link } = player;
      const draftString = matchDraftString(tradeString, name).split('(');
      return {
        name: draftString[1],
        link: link,
        pick: draftString[0].trim()
      };
    })
    .filter((player) => player.pick !== '');
};

module.exports = filterByPicks;
