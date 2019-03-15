
/**
 * Extracts the `playerId` out of a BBall-Ref URL
 * @param playerURL The BBall-Ref URL of the player you want
 * @return Returns playerId `(/h/harrito02.html => harrito02)`
 */
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
