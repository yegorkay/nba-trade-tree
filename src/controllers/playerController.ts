import { validDateFormat } from '../utils';
import { ITransaction } from '../models';
import { scrapeSinglePlayerTransaction } from '../services';
import { Response, Request } from 'express';

class PlayerController {
  /**
   *
   * @param req Express Request
   * @param res Express Response
   * @returns Returns player transaction history
   */
  getPlayerHistory(req: Request, res: Response) {
    const { id, date } = req.query;
    if (!id) {
      return res.status(400).send({ message: 'playerId is required' });
    }
    if (!validDateFormat(date)) {
      return res.status(400).send({ message: 'date is invalid' });
    } else {
      return scrapeSinglePlayerTransaction(id, date).then(
        (data: ITransaction[]) => {
          res.send({ data });
        }
      );
    }
  }
}

export const playerController = new PlayerController();
