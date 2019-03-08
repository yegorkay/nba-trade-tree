const pruneTradedPlayers = (tradedForArray, assetsArray) => {
  return tradedForArray.filter(
    (tradeTarget) =>
      !assetsArray.find((player) => tradeTarget.name === player.name || tradeTarget.name === "future")
  );
};

module.exports = pruneTradedPlayers;
