import { Player, Trade } from 'views';
import { React, Router, Route, Switch } from 'vendor';
import { routes } from 'routes';

const RouterConfig = () => (
  <Router>
    <Switch>
      <Route path={routes.root()} exact component={Trade} />
      <Route path={routes.player(null, null)} component={Player} />
    </Switch>
  </Router>
);

export { RouterConfig };
