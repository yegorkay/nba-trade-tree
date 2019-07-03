import { React, Component, _ } from 'vendor';
import { IConnectedComponentProps, IGlobalState } from 'models';
// import { playerActions } from 'store';
import { connect } from 'services';
import { ITransaction } from 'shared';
import { Box, Text, TradeContainer } from 'components';
import { mockNash, mockNedo } from 'views';

interface IPlayerProps {
  playerHistory: ITransaction[];
}

@connect(
  (state: IGlobalState): IPlayerProps => ({
    playerHistory: state.playerHistory.playerHistory
  })
)
class Player extends Component<IPlayerProps & IConnectedComponentProps, {}> {
  // componentDidMount() {
  //   const { match, dispatch } = this.props;
  //   const getParam = (param: 'playerId' | 'date'): string =>
  //     match.params[param];
  //   const playerId = getParam('playerId');
  //   const date = getParam('date');
  //   dispatch(playerActions.getPlayerHistory(playerId, date));
  // }

  getFirstTransactionData2 = (): ITransaction => {
    const { playerHistory = [] } = this.props;
    return playerHistory[0];
  };

  render() {
    const { match } = this.props;
    console.log(mockNedo);

    // const transaction: ITransaction = this.getFirstTransactionData2();
    // const firstTransactionExists = !_.isEmpty(transaction);
    return (
      <Box>
        <Text textAlign="center">{match.params['playerId']}</Text>
        <TradeContainer transaction={mockNash[0]} />
        {/* {firstTransactionExists && <TradeContainer {...{ transaction }} />} */}
      </Box>
    );
  }
}

export { Player };
