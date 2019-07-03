import { React, moment } from 'vendor';
import { FunctionComponent } from 'models';

interface IDateProps {
  date: string;
}

const FormattedDate: FunctionComponent<IDateProps> = (props) => {
  const { date } = props;
  const format = 'MMMM Do YYYY';
  return <>{moment(new Date(date)).format(format)}</>;
};

export { FormattedDate };
