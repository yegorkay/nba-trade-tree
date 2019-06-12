import { React, Component } from 'vendor';
import { IConnectedComponentProps } from 'models';

class Player extends Component<IConnectedComponentProps, {}> {
  render() {
    const { match } = this.props;

    return <div>{match.params['playerId']}</div>;
  }
}

export { Player };
