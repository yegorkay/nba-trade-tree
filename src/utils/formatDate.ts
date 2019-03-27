import moment from 'moment';
/**
 * Formats the bball-ref date to something we can use in a database
 * @param date Date string i.e. "June 21, 2006"
 * @returns formatted date `"June 21, 2006" => "2006-06-21"`
 */
export const formatDate = (date: string) => moment(new Date(date)).format('YYYY-MM-DD');