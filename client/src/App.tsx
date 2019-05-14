import * as React from 'react';

class App extends React.Component {
  componentDidMount() {
    fetch('api/teams')
      .then((resp) => resp.json()) // Transform the data into json
      .then(function({ data }) {
        console.log(data);
        // Create and append the li's to the ul
      });
  }

  render() {
    return <div>hello</div>;
  }
}

export { App };
