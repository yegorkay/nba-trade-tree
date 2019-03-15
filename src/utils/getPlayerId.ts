
/**
 * Extracts the `playerId` out of a BBall-Ref URL
 * @param playerURL The BBall-Ref URL of the player you want
 * @return Returns playerId `(/h/harrito02.html => harrito02)`
 */
export const getPlayerId = (playerURL: string): string => {
  // if (playerURL.length > 0) {
  //   const str: string | undefined = playerURL.split('/').pop();
  //   if (typeof str === 'string') {
  //     return str.replace(/(.html)/g, '');
  //   }
  // }
  // return '';
  return playerURL;
};