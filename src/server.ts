import { ITransaction, ITrade } from './models';
import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import {
  scrapeMainTransaction,
  scrapeSinglePlayerTransaction
} from './services';
const app = express();
const PORT: number = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/trade', (req, res) => {
  const { f1, f2 } = req.query;
  scrapeMainTransaction(f1, f2).then((data: ITrade[]) => {
    res.send({ data });
  });
});

app.get('/api/player-history', (req, res) => {
  const { id } = req.query;
  scrapeSinglePlayerTransaction(id).then((data: ITransaction[]) => {
    res.send({ data });
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: Promise, ${p}, reason: ${reason}`);
  process.exit(1);
});
