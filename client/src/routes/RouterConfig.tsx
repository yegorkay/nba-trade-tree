import { App } from '../App';
import { Player } from '../Player';
import { React, Router, Route, Switch } from 'vendor';
import { routes } from 'routes';

const RouterConfig = () => (
  <Router>
    <Switch>
      <Route path={routes.root()} exact component={App} />
      <Route path={routes.player(null)} component={Player} />
    </Switch>
  </Router>
);

export { RouterConfig };
