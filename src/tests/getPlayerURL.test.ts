import { getPlayerURL } from '../utils';

test('return player id', () => {
  expect(getPlayerURL('harrito02')).toBe(
    'https://www.basketball-reference.com/players/h/harrito02.html'
  );
  expect(getPlayerURL('leonaka01')).toBe(
    'https://www.basketball-reference.com/players/l/leonaka01.html'
  );
});
