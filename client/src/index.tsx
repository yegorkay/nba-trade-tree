import { App } from './App';
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
        <Route path="/" component={App} />
      </Router>
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
