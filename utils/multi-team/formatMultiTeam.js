const getAbbr = require('../getAbbr');

const formatMultiTeam = (chunkedArray, tradedToArray) =>
  chunkedArray.map((chunk, index) => {
    return chunk
      .map((tradedPlayers, chunkIndex) => {
        const { name, playerId } = tradedPlayers;
        return (
          chunkIndex !== 0 && {
            name,
            playerId,
            tradedBy: getAbbr(chunk[0].name),
            tradedTo: getAbbr(tradedToArray[index].name)
          }
        );
      })
      .filter((val) => typeof val !== 'boolean');
    // there will always be an even amount of teams. A team that is trading, one that is receiving. Hence the modulus
  });

module.exports = formatMultiTeam;
