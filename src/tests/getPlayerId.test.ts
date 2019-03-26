import { BBALL_PREFIX } from '../settings';
import { getPlayerId } from '../utils';

test('return player id', () => {
  expect(getPlayerId(`${BBALL_PREFIX}/players/h/harrito02.html`)).toBe(
    'harrito02'
  );
  expect(getPlayerId(`${BBALL_PREFIX}/players/l/leonaka01.html`)).toBe(
    'leonaka01'
  );
});

test('return original string if id not found', () => {
  expect(getPlayerId('sdsddsd')).toBe('sdsddsd');
});
