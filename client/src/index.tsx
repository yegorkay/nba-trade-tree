import { Provider, ReactDOM, React, useEffect } from 'vendor';
import { store, settingsActions } from 'store';
import { apiService } from 'services';
import { RouterConfig } from 'routes';

const ConnectedApp = () => {
  useEffect(() => {
    apiService.configureInterceptor();
    store.dispatch(settingsActions.setQueryParams());
  }, []);

  return (
    <Provider {...{ store }}>
      <RouterConfig />
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
