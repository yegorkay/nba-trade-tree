import { React, Select, connect } from 'vendor';
import { appActions } from 'store';
import { IReduxState } from 'models';

class App extends React.Component<any, any> {
  state = {
    teamData: [],
    selectedOption: null
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(appActions.getTeams());
  }

  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    // apiService
    //   .getTradeHistory(selectedOption.value)
    //   .then((data) => console.log(data));
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    console.log(this.props);
    const { teamData, selectedOption } = this.state;
    return (
      <div>
        <Select
          options={teamData}
          placeholder="Select a Team..."
          onChange={this.handleChange}
        />
        <Select
          options={teamData}
          placeholder="Select a Team..."
          isDisabled={selectedOption === null}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
  return {
    teams: state.app.teams,
    teamSelectOptions: state.app.teamSelectOptions
  };
};

export default connect(mapStateToProps)(App);
