import { teamNames } from '../settings';

interface IOrderedTeam {
  abbr: string;
  stringIndex: number;
}

/**
 * Sorts array of teams by `stringIndex` property
 * @param {*} a First element
 * @param {*} b Second element
 * @return {*} Returns sorted array of teams
 */
const compareStringIndex = (a: IOrderedTeam, b: IOrderedTeam) => {
  if (a.stringIndex < b.stringIndex) {
    return -1;
  }
  if (a.stringIndex > b.stringIndex) {
    return 1;
  }
  return 0;
};

/**
 * Finds all existing teams in a string, and returns the array of teams in order of appearance
 * @param {*} tradeString The string where we will find our teams in
 * @return {*} Returns an array of teams 
 */
export const getTeamsInString = (tradeString: string): string[] => {
  // any should be string | string[], come back to it
  let teams: IOrderedTeam[] = [];
  for (let i = 0; i < teamNames.length; i++) {
    const team: string = teamNames[i].teamName;
    if (new RegExp(`\\b${team}\\b`, 'g').test(tradeString)) {
      /**
       * might need to optimize this... I am seeing which index is first, sorting the array
       * by index size, then mapping it over to get back the teams I want in order...
       */
      teams.push({
        abbr: teamNames[i].teamAbr,
        stringIndex: tradeString.indexOf(team)
      });
    }
  }

  return teams.sort(compareStringIndex).map((team) => team.abbr);
};