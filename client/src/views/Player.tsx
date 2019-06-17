import { React, Component } from 'vendor';
import { IConnectedComponentProps, IGlobalState } from 'models';
import { playerActions } from 'store';
import { connect } from 'services';
import { ITransaction } from 'shared';

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

  render() {
    const { match, playerHistory } = this.props;
    console.log(playerHistory);
    return <div>{match.params['playerId']}</div>;
  }
}

export { Player };
