const puppeteer = require('puppeteer');
const $ = require('cheerio');

const scrapeTeamCodes = async () => {
  let data = [];
  const selector = 'tr:not(:first-child)';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://en.wikipedia.org/wiki/Wikipedia:WikiProject_National_Basketball_Association/National_Basketball_Association_team_abbreviations'
  );
  const html = await page.content();

  $(selector, html).each(function() {
    const selector = (index) =>
      $(this)
        .children(`td:nth-child(${index})`)
        .text()
        .replace('\n', '');

    const teamAbr = selector(1);
    const teamName = selector(2);

    data.push({ teamAbr, teamName });
  });

  await browser.close();

  return data;
};

module.exports = scrapeTeamCodes;
