import { ITeamSelectOption, Dictionary } from 'models';
import { ITeam, ITrade } from 'shared';
import { Actions } from 'store';

/** Reducer action types */

interface ISetTeamsAction {
  data: ITeam[];
  type: Actions.SET_TEAMS;
}

interface ISetTeamSelectOptions {
  data: ITeamSelectOption[];
  type: Actions.SET_TEAM_SELECT_OPTIONS;
}

interface ISetTradeHistory {
  data: Dictionary<ITrade[]>;
  type: Actions.SET_TRADE_HISTORY;
}

type ActionTypes = ISetTeamsAction | ISetTeamSelectOptions | ISetTradeHistory;

/** State type definitions */

interface IState {
  readonly teams: ITeam[];
  readonly teamSelectOptions: ITeamSelectOption[];
  readonly tradeHistory: Dictionary<ITrade[]>;
}

const initialState: IState = {
  teams: [],
  teamSelectOptions: [],
  tradeHistory: {}
};

interface IReduxState {
  app: IState;
}

export { ActionTypes, initialState, IState, IReduxState };
