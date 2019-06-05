import {
  ITeamSelectOption,
  Dictionary,
  IAsyncStatus,
  ITeamQueryParams
} from 'models';
import { ITeam, ITrade } from 'shared';

/** State type definitions */
interface IState {
  readonly teams: ITeam[];
  readonly teamSelectOptions: ITeamSelectOption[];
  readonly tradeHistory: Dictionary<ITrade[]>;
  readonly asyncStatus: IAsyncStatus;
  readonly queryParams: ITeamQueryParams;
}

const initialState: IState = {
  teams: [],
  teamSelectOptions: [],
  tradeHistory: {},
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

interface IReduxState {
  app: IState;
}

export { initialState, IState, IReduxState };
