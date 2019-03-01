const mergePlayersAndPicks = (players, picks) => {
  return players.map((playerData, index) => {
    const { name, link } = playerData;
    return {
      name,
      link,
      pick: picks[index] === undefined ? '' : picks[index]
    };
  });
};

module.exports = mergePlayersAndPicks;
