import {
  ITeamSelectOption,
  Dictionary,
  Dispatch,
  ITeamQueryParams
} from 'models';
import { apiService, formatService } from 'services';
import { Actions } from 'store';
import { ITeam, ITrade } from 'shared';

class AppActions {
  getTeams() {
    return (dispatch: Dispatch) => {
      apiService.getTeams().then(({ data }) => {
        const teams: ITeam[] | any[] = formatService.createSelectLabels(
          data.data,
          'teamAbr',
          'teamName'
        );
        dispatch(this.setTeams(data.data));
        dispatch(this.setTeamSelectOptions(teams));
      });
    };
  }

  setTeams(data: ITeam[]) {
    return {
      type: Actions.SET_TEAMS,
      data
    };
  }

  setTeamSelectOptions(data: ITeamSelectOption[]) {
    return {
      type: Actions.SET_TEAM_SELECT_OPTIONS,
      data
    };
  }

  getTradeHistory(f1: string, f2: string) {
    return (dispatch: Dispatch) => {
      apiService.getTradeHistory(f1, f2).then(({ data }) => {
        dispatch(this.setTradeHistory(data.data));
        dispatch(this.setQueryParams(f1, f2));
      });
    };
  }

  resetTradeHistory() {
    return (dispatch: Dispatch) => dispatch(this.setTradeHistory({}));
  }

  setTradeHistory(data: Dictionary<ITrade[]> | {}) {
    return {
      type: Actions.SET_TRADE_HISTORY,
      data
    };
  }

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

const appActions = new AppActions();

export { appActions };
