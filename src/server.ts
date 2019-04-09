import { dbConfig } from './settings';
import * as pg from 'pg';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { playerController, tradeController } from './controllers';
import dotenv from 'dotenv';

const app = express();
const PORT: number = 5000;
const pool = new pg.Pool(dbConfig);

dotenv.config();

// * Testing adding values into DB
// const addPlayers = (_req: Request, res: Response) => {
//   pool.query(
//     `INSERT INTO trade (player_name, player_id, traded_by, traded_to, transaction_date) VALUES ${insertQuery}`,
//     (error) => {
//       if (error) {
//         throw error;
//       }
//       res.status(201).send(`players added`);
//     }
//   );
// };

const getPlayers = (_req: Request, res: Response) => {
  pool.query('SELECT * FROM trade', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/trade', tradeController.getAllTransactions);
app.get('/api/player-history', playerController.getPlayerHistory);
app.get('/api/test', getPlayers);
// app.post('/api/add', addPlayers);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: Promise, ${p}, reason: ${reason}`);
  process.exit(1);
});
