import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './reducers';

const reducers = combineReducers({
  app: appReducer
});

const composeEnhancers =
  window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const middleware = applyMiddleware(thunk);

const store = createStore(reducers, composeEnhancers(middleware));

export { store };
