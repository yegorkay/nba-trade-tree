import { React, Select, Component } from 'vendor';
import { connect } from 'utils';
import { appActions } from 'store';
import {
  IReduxState,
  ITeamSelectOption,
  IConnectedComponentProps,
  Dictionary,
  IAsyncStatus
} from 'models';
import { ITeam, ITrade } from 'shared';
import { TransactionContainer, Box, Flex } from 'components';
import { ErrorMessages } from 'messages';
// import { apiService } from 'services';

interface IAppProps {
  teams: ITeam[];
  teamSelectOptions: ITeamSelectOption[];
  tradeHistory: Dictionary<ITrade[]>;
  asyncStatus: IAsyncStatus;
}

interface IAppState {
  selectedOption: ITeamSelectOption[];
}

@connect(
  (state: IReduxState): IAppProps => ({
    teams: state.app.teams,
    teamSelectOptions: state.app.teamSelectOptions,
    tradeHistory: state.app.tradeHistory,
    asyncStatus: state.app.asyncStatus
  })
)
class App extends Component<IAppProps & IConnectedComponentProps, IAppState> {
  state = {
    selectedOption: []
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(appActions.getTeams());
  }

  handleChange = (selectedOption: ITeamSelectOption[]) => {
    this.setState({ selectedOption }, () =>
      this.handleTradeHistory(selectedOption)
    );
  };

  handleTradeHistory = (selectedOption: ITeamSelectOption[]) => {
    const { dispatch } = this.props;
    if (selectedOption.length === 0) {
      dispatch(appActions.resetTradeHistory());
    }
    if (selectedOption.length === 2) {
      const f1 = selectedOption[0].value;
      const f2 = selectedOption[1].value;
      dispatch(appActions.getTradeHistory(f1, f2));
    }
  };

  render() {
    const { selectedOption } = this.state;
    const { teamSelectOptions, tradeHistory, asyncStatus } = this.props;

    return (
      <Flex justifyContent="center">
        <Box width={1024} pt={5} pb={5}>
          <Select
            isMulti
            isDisabled={asyncStatus.start}
            onChange={this.handleChange}
            placeholder="Select a Team..."
            closeMenuOnSelect={selectedOption.length === 1}
            noOptionsMessage={() => ErrorMessages.MAX_TEAMS_SELECTED}
            options={selectedOption.length < 2 ? teamSelectOptions : []}
          />
          <TransactionContainer transactions={tradeHistory} />
        </Box>
      </Flex>
    );
  }
}

export { App };
