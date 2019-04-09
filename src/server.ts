import express from 'express';
import bodyParser from 'body-parser';
import { playerController, tradeController, dbController } from './controllers';
import dotenv from 'dotenv';

const PORT: number = 5000;
const app = express();
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/trade', tradeController.getAllTransactions);
app.get('/api/player-history', playerController.getPlayerHistory);
app.get('/api/test', dbController.getPlayers);
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
