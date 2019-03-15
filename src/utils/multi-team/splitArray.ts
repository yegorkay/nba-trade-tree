interface IAllTradeValues {
  name: string;
  playerId: string;
}
/**
 * **multi-team:** This is used to split the `playerArray` by team. 
 * Replaces a duplicated team with a dummy string so 
 * we can format our array accordingly afterwards
 * @param {*} playerArray The array of players
 * @param {*} firstGroupTeam The name of the team that will be pushed of the 
 * beginning of the array (the player we are trading for is implictly tied to the first trade group)
 * @return {*} Returns an array with `'match'` thrown in where the previous 
 * and next elements of the array match `[1, 2, 4, 4] => [1, 2, 'match']`
 */
export const splitArray = (playerArray: IAllTradeValues[], firstGroupTeam: string) => {
  let arr = [];
  for (let i = 0; i < playerArray.length - 1; i++) {
    const prevNextIdsMatch =
      playerArray[i].playerId === playerArray[i + 1].playerId;
    // The first team chunk is always implicitly tied to the player we are scraping
    if (i === 0) {
      arr.push({
        name: firstGroupTeam
      });
    }
    if (!prevNextIdsMatch) {
      arr.push(playerArray[i]);
    } else {
      arr.push('match');
    }
  }
  return arr;
};