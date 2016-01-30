import React, { Component } from 'react';
import InlineCss from 'react-inline-css';
import { Link } from 'react-router';

import ProgressiveLoadImage from './ProgressiveLoadImage';
import ImageGallery from './ImageGallery';


export default class GalleryComponent extends Component {
  static css () {
    return `
      & .gallery-description {
        text-align: center;
        margin-top: 30px;
      }
      @media (min-width: 40em) {
        & .gallery-description {
          margin-bottom: 95px;
        }
      }
    `
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { lede, shortLede, gallery } = this.props;

    return (
      <InlineCss stylesheet={GalleryComponent.css()}>
        <div className='show-for-small-only gallery-description'>
          <h1 className='gallery-title'>{lede}</h1>
          <h5 className='gallery-short-lede'>{shortLede}</h5>
        </div>

        <ImageGallery gallery={gallery} />

        <div className='show-for-medium gallery-description'>
          <h1 className='gallery-title'>{lede}</h1>
          <h5 className='gallery-short-lede'>{shortLede}</h5>
        </div>

      </InlineCss>
    )
  }
}
