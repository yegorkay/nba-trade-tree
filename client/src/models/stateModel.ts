import { ITeamSelectOption, Dictionary, IAsyncStatus } from 'models';
import { ITeam, ITrade } from 'shared';

/** State type definitions */
interface IState {
  readonly teams: ITeam[];
  readonly teamSelectOptions: ITeamSelectOption[];
  readonly tradeHistory: Dictionary<ITrade[]>;
  readonly asyncStatus: IAsyncStatus;
}

const initialState: IState = {
  teams: [],
  teamSelectOptions: [],
  tradeHistory: {},
  asyncStatus: {
    start: false,
    success: false,
    error: false
  }
};

interface IReduxState {
  app: IState;
}

export { initialState, IState, IReduxState };
