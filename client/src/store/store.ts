import { IGlobalState } from 'models';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  thunk
} from 'vendor';
import { tradeReducer, settingsReducer, playerReducer } from 'store';

const reducers = combineReducers<IGlobalState>({
  trade: tradeReducer,
  settings: settingsReducer,
  playerHistory: playerReducer
});

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, composeEnhancers(middleware));

export { store };
