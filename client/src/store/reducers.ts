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
      case Actions.SET_TRADE_HISTORY:
        draft.tradeHistory = action.data;
        break;
      case Actions.SET_ASYNC_START:
        draft.asyncStatus = {
          start: true,
          success: false,
          error: false
        };
        break;
      case Actions.SET_ASYNC_SUCCESS:
        draft.asyncStatus = {
          start: false,
          success: true,
          error: false
        };
        break;
      case Actions.SET_ASYNC_ERROR:
        draft.asyncStatus = {
          start: false,
          success: false,
          error: true
        };
        break;
    }
  });

export { appReducer };
