import { produce } from 'vendor';
import { Actions } from 'store';
import { settingsState, ActionTypes } from 'models';

const settingsReducer = (state = settingsState, action: ActionTypes) =>
  produce(state, (settings) => {
    switch (action.type) {
      case Actions.SET_ASYNC_START:
        settings.asyncStatus = {
          start: true,
          success: false,
          error: false
        };
        break;
      case Actions.SET_ASYNC_SUCCESS:
        settings.asyncStatus = {
          start: false,
          success: true,
          error: false
        };
        break;
      case Actions.SET_ASYNC_ERROR:
        settings.asyncStatus = {
          start: false,
          success: false,
          error: true
        };
        break;
      case Actions.SET_QUERY_PARAMS:
        settings.queryParams = action.data;
        break;
    }
  });

export { settingsReducer };
