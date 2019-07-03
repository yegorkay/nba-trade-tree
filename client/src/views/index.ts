export * from './Player';
export * from './Trade';

export const mockKawhi = [
  {
    status: 'traded',
    transactionDate: '2018-07-18',
    tradedBy: 'SAS',
    tradedTo: 'TOR',
    tradedPlayers: [
      {
        name: 'Danny Green',
        playerId: 'greenda02',
        tradedBy: 'SAS',
        tradedTo: 'TOR'
      },
      {
        name: 'DeMar DeRozan',
        playerId: 'derozde01',
        tradedBy: 'TOR',
        tradedTo: 'SAS'
      },
      {
        name: 'Jakob Poeltl',
        playerId: 'poeltja01',
        tradedBy: 'TOR',
        tradedTo: 'SAS'
      }
    ],
    tradedPicks: [
      {
        name: '',
        playerId: '',
        tradedBy: 'TOR',
        tradedTo: 'SAS',
        pick: '2019 1st round draft pick'
      }
    ]
  }
];

export const mockNash = [
  {
    status: 'traded',
    transactionDate: '2012-07-11',
    tradedBy: 'PHO',
    tradedTo: 'LAL',
    tradedPlayers: [],
    tradedPicks: [
      {
        name: 'Nemanja Nedovic',
        playerId: 'nedovne01',
        tradedBy: 'LAL',
        tradedTo: 'PHO',
        pick: '2013 1st round draft pick'
      },
      {
        name: 'Alex Oriakhi',
        playerId: 'oriakal01',
        tradedBy: 'LAL',
        tradedTo: 'PHO',
        pick: '2013 2nd round draft pick'
      },
      {
        name: "Johnny O'Bryant",
        playerId: 'obryajo01',
        tradedBy: 'LAL',
        tradedTo: 'PHO',
        pick: '2014 2nd round draft pick'
      },
      {
        name: 'Mikal Bridges',
        playerId: 'bridgmi01',
        tradedBy: 'LAL',
        tradedTo: 'PHO',
        pick: '2018 1st round draft pick'
      }
    ]
  },
  {
    status: 'retired',
    transactionDate: '2015-03-21',
    tradedBy: 'LAL',
    tradedTo: '',
    tradedPlayers: [],
    tradedPicks: []
  },
  {
    status: 'waived',
    transactionDate: '2015-04-01',
    tradedBy: 'LAL',
    tradedTo: '',
    tradedPlayers: [],
    tradedPicks: []
  }
];

export const mockNedo = [
  {
    status: 'traded',
    transactionDate: '2012-07-11',
    tradedBy: 'LAL',
    tradedTo: 'PHO',
    tradedPlayers: [
      {
        name: 'Steve Nash',
        playerId: 'nashst01',
        tradedBy: 'PHO',
        tradedTo: 'LAL'
      }
    ],
    tradedPicks: [
      {
        name: 'Alex Oriakhi',
        playerId: 'oriakal01',
        tradedBy: 'LAL',
        tradedTo: 'PHO',
        pick: '2013 2nd round draft pick'
      },
      {
        name: "Johnny O'Bryant",
        playerId: 'obryajo01',
        tradedBy: 'LAL',
        tradedTo: 'PHO',
        pick: '2014 2nd round draft pick'
      },
      {
        name: 'Mikal Bridges',
        playerId: 'bridgmi01',
        tradedBy: 'LAL',
        tradedTo: 'PHO',
        pick: '2018 1st round draft pick'
      }
    ]
  },
  {
    status: 'drafted',
    transactionDate: '2013-06-27',
    tradedBy: 'PHO',
    tradedTo: '',
    tradedPlayers: [],
    tradedPicks: []
  },
  {
    status: 'traded',
    transactionDate: '2013-06-27',
    tradedBy: 'PHO',
    tradedTo: 'GSW',
    tradedPlayers: [
      {
        name: 'Archie Goodwin',
        playerId: 'goodwar01',
        tradedBy: 'GSW',
        tradedTo: 'PHO'
      },
      {
        name: 'Malcolm Lee',
        playerId: 'leema01',
        tradedBy: 'GSW',
        tradedTo: 'PHO'
      }
    ],
    tradedPicks: []
  },
  {
    status: 'waived',
    transactionDate: '2014-11-11',
    tradedBy: 'GSW',
    tradedTo: '',
    tradedPlayers: [],
    tradedPicks: []
  }
];
