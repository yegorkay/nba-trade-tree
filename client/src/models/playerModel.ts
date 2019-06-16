import { ITransaction } from 'shared';

interface IPlayerState {
  readonly playerHistory: ITransaction[];
}

const playerState: IPlayerState = {
  playerHistory: []
};

export { IPlayerState, playerState };
