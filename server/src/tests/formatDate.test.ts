import { formatDate } from '../utils';

test('returns correct date format', () => {
  expect(formatDate('June 21, 2006')).toBe('2006-06-21');
});
