/**
 * Extracts the `year` out of a BBall-Ref date string
 * @param date The date you are pruning
 * @return Returns number `(July 11, 2012 => 2012)`
 */
const pruneDate = (date) => {
  /** i.e. `July 11, 2012` */
  const dateRegex = /\b(19|20)\d{2}\b/g;
  const match = date.match(dateRegex);
  return match ? parseInt(match[0]) : '';
};

/**
 * If the year of the transaction is `this year`
 * @param tradeYear The year you are checking
 * @return Returns boolean `(2000 => false)`
 */
const isCurrentYear = (tradeYear) => {
  const currentYear = new Date().getFullYear();
  if (
    pruneDate(tradeYear) === currentYear ||
    pruneDate(tradeYear) === currentYear - 1
  ) {
    return true;
  }
  return false;
};

module.exports = isCurrentYear;
