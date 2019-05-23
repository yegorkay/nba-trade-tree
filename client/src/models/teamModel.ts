import { ITrade } from 'shared';

interface ITeamSelectOption {
  value: string;
  label: string;
}

interface ITradeObject {
  [transactionDate: string]: ITrade[];
}

export { ITeamSelectOption, ITradeObject };
