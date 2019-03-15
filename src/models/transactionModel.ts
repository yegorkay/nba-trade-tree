import { IPlayer } from './playerModel';

export interface ITransaction {
  status: string;
  transactionDate: string;
  tradedBy: string;
  tradedTo: string;
  tradedPlayers: IPlayer[] | [];
  tradedPicks: IPlayer[] | [];
}
