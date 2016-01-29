export const BLOG_INVALID = 'BLOG_INVALID';
export const BLOG_FETCHING = 'BLOG_FETCHING';
export const BLOG_FETCHED = 'BLOG_FETCHED';
export const BLOG_FETCH_FAILED = 'BLOG_FETCH_FAILED';

function fetchBlog() {
  return (dispatch) => {
    const baseUrl = 'https://peddecordphoto.prismic.io/api';
    dispatch({ type: BLOG_FETCHING });

    return fetch(baseUrl)
      .then(res => res.json())
      .then((payload) => {
        const referenceId = payload.refs.find(refs => refs.id === 'master').ref;
        return fetch(`${baseUrl}/documents/search?ref=${referenceId}#format=json`)
          .then(res => res.json())
          .then(
            payload => dispatch({ type: BLOG_FETCHED, payload }),
            error => dispatch({ type: BLOG_FETCH_FAILED, error })
          );
      });
  }
}

function shouldFetchBlog(state) {
  const { blog } = state;

  if (!blog.blogPosts
      || blog.readyState === BLOG_FETCH_FAILED
      || blog.readyState === BLOG_INVALID) {
    return true;
  }

  return false;
}

export function fetchBlogIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchBlog(getState())) {
      return dispatch(fetchBlog());
    }
  }
}
