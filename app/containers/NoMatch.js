import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import InlineCSS from 'react-inline-css';
import * as GalleriesActions from '../actions/galleries';
import LoadingIndicator from '../components/LoadingIndicator';
import GalleryCard from '../components/GalleryCard';

class NoMatch extends Component {

  static css () {
    return (`
      & .four-oh-four {
        text-align: center;
        margin: 20px 0;
        padding: 0 15px;
      }

    `);
  }

  static readyOnActions(dispatch, location, params) {
    return [
      () => dispatch(GalleriesActions.fetchGalleriesIfNeeded())
    ];
  }

  componentWillMount() {
    const { dispatch, location, params } = this.props;

    NoMatch.readyOnActions(dispatch, location, params)
      .forEach(action => action());
  }

  componentDidMount() {
    window.scrollTo(0, 0);
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

    return (
      <div className='row'>
        {galleries.items
          // .filter(gallArr => gallArr.galleryType === 'Portfolio')
          .map((gallery, i) => {
            return (
              <GalleryCard halfSize={true} key={i} {...gallery} />
            );
        })}
      </div>
    );
  }

  render() {
    return (
      <InlineCSS stylesheet={NoMatch.css()}>
        <Helmet title='Not Found' />
        <div className='four-oh-four'>
          <h1>404 Page not found</h1>
          <h5>Well this is embarrasing... Here are some other galleries you might like</h5>
        </div>
        {this.renderGalleries()}
      </InlineCSS>
    )
  }
}

function mapStateToProps(state) {
  return {
    galleries: state.galleries,
    error: state.error || null
  };
}

export default connect(mapStateToProps)(NoMatch);
