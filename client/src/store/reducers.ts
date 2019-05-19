import { actionTypes } from 'store';
import produce from 'immer';

interface IState {
  teams: any[];
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
