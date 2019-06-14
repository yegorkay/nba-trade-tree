import {
  ITeamSelectOption,
  Dictionary,
  IAsyncStatus,
  ITeamQueryParams
} from 'models';
import { ITeam, ITrade } from 'shared';

interface ITradeState {
  readonly teams: ITeam[];
  readonly teamSelectOptions: ITeamSelectOption[];
  readonly tradeHistory: Dictionary<ITrade[]>;
}

interface ISettingsState {
  readonly asyncStatus: IAsyncStatus;
  readonly queryParams: ITeamQueryParams;
}

interface IGlobalState {
  trade: ITradeState;
  settings: ISettingsState;
}

const tradeState: ITradeState = {
  teams: [],
  teamSelectOptions: [],
  tradeHistory: {}
};

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

const globalState: IGlobalState = {
  trade: tradeState,
  settings: settingsState
};

export {
  ITradeState,
  ISettingsState,
  globalState,
  tradeState,
  settingsState,
  IGlobalState
};
