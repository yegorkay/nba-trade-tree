import {
  React,
  RouterLink,
  LinkProps,
  BoxProps,
  FunctionComponent
} from 'vendor';
import { RebassLink } from 'components';

const Link: FunctionComponent<LinkProps & BoxProps> = (props) => (
  <RebassLink {...props} as={RouterLink} />
);

export { Link };
