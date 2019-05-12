import { teamNames } from './../settings';
import { Response, Request } from 'express';
class TeamController {
  /**
   *
   * @param req Express Request
   * @param res Express Response
   * @returns Returns all NBA teams
   */
  getAllTeams(_req: Request, res: Response) {
    res.send({ data: teamNames });
  }
}

export const teamController = new TeamController();
