import { ITeam } from 'shared';
import { actionTypes } from 'store';
import { produce } from 'vendor';

interface IState {
  readonly teams: ITeam[];
}

const initialState: IState = {
  teams: []
};

const appReducer = (state = initialState, action: any) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SET_TEAMS:
        draft.teams = action.data;
    }
  });

export { appReducer };
