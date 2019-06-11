import { React, Select, Component, _ } from 'vendor';
import { connect } from 'utils';
import { appActions } from 'store';
import {
  Dictionary,
  IAsyncStatus,
  IConnectedComponentProps,
  IReduxState,
  ITeamQueryParams,
  ITeamSelectOption
} from 'models';
import { ITeam, ITrade } from 'shared';
import { TransactionContainer, Box, Flex } from 'components';
import { ErrorMessages } from 'messages';
import { routes } from 'routes';

interface IAppProps {
  teams: ITeam[];
  teamSelectOptions: ITeamSelectOption[];
  tradeHistory: Dictionary<ITrade[]>;
  asyncStatus: IAsyncStatus;
  queryParams: ITeamQueryParams;
}

interface IAppState {
  selectedOption: ITeamSelectOption[];
  defaultValue: ITeamSelectOption[]; // We have a default value to avoid the select component not rendering
}

@connect(
  (state: IReduxState): IAppProps => ({
    teams: state.app.teams,
    teamSelectOptions: state.app.teamSelectOptions,
    tradeHistory: state.app.tradeHistory,
    asyncStatus: state.app.asyncStatus,
    queryParams: state.app.queryParams
  })
)
class App extends Component<IAppProps & IConnectedComponentProps, IAppState> {
  state = {
    selectedOption: [],
    defaultValue: []
  };

  componentDidMount() {
    const { dispatch, queryParams, teamSelectOptions } = this.props;
    dispatch(appActions.getTeams());
    const hasQueryParams = queryParams.f1 !== '' && queryParams.f2 !== '';
    if (hasQueryParams) {
      this.handleDefaultValue(teamSelectOptions, queryParams);
    }
  }

  componentWillReceiveProps(nextProps: IAppProps) {
    const { dispatch, queryParams, teamSelectOptions } = this.props;

    const paramPropsNoMatch = !_.isEqual(queryParams, nextProps.queryParams);
    const selectOptionsNoMatch = !_.isEqual(
      teamSelectOptions,
      nextProps.teamSelectOptions
    );

    if (selectOptionsNoMatch) {
      this.handleDefaultValue(
        nextProps.teamSelectOptions,
        nextProps.queryParams
      );
    }

    if (paramPropsNoMatch) {
      const { f1, f2 } = nextProps.queryParams;
      const noQueryParams = f1 === '' && f2 === '';

      if (!noQueryParams) {
        dispatch(appActions.getTradeHistory(f1, f2));
      }
    }
  }

  getDefaultValue = (teamSelectOptions: ITeamSelectOption[], queryParams: ITeamQueryParams): ITeamSelectOption[] => {
    const getQueryValue = (query: string) =>
      teamSelectOptions.findIndex((team) => team.value === query);

    const f1 = getQueryValue(queryParams.f1);
    const f2 = getQueryValue(queryParams.f2);

    const defaultValue = [teamSelectOptions[f1], teamSelectOptions[f2]];
    return defaultValue;
  }

  handleDefaultValue = (
    teamSelectOptions: ITeamSelectOption[],
    queryParams: ITeamQueryParams
  ) => {
    this.setState({ defaultValue: this.getDefaultValue(teamSelectOptions, queryParams) });
  };

  handleChange = (selectedOption: ITeamSelectOption[]) => {
    this.setState({ selectedOption }, () =>
      this.handleTradeHistory(selectedOption)
    );
  };

  handleQueryParams = (search: string = '') => {
    const { history } = this.props;
    history.push({
      pathname: routes.root(),
      search
    });
  };

  handleTradeHistory = (selectedOption: ITeamSelectOption[]) => {
    const { dispatch, teamSelectOptions, queryParams } = this.props;
    if (selectedOption.length === 0) {
      dispatch(appActions.resetTradeHistory());
      this.handleQueryParams();
      this.setState({ defaultValue: [] })
    }
    if (selectedOption.length === 2) {
      const f1 = selectedOption[0].value;
      const f2 = selectedOption[1].value;
      dispatch(appActions.getTradeHistory(f1, f2));
      this.handleDefaultValue(teamSelectOptions, queryParams);
      this.handleQueryParams(`?f1=${f1}&f2=${f2}`);
    }
  };

  render() {
    const { selectedOption, defaultValue } = this.state;
    const { teamSelectOptions, tradeHistory, asyncStatus } = this.props;
    const options = selectedOption.length < 2 ? teamSelectOptions : [];
    /** This is a workaround to show `defaultValue` */
    const showSelect = asyncStatus.success || !asyncStatus.start;

    return (
      <Flex justifyContent="center">
        <Box width={1024} pt={5} pb={5}>
          {showSelect && (
            <Select
              isMulti
              defaultValue={defaultValue}
              isDisabled={asyncStatus.start}
              onChange={this.handleChange}
              placeholder="Select a Team..."
              closeMenuOnSelect={selectedOption.length === 1}
              noOptionsMessage={() => ErrorMessages.MAX_TEAMS_SELECTED}
              options={options}
            />
          )}
          <TransactionContainer
            transactions={tradeHistory}
            selectedOption={selectedOption}
          />
        </Box>
      </Flex>
    );
  }
}

export { App };
