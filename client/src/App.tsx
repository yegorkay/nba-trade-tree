import { React, Select } from 'vendor';
import { apiService, formatService } from 'services';

class App extends React.Component {
  state = {
    teamData: [],
    selectedOption: null
  };

  componentDidMount() {
    apiService.getTeams().then(({ data }) => {
      const teamData = formatService.createSelectLabels(
        data.data,
        'teamAbr',
        'teamName'
      );
      this.setState({ teamData });
    });
  }

  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    // apiService
    //   .getTradeHistory(selectedOption.value)
    //   .then((data) => console.log(data));
    console.log(`Option selected:`, selectedOption);
  };

  render() {
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

export { App };
