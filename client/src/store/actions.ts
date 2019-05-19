import { apiService, formatService } from 'services';
import { Dispatch } from 'redux';
import { actionTypes } from 'store';

class AppActions {
  getTeams() {
    return (dispatch: Dispatch) => {
      apiService.getTeams().then(({ data }) => {
        const teams = formatService.createSelectLabels(
          data.data,
          'teamAbr',
          'teamName'
        );
        dispatch(this.setTeams(teams));
      });
    };
  }

  setTeams(data: any) {
    return {
      type: actionTypes.SET_TEAMS,
      data
    };
  }
}

const appActions = new AppActions();

export { appActions };
