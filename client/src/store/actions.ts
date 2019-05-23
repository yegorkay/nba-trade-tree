import { ITeamSelectOption, Dictionary } from 'models';
import { apiService, formatService } from 'services';
import { Dispatch } from 'vendor';
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
      });
    };
  }

  setTradeHistory(data: Dictionary<ITrade[]>) {
    return {
      type: Actions.SET_TRADE_HISTORY,
      data
    };
  }
}

const appActions = new AppActions();

export { appActions };
