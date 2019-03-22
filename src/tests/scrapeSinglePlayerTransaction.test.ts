import nock from 'nock';

test('mock transaction API', () => {
  const playerId = 'hardeja01';

  nock('http://localhost')
    .get(`/api/player-history?id=${playerId}`)
    .reply(200, {
      data: [
        {
          "status": "drafted",
          "transactionDate": "June 25, 2009",
          "tradedBy": "OKC",
          "tradedTo": "",
          "tradedPlayers": [],
          "tradedPicks": []
        },
        {
          "status": "traded",
          "transactionDate": "October 27, 2012",
          "tradedBy": "OKC",
          "tradedTo": "HOU",
          "tradedPlayers": [
            {
              "name": "Cole Aldrich",
              "playerId": "aldrico01",
              "tradedBy": "OKC",
              "tradedTo": "HOU"
            },
            {
              "name": "Daequan Cook",
              "playerId": "cookda02",
              "tradedBy": "OKC",
              "tradedTo": "HOU"
            },
            {
              "name": "Lazar Hayward",
              "playerId": "haywala01",
              "tradedBy": "OKC",
              "tradedTo": "HOU"
            },
            {
              "name": "Jeremy Lamb",
              "playerId": "lambje01",
              "tradedBy": "HOU",
              "tradedTo": "OKC"
            },
            {
              "name": "Kevin Martin",
              "playerId": "martike02",
              "tradedBy": "HOU",
              "tradedTo": "OKC"
            }
          ],
          "tradedPicks": [
            {
              "name": "Steven Adams",
              "playerId": "adamsst01",
              "tradedBy": "HOU",
              "tradedTo": "OKC",
              "pick": "2013 1st round draft pick"
            },
            {
              "name": "Alex Abrines",
              "playerId": "abrinal01",
              "tradedBy": "HOU",
              "tradedTo": "OKC",
              "pick": "2013 2nd round draft pick"
            },
            {
              "name": "Mitch McGary",
              "playerId": "mcgarmi01",
              "tradedBy": "HOU",
              "tradedTo": "OKC",
              "pick": "2014 1st round draft pick"
            }
          ]
        },
        {
          "status": "signed",
          "transactionDate": "July 9, 2016",
          "tradedBy": "HOU",
          "tradedTo": "",
          "tradedPlayers": [],
          "tradedPicks": []
        },
        {
          "status": "signed",
          "transactionDate": "July 8, 2017",
          "tradedBy": "HOU",
          "tradedTo": "",
          "tradedPlayers": [],
          "tradedPicks": []
        }
      ]
    });
});
