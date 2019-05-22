import { produce } from 'vendor';
import { Actions } from 'store';
import { initialState, ActionTypes } from 'models';

const appReducer = (state = initialState, action: ActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Actions.SET_TEAMS:
        draft.teams = action.data;
        break;
      case Actions.SET_TEAM_SELECT_OPTIONS:
        draft.teamSelectOptions = action.data;
        break;
    }
  });

export { appReducer };
