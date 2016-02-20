import { routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux';
import galleries from './galleries';
import blog from './blog';

export default combineReducers({
  galleries,
  blog,
  routing: routeReducer
});
