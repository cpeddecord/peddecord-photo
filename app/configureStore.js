import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { isClient } from './utils';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux'

const isDeveloping = process.env.NODE_ENV !== 'production';
const reduxRouterMiddleware = syncHistory(browserHistory);

let createStoreWithMiddleware;

if (isClient && isDeveloping) {
  const loggerMiddleware = createLogger({
    collapsed: true
  });

  createStoreWithMiddleware = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
    reduxRouterMiddleware
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    reduxRouterMiddleware
  )(createStore);
}

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
};
