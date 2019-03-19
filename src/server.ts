import express from 'express';
import bodyParser from 'body-parser';
import _ from 'lodash';
import { scrapeTeamCodes, scrapeSinglePlayerTransaction } from './services';
const app = express();
const PORT: number = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/trade', (req, res) => {
  const { f1, f2 } = req.query;
  // services.scrapeMainTransaction(f1, f2).then((data: any) => {
  //   res.send({ data });
  // });
  scrapeTeamCodes().then((data: any) => res.send({ data }));
});

const data = [
  {
    player: 'Steve Nash',
    prevTeam: 'PHO',
    currTeam: 'LAL',
    link:
      'https://www.basketball-reference.com/players/n/nashst01.html#all_transactions',
    tradeDate: 'July 11, 2012'
  },
  {
    player: 'Nemanja Nedovic',
    prevTeam: 'LAL',
    currTeam: 'PHO',
    link:
      'https://www.basketball-reference.com/players/n/nedovne01.html#all_transactions',
    tradeDate: 'July 11, 2012'
  },
  {
    player: 'Mikal Bridges',
    prevTeam: 'LAL',
    currTeam: 'PHO',
    link:
      'https://www.basketball-reference.com/players/b/bridgmi01.html#all_transactions',
    tradeDate: 'July 11, 2012'
  },
  {
    player: 'Alex Oriakhi',
    prevTeam: 'LAL',
    currTeam: 'PHO',
    link:
      'https://www.basketball-reference.com/players/o/oriakal01.html#all_transactions',
    tradeDate: 'July 11, 2012'
  },
  {
    player: "Johnny O'Bryant",
    prevTeam: 'LAL',
    currTeam: 'PHO',
    link:
      'https://www.basketball-reference.com/players/o/obryajo01.html#all_transactions',
    tradeDate: 'July 11, 2012'
  }
];

// front end will sort this
const sortedBycurrTeam = _.groupBy(data, 'currTeam');

const { tradeDate, link } = sortedBycurrTeam.PHO[0];
/**
 * if tradedPicks is empty
 * if this current season (2018-2019)
 * scrape all picks (if they exist)
 * else
 * return empty array
 */

/** Need to figure out three or more team trades */

const toby =
  'https://www.basketball-reference.com/players/h/harrito02.html#all_transactions';
const date = 'June 23, 2011';

const harden =
  'https://www.basketball-reference.com/players/h/hardeja01.html#all_transactions';
// const date = 'October 27, 2012';

const kawhi = 'https://www.basketball-reference.com/players/l/leonaka01.html';
// const date = 'July 18, 2018';

app.get('/api/player-history', (req, res) => {
  scrapeSinglePlayerTransaction(toby, date).then((data: any) => {
    // scrapeSinglePlayerTransaction(link, tradeDate).then((data) => {
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
