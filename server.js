const express = require('express');
const bodyParser = require('body-parser');
const scrapTrades = require('./scraper');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/trade', (req, res) => {
  const { f1, f2 } = req.query;
  new Promise((resolve, reject) => {
    scrapTrades(f1, f2)
      .then(data => {
        resolve(data)
        res.send({ data })
      })
      .catch(err => reject(err))
  })
})

app.listen(port, () => console.log(`Listening on port ${port}`));

process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
  process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: Promise, ${p}, reason: ${reason}`);
  process.exit(1);
});