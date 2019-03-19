import puppeteer from 'puppeteer';
import $ from "cheerio";
import { ITeam } from './../models';

export const scrapeTeamCodes = async () => {
  let data: ITeam[] = [];
  const rowSelector: string = 'tr:not(:first-child)';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://en.wikipedia.org/wiki/Wikipedia:WikiProject_National_Basketball_Association/National_Basketball_Association_team_abbreviations'
  );
  const html: string = await page.content();

  $(rowSelector, html).each((_i: number, ele: CheerioElement) => {
    const selector = (index: number): string =>
      $(ele)
        .children(`td:nth-child(${index})`)
        .text()
        .replace('\n', '');

    const teamAbr: string = selector(1);
    const teamName: string = selector(2);

    data.push({ teamAbr, teamName });
  });

  await browser.close();

  return data;
};
