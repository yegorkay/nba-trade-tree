import { ITransaction } from '../models';
import puppeteer from 'puppeteer';
import $ from 'cheerio';
import {
  getAbbr,
  getPicks,
  getTradedPlayers,
  getPlayerURL,
  formatDate
} from '../utils';

const gLeague = 'G-League';

/**
 * @param {*} htmlString (our tradedString)
 * @param {*} index (1 = status, 5 = allTeamsInvolved, 7 = status (multi-team))
 * @return {*} Specified string based on the index you pass. See `param` above
 */
const splitTradeString = (htmlString: Cheerio, index: number): string => {
  return htmlString
    .clone()
    .find('strong:nth-child(1)')
    .remove()
    .end()
    .text()
    .split(' ')[index];
};

/**
 * Get the transaction history for the player we are searching
 * @param {*} playerId The bball-ref playerId in the URL
 * @return {*} Returns the full transaction history of the player's NBA career
 */
export const scrapeSinglePlayerTransaction = async (
  playerId: string,
  playerTradeDate?: string
) => {
  let data: ITransaction[] = [];
  const selector = '#div_transactions p';

  const playerPage: string = getPlayerURL(playerId);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(playerPage);
  const html = await page.content();

  $(selector, html).each((_i: number, ele: CheerioElement) => {
    const tradeString: string = $(ele).text();
    const tradeHtml: string | null = $(ele).html();
    const isGLeague: boolean = tradeString.indexOf(gLeague) !== -1;

    const isMultiTrade: boolean = tradeString.includes('As part of a ');

    const status = splitTradeString($(ele), isMultiTrade ? 7 : 1).toLowerCase();
    const isNotTraded = status !== 'traded';

    const transactionDate: string = formatDate(
      $(ele)
        .children('strong:nth-child(1)')
        .text()
    );

    const tradedBy: string = getAbbr(
      $(ele)
        .children('strong:first-child + a')
        .text()
    );

    /**
     * we are going to return an array and get the
     * first element since it's cleaner than a
     * ternary if we had a multi team trade
     */
    const tradedTo: string = getAbbr(
      $(ele)
        .children('a[data-attr-to]')
        .map((_i: number, tradedTo: CheerioElement) => {
          return $(tradedTo).text();
        })
        .get()[0]
    );

    if (!isGLeague) {
      const tradedPicks = isNotTraded ? [] : getPicks(tradeHtml);
      data.push({
        status,
        transactionDate,
        tradedBy,
        tradedTo: isNotTraded ? '' : tradedTo,
        tradedPlayers: getTradedPlayers(tradeHtml, tradedBy, tradedTo),
        tradedPicks
      });
    }
  });

  /** This is used to return data for all transaction after a certain date if the date is provided */
  const dateTradedIndex = data.findIndex(
    (transaction) => transaction.transactionDate === playerTradeDate
  );

  const hasDateTraded = dateTradedIndex !== -1;

  await browser.close();

  return hasDateTraded ? data.splice(dateTradedIndex) : data;
};
