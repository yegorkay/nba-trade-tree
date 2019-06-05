import { App } from '../App';
import { Player } from '../Player';
import { React, Router, Route } from 'vendor';
import { routes } from 'routes';

const RouterConfig = () => (
  <Router>
    <Route path={routes.root()} exact component={App} />
    <Route path={routes.player()} component={Player} />
  </Router>
);

export { RouterConfig };