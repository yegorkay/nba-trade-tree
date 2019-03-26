import nock from 'nock';

test('mock main transaction API', () => {

  nock('http://localhost')
    .get(`/api/trade?f1=SAS&f2=TOR`)
    .reply(200, {
      data: {
        "July 18, 2018": [
          {
            "name": "Kawhi Leonard",
            "playerId": "leonaka01",
            "tradedBy": "SAS",
            "tradedTo": "TOR",
            "transactionDate": "July 18, 2018"
          },
          {
            "name": "Danny Green",
            "playerId": "greenda02",
            "tradedBy": "SAS",
            "tradedTo": "TOR",
            "transactionDate": "July 18, 2018"
          },
          {
            "name": "DeMar DeRozan",
            "playerId": "derozde01",
            "tradedBy": "TOR",
            "tradedTo": "SAS",
            "transactionDate": "July 18, 2018"
          },
          {
            "name": "Jakob Poeltl",
            "playerId": "poeltja01",
            "tradedBy": "TOR",
            "tradedTo": "SAS",
            "transactionDate": "July 18, 2018"
          }
        ],
        "February 20, 2014": [
          {
            "name": "Nando de Colo",
            "playerId": "decolna01",
            "tradedBy": "SAS",
            "tradedTo": "TOR",
            "transactionDate": "February 20, 2014"
          },
          {
            "name": "Austin Daye",
            "playerId": "dayeau01",
            "tradedBy": "TOR",
            "tradedTo": "SAS",
            "transactionDate": "February 20, 2014"
          }
        ],
        "June 28, 2007": [
          {
            "name": "Giorgos Printezis",
            "playerId": "printgi01",
            "tradedBy": "SAS",
            "tradedTo": "TOR",
            "transactionDate": "June 28, 2007"
          },
          {
            "name": "Goran Dragic",
            "playerId": "dragigo01",
            "tradedBy": "TOR",
            "tradedTo": "SAS",
            "transactionDate": "June 28, 2007"
          }
        ],
        "June 21, 2006": [
          {
            "name": "Matt Bonner",
            "playerId": "bonnema01",
            "tradedBy": "TOR",
            "tradedTo": "SAS",
            "transactionDate": "June 21, 2006"
          },
          {
            "name": "Eric Williams",
            "playerId": "willier01",
            "tradedBy": "TOR",
            "tradedTo": "SAS",
            "transactionDate": "June 21, 2006"
          },
          {
            "name": "Jack McClinton",
            "playerId": "",
            "tradedBy": "TOR",
            "tradedTo": "SAS",
            "transactionDate": "June 21, 2006"
          },
          {
            "name": "Rasho Nesterovic",
            "playerId": "nestera01",
            "tradedBy": "SAS",
            "tradedTo": "TOR",
            "transactionDate": "June 21, 2006"
          }
        ]
      }
    });
});
