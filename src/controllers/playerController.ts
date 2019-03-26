import { ITransaction } from './../models';
import { scrapeSinglePlayerTransaction } from '../services';
import { Response, Request } from 'express';

class PlayerController {
  getPlayerHistory(req: Request, res: Response) {
    const { id } = req.query;
    if (!id) {
      return res.status(400).send({ 'message': 'playerId is required' })
    } else {
      return scrapeSinglePlayerTransaction(id).then((data: ITransaction[]) => {
        res.send({ data });
      });
    }
  }
}

export const playerController = new PlayerController();