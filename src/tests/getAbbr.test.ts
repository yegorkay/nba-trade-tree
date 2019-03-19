import { getAbbr } from './../utils';

test('basic', () => {
  expect(getAbbr('Toronto Raptors')).toBe('TOR');
});
