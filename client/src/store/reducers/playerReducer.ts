import { produce } from 'vendor';
import { PlayerActions } from 'store';
import { playerState, PlayerActionTypes } from 'models';

const playerReducer = (state = playerState, action: PlayerActionTypes) =>
  produce(state, (player) => {
    switch (action.type) {
      case PlayerActions.SET_PLAYER:
        player.playerHistory = action.data;
        break;
    }
  });

export { playerReducer };
