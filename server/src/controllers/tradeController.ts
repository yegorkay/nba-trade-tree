import { ITrade } from '../models';
import { Dictionary } from 'lodash';
import { scrapeMainTransaction } from '../services';
import { Response, Request } from 'express';

class TradeController {
  /**
   *
   * @param req Express Request
   * @param res Express Response
   * @returns Returns all transactions between two teams
   */
  getAllTransactions(req: Request, res: Response) {
    const { f1, f2 } = req.query;
    const error = (field: string) =>
      res.status(400).send({ message: `${field} is required` });

    if (!f1) {
      return error('f1');
    }
    if (!f2) {
      return error('f2');
    } else {
      return scrapeMainTransaction(f1, f2).then(
        (data: Dictionary<ITrade[]>) => {
          res.send({ data });
        }
      );
    }
  }
}

export const tradeController = new TradeController();
