import React, { Component } from 'react';
import InlineCss from 'react-inline-css';
import { Link } from 'react-router';

import ProgressiveLoadImage from './ProgressiveLoadImage';


export default class GalleryCard extends Component {
  static css () {
    return (`
      &.gallery-card {
        margin-bottom: 25px;
        display: block;
      }
      &.gallery-card:last-of-type {
        margin-bottom: 0;
      }
      @media (min-width: 40em) {
        &.gallery-card {
          padding-top: 15px;
          padding-left: 15px;
        }
      }
      & .gallery-card-description {
        padding-top: 20px;
        padding-bottom: 20px;
        text-align: center;
      }
      & .gallery-type {
        margin-bottom: -15px;
      }
      & .gallery-type.hidden {
        visibility: hidden;
      }
    `);
  }

  render() {
    const { lede, shortLede, galleryType, featuredImage, slug } = this.props;

    const progProps = {
      imgSrc: featuredImage.url,
      alt: featuredImage.description,
      height: featuredImage.dimensions.height,
      width: featuredImage.dimensions.width,
      isVertical: false
    };

    return (
      <InlineCss className='small-12 medium-6 large-4 gallery-card' stylesheet={GalleryCard.css()}>
        <Link to={`/${galleryType.toLowerCase()}/${slug}`}>
          <ProgressiveLoadImage {...progProps} />
          <div className='gallery-card-description'>
            <div className={`gallery-type ${galleryType === 'Portfolio' && 'hidden'}`}>
              <h5 className='show-for-small-only'>{galleryType}</h5>
              <h6 className='show-for-medium'>{galleryType}</h6>
            </div>
            <div className='gallery-title'>
              <h1 className='show-for-small-only'>{lede}</h1>
              <h4 className='show-for-medium'>{lede}</h4>
            </div>
          </div>
        </Link>
      </InlineCss>
    )
  }
}
