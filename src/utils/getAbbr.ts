import { teamNames } from './../settings';

/**
 * Get the  `abbreviation` for a `team name`
 * @param teamName The team name to convert to an abbreviation.
 * @return Returns abbreviation `("Toronto Raptors" => "TOR")`
 */
export const getAbbr = (teamName: string): string => {
  if (teamName !== '') {
    const index: number = teamNames.findIndex(
      (team) => team.teamName === teamName
    );
    return index !== -1 ? teamNames[index].teamAbr : teamName;
  } else {
    return '';
  }
};
