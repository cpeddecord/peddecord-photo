export const GALLERIES_INVALID = 'GALLERIES_INVALID';
export const GALLERIES_FETCHING = 'GALLERIES_FETCHING';
export const GALLERIES_FETCHED = 'GALLERIES_FETCHED';
export const GALLERIES_FETCH_FAILED = 'GALLERIES_FETCH_FAILED';

const isDeveloping = process.env.NODE_ENV !== 'production';
const galleryAPI = isDeveloping ? CONFIG.API.galleries : CONFIG.API.prodGalleries;

function fetchGalleries() {
  return (dispatch) => {
    dispatch({ type: GALLERIES_FETCHING });

    return fetch(galleryAPI)
      .then(response => {
        return response.json();
      })
      .then(
        result => dispatch({ type: GALLERIES_FETCHED, result }),
        error => dispatch({ type: GALLERIES_FETCH_FAILED, error })
      );
  }
}

function shouldFetchGalleries(state) {
  const { galleries } = state;

  if (!galleries.items ||
    galleries.readyState === GALLERIES_FETCH_FAILED ||
    galleries.readyState === GALLERIES_INVALID) {
    return true;
  }

  return false;
}

export function fetchGalleriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGalleries(getState())) {
      return dispatch(fetchGalleries());
    }
  }
}
