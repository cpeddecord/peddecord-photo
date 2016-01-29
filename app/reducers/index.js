import { combineReducers } from 'redux';
import galleries from './galleries';
import blog from './blog';

export default combineReducers({
  galleries,
  blog
});
