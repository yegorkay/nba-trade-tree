import { Provider, ReactDOM, React, useEffect } from 'vendor';
import { store } from 'store';
import { apiService } from 'services';
import { RouterConfig } from 'routes';

const ConnectedApp = () => {
  useEffect(() => {
    apiService.configureInterceptor();
  }, []);

  return (
    <Provider {...{ store }}>
      <RouterConfig />
    </Provider>
  );
};

ReactDOM.render(<ConnectedApp />, document.getElementById('app'));
