import { getTeamsInString } from './../utils';

test('return two teams in the string', () => {
  expect(
    getTeamsInString('The San Antonio Spurs and the Los Angeles Lakers')
  ).toEqual(['SAS', 'LAL']);
});

test('return three teams in the string', () => {
  expect(
    getTeamsInString(
      'The San Antonio Spurs and the Los Angeles Lakers as well as the Phoenix Suns'
    )
  ).toEqual(['SAS', 'LAL', 'PHX']);
});

test('return no teams if they are typed incorrectly', () => {
  expect(
    getTeamsInString(
      'The San Aonio Spurs and the Los Angeles Lakrs as well as the Phoenix Sus'
    )
  ).toEqual([]);
});
