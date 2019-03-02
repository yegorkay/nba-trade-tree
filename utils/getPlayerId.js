const getPlayerId = (playerURL) => {
  return playerURL
    .split('/')
    .pop()
    .replace(/(.html)/g, '');
};

module.exports = getPlayerId;
