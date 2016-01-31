import assign from 'object-assign';

import {
  GALLERIES_INVALID,
  GALLERIES_FETCHING,
  GALLERIES_FETCHED,
  GALLERIES_FETCH_FAILED
} from '../actions/galleries';

export default function galleries(state = {
  readyState: GALLERIES_INVALID,
  items: []
}, action) {
  switch (action.type) {

    case GALLERIES_FETCHING:
      return assign({}, state, {
        readyState: GALLERIES_FETCHING
      });

    case GALLERIES_FETCH_FAILED:
      return assign({}, state, {
        readyState: GALLERIES_FETCH_FAILED,
        error: action.error
      });

    case GALLERIES_FETCHED:
      return assign({}, state, {
        readyState: GALLERIES_FETCHED,
        items: action.result
      });

    default:
      return state;
  }
}
