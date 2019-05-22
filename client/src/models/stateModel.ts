import { ITeamSelectOption } from 'models';
import { ITeam } from 'shared';
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

type ActionTypes = ISetTeamsAction | ISetTeamSelectOptions;

/** State type definitions */

interface IState {
  readonly teams: ITeam[];
  readonly teamSelectOptions: ITeamSelectOption[];
}

const initialState: IState = {
  teams: [],
  teamSelectOptions: []
};

interface IReduxState {
  app: IState;
}

export { ActionTypes, initialState, IState, IReduxState };
