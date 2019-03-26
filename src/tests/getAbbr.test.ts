import { getAbbr } from '../utils';

test('return team abbreviation', () => {
  expect(getAbbr('Toronto Raptors')).toBe('TOR');
});

test('return team if abbreviation not found', () => {
  expect(getAbbr('Toronto Raptorssss')).toBe('Toronto Raptorssss');
});
