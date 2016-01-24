import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { isClient } from './utils';

const isDeveloping = process.env.NODE_ENV !== 'production';

let createStoreWithMiddleware;

if (isClient && isDeveloping) {
  const loggerMiddleware = createLogger({
    collapsed: true
  });

  createStoreWithMiddleware = applyMiddleware(
    loggerMiddleware,
    thunkMiddleware
  )(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
  )(createStore);
}

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState)
};
