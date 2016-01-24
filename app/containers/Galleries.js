import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as GalleriesActions from '../actions/galleries';

import LoadingIndicator from '../components/LoadingIndicator';
import GalleryCard from '../components/GalleryCard';

class Galleries extends Component {

  static readyOnActions(dispatch, location, params) {
    return [
      () => dispatch(GalleriesActions.fetchGalleriesIfNeeded())
    ];
  }

  componentWillMount() {
    const { dispatch, location, params } = this.props;

    Galleries.readyOnActions(dispatch, location, params)
      .forEach(action => action());
  }

  renderGalleries() {
    const galleries = this.props.galleries;

    if (galleries.readyState === GalleriesActions.GALLERIES_INVALID ||
      galleries.readyState === GalleriesActions.GALLERIES_FETCHING) {
      return <LoadingIndicator />;
    }

    if (galleries.readyState === GalleriesActions.GALLERIES_FETCH_FAILED) {
      return (
        <p>Failed to fetch galleries</p>
      );
    }

    const relevantPaths = ['portfolio', 'work', 'series'];
    const currentPath = this.props.route.path && this.props.route.path.replace(/\//g, '');

    function filterPredicate (gallArr) {
      if (relevantPaths.indexOf(currentPath) !== -1)
        return gallArr.galleryType.toLowerCase() === currentPath;

      return true;
    }

    return (
      <div className='row'>
        {galleries.items
          .filter(filterPredicate)
          .map((gallery, i) => {
          return (
            <GalleryCard key={i} {...gallery} />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title='Portfolio and Work' />
        {this.renderGalleries()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    galleries: state.galleries,
    error: state.error || null
  };
}

export default connect(mapStateToProps)(Galleries);
