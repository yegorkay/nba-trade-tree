import { getPlayerId } from './../utils';

test('return player id', () => {
  expect(
    getPlayerId('https://basketball-reference.com/players/h/harrito02.html')
  ).toBe('harrito02');
  expect(
    getPlayerId('https://www.basketball-reference.com/players/l/leonaka01.html')
  ).toBe('leonaka01');
});

test('return original string if id not found', () => {
  expect(getPlayerId('sdsddsd')).toBe('sdsddsd');
});
