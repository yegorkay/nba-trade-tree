import { appService } from 'services';
import { PlayerActions as Actions } from 'store';
import { Dispatch } from 'models';
import { ITransaction } from 'shared';

class PlayerActions {
  getPlayerHistory(playerId: string, date: string) {
    return (dispatch: Dispatch) => {
      appService.getPlayerHistory(playerId, date).then(({ data }) => {
        dispatch(this.setPlayerHistory(data.data));
      });
    };
  }

  setPlayerHistory(data: ITransaction[]) {
    return {
      type: Actions.SET_PLAYER,
      data
    };
  }
}

const playerActions = new PlayerActions();

export { playerActions };
