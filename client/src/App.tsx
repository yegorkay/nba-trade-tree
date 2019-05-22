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

@connect(
  (state: IReduxState): IAppProps => ({
    teams: state.app.teams,
    teamSelectOptions: state.app.teamSelectOptions
  })
)
class App extends React.Component<IAppProps & IConnectedComponentProps, {}> {
  state = {
    selectedOption: null
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(appActions.getTeams());
  }

  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    const { teamSelectOptions } = this.props;
    return (
      <div>
        <Select
          options={teamSelectOptions}
          placeholder="Select a Team..."
          onChange={this.handleChange}
        />
        <Select
          options={teamSelectOptions}
          placeholder="Select a Team..."
          isDisabled={selectedOption === null}
        />
      </div>
    );
  }
}

export { App };
