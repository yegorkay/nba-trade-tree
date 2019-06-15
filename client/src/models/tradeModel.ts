import { ITeamSelectOption, Dictionary } from 'models';
import { ITeam, ITrade } from 'shared';

interface ITradeState {
  readonly teams: ITeam[];
  readonly teamSelectOptions: ITeamSelectOption[];
  readonly tradeHistory: Dictionary<ITrade[]>;
}

const tradeState: ITradeState = {
  teams: [],
  teamSelectOptions: [],
  tradeHistory: {}
};

export { ITradeState, tradeState };
