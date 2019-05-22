import { ITeam } from 'shared';
import { ITeamSelectOption } from 'models';

enum Actions {
  SET_TEAMS = 'SET_TEAMS',
  SET_TEAM_SELECT_OPTIONS = 'SET_TEAM_SELECT_OPTIONS'
}

interface ISetTeamsAction {
  data: ITeam[];
  type: Actions.SET_TEAMS;
}

interface ISetTeamSelectOptions {
  data: ITeamSelectOption[];
  type: Actions.SET_TEAM_SELECT_OPTIONS;
}

type ActionTypes = ISetTeamsAction | ISetTeamSelectOptions;

export { Actions, ActionTypes };
