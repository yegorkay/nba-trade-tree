const getDraftPick = (str, playerDraftPosition = '') => {
  /**ex: 2013 1st round draft pick */
  const assetRegex = /(\b(19|20)\d{2}\b\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round draft pick))/g;
  /**ex: 1st round (30th pick) */
  const draftedRegex = /(([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(round)\s\(([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\s(pick\)))/g;
  const isMatch = str.match(assetRegex) || str.match(draftedRegex);
  return isMatch
    ? isMatch.filter((asset) => asset !== playerDraftPosition)
    : [];
};

const stringTest = "Traded by the Boston Celtics with Paul Pierce, Jason Terry, D.J. White, a 2017 1st round draft pick (Kyle Kuzma was later selected) and a 2017 2nd round draft pick (Aleksandar Vezenkov was later selected) to the Brooklyn Nets for Keith Bogans, MarShon Brooks, Kris Humphries, Kris Joseph, Gerald Wallace, a 2014 1st round draft pick (James Young was later selected), a 2016 1st round draft pick (Jaylen Brown was later selected), a 2017 1st round draft pick (Markelle Fultz was later selected) and a 2018 1st round draft pick (Collin Sexton was later selected). (BOS got 2017 #1 overall pick from BRK as result of pick swap)";

const arr = [
  {
    "name": "Paul Pierce",
    "link": "https://www.basketball-reference.com/players/p/piercpa01.html"
  },
  {
    "name": "Jason Terry",
    "link": "https://www.basketball-reference.com/players/t/terryja01.html"
  },
  {
    "name": "D.J. White",
    "link": "https://www.basketball-reference.com/players/w/whitedj01.html"
  },
  {
    "name": "Kyle Kuzma",
    "link": "https://www.basketball-reference.com/players/k/kuzmaky01.html"
  },
  {
    "name": "Aleksandar Vezenkov",
    "link": "https://www.basketball-reference.com/players/v/vezenal01.html"
  },
  {
    "name": "Keith Bogans",
    "link": "https://www.basketball-reference.com/players/b/boganke01.html"
  },
  {
    "name": "MarShon Brooks",
    "link": "https://www.basketball-reference.com/players/b/brookma01.html"
  },
  {
    "name": "Kris Humphries",
    "link": "https://www.basketball-reference.com/players/h/humphkr01.html"
  },
  {
    "name": "Kris Joseph",
    "link": "https://www.basketball-reference.com/players/j/josepkr01.html"
  },
  {
    "name": "Gerald Wallace",
    "link": "https://www.basketball-reference.com/players/w/wallage01.html"
  },
  {
    "name": "James Young",
    "link": "https://www.basketball-reference.com/players/y/youngja01.html"
  },
  {
    "name": "Jaylen Brown",
    "link": "https://www.basketball-reference.com/players/b/brownja02.html"
  },
  {
    "name": "Markelle Fultz",
    "link": "https://www.basketball-reference.com/players/f/fultzma01.html"
  },
  {
    "name": "Collin Sexton",
    "link": "https://www.basketball-reference.com/players/s/sextoco01.html"
  }
];

const matchTest = (str, player) => {
  const regex = new RegExp(`(\\b(19|20)\\d{2}\\b\\s([1-9]|[1-5][0-9]|60)(?:st|nd|rd|th)\\s(round draft pick))\\s(\\()(${player})`, 'g');
  const match = str.match(regex);
  return match ? match[0] : '';
}

const getPickArray = (playerArray, tradeString) => playerArray.map((player) => {
  const { name, link } = player;
  const draftString = matchTest(tradeString, name).split("(");
  return {
    name: draftString[1],
    link: link,
    pick: draftString[0].trim()
  }
}).filter((player) => player.name !== '')


// console.log(getPickArray(arr, stringTest))


module.exports = getDraftPick;
