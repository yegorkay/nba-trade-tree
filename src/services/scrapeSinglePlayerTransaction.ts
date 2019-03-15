import { IPlayer } from './../models';
import puppeteer from 'puppeteer';
import $ from "cheerio";
import {
  getAbbr,
  pruneTradedPlayers,
  getPicks,
  getPlayerId,
  oneToOneTrade,
  multiTeamTrade
} from './../utils';

const gLeague = 'G-League';

// TODO export this
interface ISinglePlayerTransaction {
  status: string;
  transactionDate: string;
  tradedBy: string;
  tradedTo: string;
  tradedPlayers: any;
  tradedPicks: IPlayer[];
}

/**
 * @param {*} htmlString (our tradedString)
 * @param {*} index (1 = status, 5 = allTeamsInvolved, 7 = status (multi-team))
 * @return {*} Specified string based on the index you pass. See `param` above
 */
const splitTradeString = (htmlString: Cheerio, index: number) => {
  return htmlString
    .clone()
    .find('strong:nth-child(1)')
    .remove()
    .end()
    .text()
    .split(' ')[index];
};

export const scrapeSinglePlayerTransaction = async (playerUrl: string, playerTradeDate: string) => {
  let data: ISinglePlayerTransaction[] = [];
  const selector = '#div_transactions p';

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(playerUrl);
  const html = await page.content();

  $(selector, html).each((_i: number, ele: CheerioElement) => {
    const tradeString = $(ele).text();
    const isGLeague = tradeString.indexOf(gLeague) !== -1;

    const isMultiTrade = tradeString.includes('As part of a ');

    const status = splitTradeString(
      $(ele),
      isMultiTrade ? 7 : 1
    ).toLowerCase();
    const isNotTraded = status !== 'traded';

    const transactionDate = $(ele)
      .children('strong:nth-child(1)')
      .text();

    const tradedBy = getAbbr(
      $(ele)
        .children('strong:first-child + a')
        .text()
    );

    /**
     * we are going to return an array and get the
     * first element since it's cleaner than a
     * ternary if we had a multi team trade
     */
    const tradedTo = getAbbr(
      $(ele)
        .children('a[data-attr-to]')
        .map((_i: number, ele: CheerioElement) => {
          return $(ele).text();
        })
        .get()[0]
    );

    const tradedPlayers = $(ele)
      .children('a:not(:nth-of-type(-n + 1))')
      .map((_i: number, ele: CheerioElement) => {
        return {
          name: $(ele).text(),
          playerId: getPlayerId($(ele).attr('href'))
        };
      })
      .get();

    if (!isGLeague) {
      const tradedPicks = isNotTraded ? [] : getPicks($(ele).html());
      data.push({
        status,
        transactionDate,
        tradedBy,
        tradedTo: isNotTraded ? '' : tradedTo,
        tradedPlayers: isMultiTrade
          ? multiTeamTrade(tradedPlayers, tradedBy)
          : pruneTradedPlayers(
            oneToOneTrade($(ele), tradedBy, tradedTo),
            tradedPicks
          ),
        tradedPicks
      });
    }
  });

  await browser.close();

  const dateTradedIndex = data.findIndex(
    (date) => date.transactionDate === playerTradeDate
  );

  return data.splice(dateTradedIndex);
};