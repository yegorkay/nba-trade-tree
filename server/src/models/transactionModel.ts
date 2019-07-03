import { IBasePlayer } from './basePlayerModel';
import { IPlayer } from './playerModel';

export interface ITransaction {
  status: string;
  transactionDate: string;
  tradedBy: string;
  tradedTo: string;
  tradedPlayers: IBasePlayer[] | [];
  tradedPicks: IPlayer[] | [];
}
