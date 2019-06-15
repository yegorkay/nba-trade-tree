import { React, Select, Component, _ } from 'vendor';
import { connect } from 'utils';
import { tradeActions } from 'store';
import {
  Dictionary,
  IAsyncStatus,
  IConnectedComponentProps,
  IGlobalState,
  ITeamQueryParams,
  ITeamSelectOption
} from 'models';
import { ITeam, ITrade } from 'shared';
import { TransactionContainer, Box, Flex } from 'components';
import { ErrorMessages } from 'messages';
import { routes } from 'routes';
import { formatService, appService } from 'services';

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
  (state: IGlobalState): IAppProps => ({
    teams: state.trade.teams,
    teamSelectOptions: state.trade.teamSelectOptions,
    tradeHistory: state.trade.tradeHistory,
    asyncStatus: state.settings.asyncStatus,
    queryParams: state.settings.queryParams
  })
)
class App extends Component<IAppProps & IConnectedComponentProps, IAppState> {
  state = {
    selectedOption: [],
    defaultValue: []
  };

  componentDidMount() {
    const { dispatch, queryParams, teamSelectOptions } = this.props;
    dispatch(tradeActions.getTeams());
    const hasQueryParams = queryParams.f1 !== '' && queryParams.f2 !== '';
    if (hasQueryParams) {
      this.setDefaultValue(teamSelectOptions, queryParams);
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
      this.setDefaultValue(nextProps.teamSelectOptions, nextProps.queryParams);
    }

    if (paramPropsNoMatch) {
      const { f1, f2 } = nextProps.queryParams;
      const noQueryParams = f1 === '' && f2 === '';

      if (!noQueryParams) {
        dispatch(tradeActions.getTradeHistory(f1, f2));
      }
    }
  }

  getDefaultValue = (
    teamSelectOptions: ITeamSelectOption[],
    queryParams: ITeamQueryParams
  ): ITeamSelectOption[] => {
    const getFieldIndex = (field: 'f1' | 'f2'): number =>
      formatService.getQueryIndexValue(queryParams[field], teamSelectOptions);
    const f1Index = getFieldIndex('f1');
    const f2Index = getFieldIndex('f2');

    const defaultValue = [
      teamSelectOptions[f1Index],
      teamSelectOptions[f2Index]
    ];
    return defaultValue;
  };

  setDefaultValue = (
    teamSelectOptions: ITeamSelectOption[],
    queryParams: ITeamQueryParams
  ) => {
    this.setState({
      defaultValue: this.getDefaultValue(teamSelectOptions, queryParams)
    });
  };

  handleChange = (selectedOption: ITeamSelectOption[]) => {
    this.setState({ selectedOption }, () =>
      this.handleTradeHistory(selectedOption)
    );
  };

  resetPage = () => {
    const { dispatch, history } = this.props;

    this.setState({ defaultValue: [] }, () => {
      dispatch(tradeActions.resetTradeHistory());
      appService.handleQueryParams(history, routes.root());
    });
  };

  fetchTradeHistory = (selectedOption: ITeamSelectOption[]) => {
    const { dispatch, teamSelectOptions, history } = this.props;

    const f1 = selectedOption[0].value;
    const f2 = selectedOption[1].value;

    dispatch(tradeActions.getTradeHistory(f1, f2));

    const getFieldIndex = (field: string) =>
      formatService.getQueryIndexValue(field, teamSelectOptions);

    this.setState({
      defaultValue: [
        teamSelectOptions[getFieldIndex(f1)],
        teamSelectOptions[getFieldIndex(f2)]
      ]
    });
    appService.handleQueryParams(history, routes.root(), `?f1=${f1}&f2=${f2}`);
  };

  handleTradeHistory = (selectedOption: ITeamSelectOption[]) => {
    const noSelectedOptions = selectedOption.length === 0;
    const twoSelectedOptions = selectedOption.length === 2;

    if (noSelectedOptions) {
      this.resetPage();
    }
    if (twoSelectedOptions) {
      this.fetchTradeHistory(selectedOption);
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
