import moment from 'moment';
import { formats } from '../settings';

/**
 * Checks if the date matches the formate
 * @param date Date string i.e. "2012-01-01"
 * @returns boolean if the date matches the format of `YYYY-MM-DD`
 */
export const validDateFormat = (date: string) =>
  moment(date, formats.DATE, true).isValid();
