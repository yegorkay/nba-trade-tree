const getPlayerId = (playerURL) => {
  if (playerURL) {
    return playerURL
      .split('/')
      .pop()
      .replace(/(.html)/g, '');
  }
  return '';
};

module.exports = getPlayerId;
