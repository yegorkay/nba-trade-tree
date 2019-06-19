import { React, Component, _ } from 'vendor';
import { IConnectedComponentProps, IGlobalState } from 'models';
import { playerActions } from 'store';
import { connect, formatService } from 'services';
import { ITransaction } from 'shared';
import { Box, Text } from 'components';

interface IFirstTransactionProps {
  transaction: ITransaction;
}

const FirstTransaction = (props: IFirstTransactionProps) => {
  const {
    tradedPicks = [],
    tradedPlayers = [],
    transactionDate,
    tradedTo
  } = props.transaction;
  const filterForPlayer = (picksOrPlayers: any[] /**  IPlayer[] */) =>
    picksOrPlayers.filter((player) => player.tradedBy === tradedTo);
  const picksForPlayer = filterForPlayer(tradedPicks);
  const playersForPlayer = filterForPlayer(tradedPlayers);
  return (
    <>
      <Text>Transaction Date: {formatService.formatDate(transactionDate)}</Text>
      <Text>Traded for:</Text>
      {picksForPlayer.map((player) => (
        <Text>{player.name}</Text>
      ))}
      {playersForPlayer.map((player) => (
        <Text>{player.name}</Text>
      ))}
    </>
  );
};

interface IPlayerProps {
  playerHistory: ITransaction[];
}

@connect(
  (state: IGlobalState): IPlayerProps => ({
    playerHistory: state.playerHistory.playerHistory
  })
)
class Player extends Component<IPlayerProps & IConnectedComponentProps, {}> {
  componentDidMount() {
    const { match, dispatch } = this.props;
    const getParam = (param: 'playerId' | 'date'): string =>
      match.params[param];
    const playerId = getParam('playerId');
    const date = getParam('date');
    dispatch(playerActions.getPlayerHistory(playerId, date));
  }

  getFirstTransactionData2 = (): ITransaction => {
    const { playerHistory = [] } = this.props;
    return playerHistory[0];
  };

  render() {
    const { match } = this.props;

    const transaction: ITransaction = this.getFirstTransactionData2();
    const firstTransactionExists = !_.isEmpty(transaction);
    return (
      <Box>
        <Text>{match.params['playerId']}</Text>
        {firstTransactionExists && <FirstTransaction {...{ transaction }} />}
      </Box>
    );
  }
}

export { Player };
