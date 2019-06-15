import { ITeamQueryParams } from 'models';
import { SettingsActions as Actions } from 'store';

class SettingsActions {
  setAsyncStart() {
    return {
      type: Actions.SET_ASYNC_START
    };
  }

  setAsyncSuccess() {
    return {
      type: Actions.SET_ASYNC_SUCCESS
    };
  }

  setAsyncError() {
    return {
      type: Actions.SET_ASYNC_ERROR
    };
  }

  setQueryParams(f1: string = '', f2: string = '') {
    const searchParams = new URLSearchParams(location.search);
    const data: ITeamQueryParams = {
      f1: searchParams.get('f1') || f1,
      f2: searchParams.get('f2') || f2
    };
    return {
      type: Actions.SET_QUERY_PARAMS,
      data
    };
  }
}

const settingsActions = new SettingsActions();

export { settingsActions };
