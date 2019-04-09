import { Response, Request } from 'express';
import pg from 'pg';
import { dbConfig } from '../settings';
const pool = new pg.Pool(dbConfig);

class DBController {
  /**
   *
   * @param req Express Request
   * @param res Express Response
   * @returns Returns all transactions between two teams
   */
  getPlayers(_req: Request, res: Response) {
    return pool.query('SELECT * FROM trade', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
}

export const dbController = new DBController();
