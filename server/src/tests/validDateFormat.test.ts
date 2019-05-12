import { validDateFormat } from '../utils';

test('validation will fail', () => {
  expect(validDateFormat('June 21, 2006')).toEqual(false);
});

test('validation will pass', () => {
  expect(validDateFormat('2012-01-01')).toEqual(true);
});
