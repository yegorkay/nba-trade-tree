import { produce } from 'vendor';
import { SettingsActions } from 'store';
import { settingsState, SettingsActionTypes } from 'models';

const settingsReducer = (state = settingsState, action: SettingsActionTypes) =>
  produce(state, (settings) => {
    switch (action.type) {
      case SettingsActions.SET_ASYNC_START:
        settings.asyncStatus = {
          start: true,
          success: false,
          error: false
        };
        break;
      case SettingsActions.SET_ASYNC_SUCCESS:
        settings.asyncStatus = {
          start: false,
          success: true,
          error: false
        };
        break;
      case SettingsActions.SET_ASYNC_ERROR:
        settings.asyncStatus = {
          start: false,
          success: false,
          error: true
        };
        break;
      case SettingsActions.SET_QUERY_PARAMS:
        settings.queryParams = action.data;
        break;
    }
  });

export { settingsReducer };
