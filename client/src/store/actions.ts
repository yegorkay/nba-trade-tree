import { ITeamSelectOption } from 'models';
import { apiService, formatService } from 'services';
import { Dispatch } from 'vendor';
import { Actions } from 'store';
import { ITeam } from 'shared';

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
}

const appActions = new AppActions();

export { appActions };
