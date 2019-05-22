import { produce } from 'vendor';
import { ITeam } from 'shared';
import { Actions, ActionTypes } from 'store';
import { ITeamSelectOption } from 'models';

interface IState {
  readonly teams: ITeam[];
  readonly teamSelectOptions: ITeamSelectOption[];
}

const initialState: IState = {
  teams: [],
  teamSelectOptions: []
};

const appReducer = (state = initialState, action: ActionTypes) =>
  produce(state, (draft) => {
    switch (action.type) {
      case Actions.SET_TEAMS:
        draft.teams = action.data;
        break;
      case Actions.SET_TEAM_SELECT_OPTIONS:
        draft.teamSelectOptions = action.data;
        break;
    }
  });

export { appReducer };
