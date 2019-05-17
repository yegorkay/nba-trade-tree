import express from 'express';
import bodyParser from 'body-parser';
import { routes } from '../../shared';
import {
  playerController,
  tradeController,
  teamController
} from './controllers';
const app = express();
const PORT: number = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(routes.TRADE, tradeController.getAllTransactions);
app.get(routes.PLAYER_HISTORY, playerController.getPlayerHistory);
app.get(routes.TEAMS, teamController.getAllTeams);

/**if `not` return `not-signed` */
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: Promise, ${p}, reason: ${reason}`);
  process.exit(1);
});
