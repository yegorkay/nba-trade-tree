import {
  React,
  RouterLink,
  LinkProps,
  BoxProps,
  FunctionComponent,
  styled
} from 'vendor';
import { RebassLink } from 'components';

const LinkWrapper: FunctionComponent<LinkProps & BoxProps> = (props) => (
  <RebassLink {...props} as={RouterLink} />
);

const Link = styled(LinkWrapper)`
  text-decoration: none;
  color: inherit;
`;


export { Link };
