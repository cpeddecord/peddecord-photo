import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { isClient } from './utils';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux'

const isDeveloping = process.env.NODE_ENV !== 'production';

let createStoreWithMiddleware;

if (isClient && isDeveloping) {
  const reduxRouterMiddleware = syncHistory(browserHistory);
  const loggerMiddleware = createLogger({
    collapsed: true
  });

  createStoreWithMiddleware = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    reduxRouterMiddleware
  )(createStore);

} else if (isClient) {
  const reduxRouterMiddleware = syncHistory(browserHistory);
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    reduxRouterMiddleware
  )(createStore);

} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore);
}

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
};
