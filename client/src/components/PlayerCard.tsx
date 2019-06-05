import { React } from 'vendor';
import { ITrade } from 'shared';
import { Card, Text, Link } from 'components';
import { FunctionComponent } from 'models';
import { routes } from 'routes';

interface IPlayerCardProps {
  player: ITrade;
}

const PlayerCard: FunctionComponent<IPlayerCardProps> = (props) => {
  const { name, tradedBy, tradedTo, playerId } = props.player;
  return (
    <Card
      p={2}
      m={1}
      border={1}
      width={256}
      borderRadius={8}
      boxShadow="0 2px 6px rgba(0, 0, 0, 0.25)"
    >
      <Link to={routes.player(playerId)}>
        <Text mb={1}>{name}</Text>
        <Text mb={1}>Traded By: {tradedBy}</Text>
        <Text>Traded To: {tradedTo}</Text>
      </Link>
    </Card>
  );
};

export { PlayerCard };
