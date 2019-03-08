/**
 * Regex test for if a string is a multi-team trade
 * @param teamsInvolved The string you are testing
 * @return Returns if string contains  `("3-team trade" => true)`
 */
const isMultiTeam = (teamsInvolved) => {
  return /([3-9]|[12][0-9]|30)/g.test(teamsInvolved);
};

module.exports = isMultiTeam;
