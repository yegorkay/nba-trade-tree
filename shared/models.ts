import { IBasePlayer } from '../server/src/models';

export interface ITeam {
  teamAbr: string;
  teamName: string;
}

export interface ITrade extends IBasePlayer {
  transactionDate: string;
}
