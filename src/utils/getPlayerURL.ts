export const getPlayerURL = (playerId: string) => {
  return `https://www.basketball-reference.com/players/${
    playerId[0]
  }/${playerId}.html`;
};
