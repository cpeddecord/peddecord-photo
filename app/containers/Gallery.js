import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as GalleriesActions from '../actions/galleries';
import LoadingIndicator from '../components/LoadingIndicator';
import GalleryComponent from '../components/GalleryComponent';

class Gallery extends Component {

  static readyOnActions(dispatch, location, params) {
    return [
      () => dispatch(GalleriesActions.fetchGalleriesIfNeeded())
    ];
  }

  componentWillMount() {
    const { dispatch, location, params } = this.props;

    Gallery.readyOnActions(dispatch, location, params)
      .forEach(action => action());
  }

  renderGallery(galleryFields) {
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

    return (
      <GalleryComponent {...galleryFields} />
    );
  }

  render() {
    const gallery = this.props.galleries.items.find((galleryArr) => {
      return galleryArr.slug === this.props.routeParams.slug;
    });

    return (
      <div>
        <Helmet title={`${gallery.lede} | ${gallery.galleryType}`} />
        {this.renderGallery(gallery)}
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

export default connect(mapStateToProps)(Gallery);
