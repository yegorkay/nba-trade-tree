import { IAsyncStatus, ITeamQueryParams } from 'models';

interface ISettingsState {
  readonly asyncStatus: IAsyncStatus;
  readonly queryParams: ITeamQueryParams;
}

const settingsState: ISettingsState = {
  asyncStatus: {
    start: false,
    success: false,
    error: false
  },
  queryParams: {
    f1: '',
    f2: ''
  }
};

export { ISettingsState, settingsState };
