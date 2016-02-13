import assign from 'object-assign';

import {
  BLOG_INVALID,
  BLOG_FETCHING,
  BLOG_FETCHED,
  BLOG_FETCH_FAILED
} from '../actions/blog';

export default function blog(state = {
  readyState: BLOG_INVALID,
  blogPosts: []
}, action) {
  switch (action.type) {

    case BLOG_FETCHING:
      return assign({}, state, {
        readyState: BLOG_FETCHING
      });

    case BLOG_FETCH_FAILED:
      return assign({}, state, {
        readyState: BLOG_FETCH_FAILED,
        error: action.error
      });

    case BLOG_FETCHED:
      return assign({}, state, {
        readyState: BLOG_FETCHED,
        blogPosts: action.payload.results.filter(posts => posts.data.blog.featuredImage)
      });

    default:
      return state;
  }
}
