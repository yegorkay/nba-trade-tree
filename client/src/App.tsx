import { React } from './vendor';
import { apiService } from './services';

class App extends React.Component {
  componentDidMount() {
    apiService.getTeams().then(({ data }) => console.log(data));
  }

  render() {
    return <div>hello</div>;
  }
}

export { App };
