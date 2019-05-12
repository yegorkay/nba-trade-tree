import { BBALL_PREFIX } from '../settings';

export const getPlayerURL = (playerId: string) => {
  return `${BBALL_PREFIX}/players/${playerId[0]}/${playerId}.html`;
};
