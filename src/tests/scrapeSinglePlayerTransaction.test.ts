// import { scrapeSinglePlayerTransaction } from './../services';
import nock from 'nock';

jest.setTimeout(30000);

test('test transaction API', () => {
  const playerId = 'hardeja01';

  nock('http://localhost')
    .get(`/api/player-history?id=${playerId}`)
    .reply(200, {
      data: [
        {
          status: 'drafted',
          transactionDate: 'June 25, 2009',
          tradedBy: 'OKC',
          tradedTo: '',
          tradedPlayers: [],
          tradedPicks: []
        }
      ]
    });

  // return scrapeSinglePlayerTransaction(playerId)
  //   .then((data: any) => data)
  //   .then((res: any) => expect(res).toEqual('GB'));
});
