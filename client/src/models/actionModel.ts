import { ITeamSelectOption, Dictionary, ITeamQueryParams } from 'models';
import { ITeam, ITrade } from 'shared';
import { Actions } from 'store';

/** Reducer Type for: `Trade History` */
interface ISetTradeHistory {
  data: Dictionary<ITrade[]>;
  type: Actions.SET_TRADE_HISTORY;
}

/** Reducer Type for: `Set Teams` */
interface ISetTeams {
  data: ITeam[];
  type: Actions.SET_TEAMS;
}

/** Reducer Type for: `Set Teams` */
interface ISetTeamSelectOptions {
  data: ITeamSelectOption[];
  type: Actions.SET_TEAM_SELECT_OPTIONS;
}

/** Reducer Type for: `Async Actions` */
interface ISetAsyncStart {
  type: Actions.SET_ASYNC_START;
}

/** Reducer Type for: `Async Actions` */
interface ISetAsyncSuccess {
  type: Actions.SET_ASYNC_SUCCESS;
}

/** Reducer Type for: `Async Actions` */
interface ISetAsyncError {
  type: Actions.SET_ASYNC_ERROR;
}

/** Reducer Type for: `Query Params` */
interface ISetTeamQueryParams {
  data: ITeamQueryParams;
  type: Actions.SET_QUERY_PARAMS;
}

type ITeamTypes = ISetTeams | ISetTeamSelectOptions;

type AsyncTypes = ISetAsyncStart | ISetAsyncSuccess | ISetAsyncError;

type ActionTypes =
  | ITeamTypes
  | ISetTradeHistory
  | AsyncTypes
  | ISetTeamQueryParams;

export { ActionTypes };
