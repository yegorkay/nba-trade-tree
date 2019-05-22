import { React, Select } from 'vendor';
import { connect } from 'utils';
import { appActions } from 'store';
import {
  IReduxState,
  ITeamSelectOption,
  IConnectedComponentProps
} from 'models';
import { ITeam } from 'shared';

interface IAppProps {
  teams: ITeam[];
  teamSelectOptions: ITeamSelectOption[];
}

interface IAppState {
  selectedOption: ITeamSelectOption[];
}

@connect(
  (state: IReduxState): IAppProps => ({
    teams: state.app.teams,
    teamSelectOptions: state.app.teamSelectOptions
  })
)
class App extends React.Component<
  IAppProps & IConnectedComponentProps,
  IAppState
> {
  state = {
    selectedOption: []
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(appActions.getTeams());
  }

  handleChange = (selectedOption: ITeamSelectOption[]) => {
    const { dispatch } = this.props;
    this.setState({ selectedOption });
    if (selectedOption.length === 2) {
      const f1 = selectedOption[0].value;
      const f2 = selectedOption[1].value;
      dispatch(appActions.getTradeHistory(f1, f2));
    }
  };

  render() {
    const { selectedOption } = this.state;
    const { teamSelectOptions } = this.props;

    return (
      <div>
        <Select
          options={selectedOption.length < 2 ? teamSelectOptions : []}
          placeholder="Select a Team..."
          onChange={this.handleChange}
          closeMenuOnSelect={selectedOption.length === 1}
          isMulti
          noOptionsMessage={() =>
            'You are only able to select two teams at a time.'
          }
        />
      </div>
    );
  }
}

export { App };
