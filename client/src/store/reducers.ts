import { produce } from 'vendor';
import { ITeam } from 'shared';
import { Actions, ActionTypes } from 'store';

interface IState {
  readonly teams: ITeam[];
}

const initialState: IState = {
  teams: []
};

const appReducer = (state = initialState, action: ActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Actions.SET_TEAMS:
        draft.teams = action.data;
    }
  });

export { appReducer };
