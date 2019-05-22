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
        dispatch(this.setTeams(teams));
      });
    };
  }

  setTeams(data: ITeam[]) {
    return {
      type: Actions.SET_TEAMS,
      data
    };
  }
}

const appActions = new AppActions();

export { appActions };
