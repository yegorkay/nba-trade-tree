import { IBasePlayer, IPlayer } from '../server/src/models';

export interface ITeam {
  teamAbr: string;
  teamName: string;
}

export interface ITrade extends IBasePlayer {
  transactionDate: string;
}

export interface ITransaction {
  status: string;
  transactionDate: string;
  tradedBy: string;
  tradedTo: string;
  tradedPlayers: IPlayer[] | [];
  tradedPicks: IPlayer[] | [];
}
