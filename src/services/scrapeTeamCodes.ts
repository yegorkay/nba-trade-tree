import puppeteer from 'puppeteer';
import $ from "cheerio";

export const scrapeTeamCodes = async () => {
  let data: any = [];
  const rowSelector = 'tr:not(:first-child)';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://en.wikipedia.org/wiki/Wikipedia:WikiProject_National_Basketball_Association/National_Basketball_Association_team_abbreviations'
  );
  const html = await page.content();

  $(rowSelector, html).each((i, ele) => {
    const selector = (index: number) =>
      $(ele)
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
