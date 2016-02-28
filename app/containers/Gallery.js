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

    if (galleries.readyState === GalleriesActions.GALLERIES_FETCH_FAILED)
      return <ErrorPage type='gallery' />

    return (
      <GalleryComponent {...galleryFields} />
    );
  }

  render() {
    const { galleries } = this.props;

    if (galleries.readyState === GalleriesActions.GALLERIES_INVALID ||
      galleries.readyState === GalleriesActions.GALLERIES_FETCHING) {
      return <LoadingIndicator />;
    }

    if (galleries.readyState === GalleriesActions.GALLERIES_FETCH_FAILED)
      return <ErrorPage type='gallery' />

    const gallery = galleries.items.find((galleryArr) => {
      return galleryArr.slug === this.props.routeParams.slug;
    });

    const htmlRegex = /<[^>]*>/g;

    return (
      <div>
        <Helmet
          title={`${gallery.lede} | ${gallery.galleryType}`}
          meta={[
            { 'property': 'og:image', 'content': `http://peddecordphoto.com${gallery.gallery[0].url}` },
            { 'property': 'og:title', 'content': gallery.lede },
            { 'property': 'og:description', 'content': gallery.content.replace(htmlRegex, '') },
            { 'property': 'og:url', 'content': `http://peddecordphoto.com${this.props.location.pathname}` }
          ]}
        />
        <GalleryComponent {...gallery} />
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
