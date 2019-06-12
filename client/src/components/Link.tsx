import {
  React,
  styled
} from 'vendor';
import { FunctionComponent, BoxProps, LinkProps } from 'models';
import { RebassLink, RouterLink } from 'components';

const LinkWrapper: FunctionComponent<LinkProps & BoxProps> = (props) => (
  <RebassLink {...props} as={RouterLink} />
);

const Link = styled(LinkWrapper)`
  text-decoration: none;
  color: inherit;
`;


export { Link };
