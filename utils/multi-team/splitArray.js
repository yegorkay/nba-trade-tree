/** This is used to split the array by team. Replaces the team with a string so we can format our array accordingly after */
const splitArray = (playerArray, firstGroupTeam) => {
  let arr = [];
  for (i = 0; i < playerArray.length - 1; i++) {
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

module.exports = splitArray;
