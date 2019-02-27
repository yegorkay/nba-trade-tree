const express = require('express');
const bodyParser = require('body-parser');
const services = require('./services');
const _ = require('lodash');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/trade', (req, res) => {
  const { f1, f2 } = req.query;
  scrapeMainTransaction(f1, f2).then((data) => {
    res.send({ data });
  });
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

app.get('/api/player-history', (req, res) => {
  services.scrapeSinglePlayerTransaction(link, tradeDate).then((data) => {
    res.send({ data });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: Promise, ${p}, reason: ${reason}`);
  process.exit(1);
});
