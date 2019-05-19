import * as ReactDOM from 'react-dom';
import * as React from 'react';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/store';

const ConnectedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
