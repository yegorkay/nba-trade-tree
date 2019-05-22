import { App } from './App';
import { Provider, ReactDOM, React, Router, Route } from 'vendor';
import { store } from 'store';

const ConnectedApp = () => (
  <Provider {...{ store }}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
