import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  thunk
} from 'vendor';
import { appReducer } from 'store';

const reducers = combineReducers({
  app: appReducer
});

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, composeEnhancers(middleware));

export { store };
