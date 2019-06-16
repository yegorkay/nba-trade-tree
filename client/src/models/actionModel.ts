import { ITeamSelectOption, Dictionary, ITeamQueryParams } from 'models';
import { ITeam, ITrade, ITransaction } from 'shared';
import { TradeActions, SettingsActions, PlayerActions } from 'store';

/** Reducer Type for: `Trade History` */
interface ISetTradeHistory {
  data: Dictionary<ITrade[]>;
  type: TradeActions.SET_TRADE_HISTORY;
}

/** Reducer Type for: `Set Teams` */
interface ISetTeams {
  data: ITeam[];
  type: TradeActions.SET_TEAMS;
}

/** Reducer Type for: `Set Teams` */
interface ISetTeamSelectOptions {
  data: ITeamSelectOption[];
  type: TradeActions.SET_TEAM_SELECT_OPTIONS;
}

/** Reducer Type for: `Async Actions` */
interface ISetAsyncStart {
  type: SettingsActions.SET_ASYNC_START;
}

/** Reducer Type for: `Async Actions` */
interface ISetAsyncSuccess {
  type: SettingsActions.SET_ASYNC_SUCCESS;
}

/** Reducer Type for: `Async Actions` */
interface ISetAsyncError {
  type: SettingsActions.SET_ASYNC_ERROR;
}

/** Reducer Type for: `Query Params` */
interface ISetTeamQueryParams {
  data: ITeamQueryParams;
  type: SettingsActions.SET_QUERY_PARAMS;
}

interface ISetPlayerHistory {
  data: ITransaction[];
  type: PlayerActions.SET_PLAYER;
}

type ITeamTypes = ISetTeams | ISetTeamSelectOptions;

type AsyncTypes = ISetAsyncStart | ISetAsyncSuccess | ISetAsyncError;

type TradeActionTypes = ITeamTypes | ISetTradeHistory;

type SettingsActionTypes = AsyncTypes | ISetTeamQueryParams;

type PlayerActionTypes = ISetPlayerHistory;

export { TradeActionTypes, SettingsActionTypes, PlayerActionTypes };
