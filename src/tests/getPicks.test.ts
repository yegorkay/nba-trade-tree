
import { getPicks } from './../utils';

test('if picks are correct', () => {
  const testString = `<strong>October 27, 2012</strong>: Traded by the <a data-attr-from="OKC" href="/teams/OKC/2013.html">Oklahoma City Thunder</a> with <a href="/players/a/aldrico01.html">Cole Aldrich</a>, <a href="/players/c/cookda02.html">Daequan Cook</a> and <a href="/players/h/haywala01.html">Lazar Hayward</a> to the <a data-attr-to="HOU" href="/teams/HOU/2013.html">Houston Rockets</a> for <a href="/players/l/lambje01.html">Jeremy Lamb</a>, <a href="/players/m/martike02.html">Kevin Martin</a>, a 2013 1st round draft pick (<a href="/players/a/adamsst01.html">Steven Adams</a> was later selected), a 2013 2nd round draft pick (<a href="/players/a/abrinal01.html">Alex Abrines</a> was later selected) and a 2014 1st round draft pick (<a href="/players/m/mcgarmi01.html">Mitch McGary</a> was later selected).`;
  const result = [
    {
      name: 'Steven Adams',
      playerId: 'adamsst01',
      tradedBy: 'HOU',
      tradedTo: 'OKC',
      pick: '2013 1st round draft pick'
    },
    {
      name: 'Alex Abrines',
      playerId: 'abrinal01',
      tradedBy: 'HOU',
      tradedTo: 'OKC',
      pick: '2013 2nd round draft pick'
    },
    {
      name: 'Mitch McGary',
      playerId: 'mcgarmi01',
      tradedBy: 'HOU',
      tradedTo: 'OKC',
      pick: '2014 1st round draft pick'
    }
  ];
  expect(getPicks(testString)).toEqual(result);
});

test('if picks are correct in multi-team scenario', () => {
  const testString = `<strong>February 7, 2019</strong>: As part of a 3-team trade, traded by the <a data-attr-from="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a> to the <a data-attr-to="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a>; the <a data-attr-from="DET" href="/teams/DET/2019.html">Detroit Pistons</a> traded <a href="/players/j/johnsst04.html">Stanley Johnson</a> to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>; the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/m/makerth01.html">Thon Maker</a> to the <a data-attr-to="DET" href="/teams/DET/2019.html">Detroit Pistons</a>; and  the <a data-attr-from="MIL" href="/teams/MIL/2019.html">Milwaukee Bucks</a> traded <a href="/players/s/smithja02.html">Jason Smith</a>, a 2019 2nd round draft pick, a 2020 2nd round draft pick, a 2020 2nd round draft pick and a 2021 2nd round draft pick to the <a data-attr-to="NOP" href="/teams/NOP/2019.html">New Orleans Pelicans</a>. (Pick is DEN's 2019 second-round pick, top-55 protected.) (Pick is WAS's 2020 second-round pick.) (Pick is WAS's 2021 second-round pick.)`;
  const result = [
    {
      name: '',
      playerId: '',
      tradedBy: 'MIL',
      tradedTo: 'NOP',
      pick: '2019 2nd round draft pick'
    },
    {
      name: '',
      playerId: '',
      tradedBy: 'MIL',
      tradedTo: 'NOP',
      pick: '2020 2nd round draft pick'
    },
    {
      name: '',
      playerId: '',
      tradedBy: 'MIL',
      tradedTo: 'NOP',
      pick: '2020 2nd round draft pick'
    },
    {
      name: '',
      playerId: '',
      tradedBy: 'MIL',
      tradedTo: 'NOP',
      pick: '2021 2nd round draft pick'
    }
  ];
  expect(getPicks(testString)).toEqual(result);
});
