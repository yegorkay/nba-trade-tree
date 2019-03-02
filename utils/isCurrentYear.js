const pruneDate = (date) => {
  const dateRegex = /\b(19|20)\d{2}\b/g;
  const match = date.match(dateRegex);
  return match ? parseInt(match[0]) : '';
};

const isCurrentYear = (tradeYear) => {
  const currentYear = new Date().getFullYear();
  const prevYear = currentYear - 1;
  if (
    pruneDate(tradeYear) === currentYear ||
    pruneDate(tradeYear) === prevYear
  ) {
    return true;
  }
  return false;
};

module.exports = isCurrentYear;
