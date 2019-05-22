import { ITeam } from 'shared';

enum Actions {
  SET_TEAMS = 'SET_TEAMS'
}

interface ISetTeamsAction {
  data: ITeam[];
  type: Actions.SET_TEAMS;
}

type ActionTypes = ISetTeamsAction;

export { Actions, ActionTypes };
