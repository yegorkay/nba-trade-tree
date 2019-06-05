import { App } from './App';
import { Player } from './Player';
import { Provider, ReactDOM, React, Router, Route, useEffect } from 'vendor';
import { store } from 'store';
import { apiService } from 'services';

const ConnectedApp = () => {
  useEffect(() => {
    apiService.configureInterceptor();
  }, []);

  return (
    <Provider {...{ store }}>
      <Router>
        <Route path="/" exact component={App} />
        <Route path="/player" component={Player} />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
