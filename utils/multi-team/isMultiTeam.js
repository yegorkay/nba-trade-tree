/** i.e. if string contains "3-team" */
const isMultiTeam = (teamsInvolved) => {
  return /([3-9]|[12][0-9]|30)/g.test(teamsInvolved);
};

module.exports = isMultiTeam;
