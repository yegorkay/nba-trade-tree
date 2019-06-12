import { Provider, ReactDOM, React, useEffect } from 'vendor';
import { store, appActions } from 'store';
import { apiService } from 'services';
import { RouterConfig } from 'routes';

const ConnectedApp = () => {
  useEffect(() => {
    apiService.configureInterceptor();
    store.dispatch(appActions.setQueryParams());
  }, []);

  return (
    <Provider {...{ store }}>
      <RouterConfig />
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
