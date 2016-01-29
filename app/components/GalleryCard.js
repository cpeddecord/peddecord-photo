import React from 'react';
import InlineCss from 'react-inline-css';
import { Link } from 'react-router';

import ProgressiveLoadImage from './ProgressiveLoadImage';

export default function GalleryCard (props) {
  function css (halfSize) {
    return (`
      &.gallery-card {
        margin-bottom: 25px;
        display: block;
      }
      @media (max-width: 639px) {
        &.gallery-card:nth-child(odd) {
          ${halfSize && 'padding-right: 5px'}
        }
        &.gallery-card:nth-child(even) {
          ${halfSize && 'padding-left: 5px'}
        }
        & .blog-short-lede {
          padding: 0 15px;
        }
      }
      @media (min-width: 40em) {
        &.gallery-card {
          padding-top: 15px;
          padding-left: 15px;
        }
        &.gallery-card:last-of-type {
          margin-bottom: 0;
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
      & .gallery-type.blog {
        display: none;
      }
      & .blog-short-lede {
        display: none;
        margin-top: -5px;
      }
      & .blog-short-lede.show {
        display: block;
      }
    `);
  }

  function postDescription (postType) {
    return (
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
    );
  }

  const { lede, shortLede, galleryType, featuredImage, slug, halfSize } = props;

  const progProps = {
    imgSrc: featuredImage.url,
    alt: featuredImage.description,
    height: featuredImage.dimensions.height,
    width: featuredImage.dimensions.width,
    isVertical: false
  };

  const classNames = halfSize ? 'small-6 medium-3 large-2' : 'small-12 medium-6 large-4';
  const galleryTypeClassName =   galleryType === 'Portfolio'
      ? 'hidden'
      : galleryType === 'blog'
        ? 'blog'
        : '';

  return (
    <InlineCss className={`${classNames} gallery-card`} stylesheet={css(halfSize)}>
      <Link to={`/${galleryType.toLowerCase()}/${slug}`}>
        <ProgressiveLoadImage {...progProps} />
        <div className='gallery-card-description'>
          <div className={`gallery-type ${galleryTypeClassName}`}>
            <h5 className='show-for-small-only'>{galleryType}</h5>
            <h6 className='show-for-medium'>{galleryType}</h6>
          </div>
          <div className='gallery-title'>
            <h1 className='show-for-small-only'>{lede}</h1>
            <h4 className='show-for-medium'>{lede}</h4>
          </div>
          <div className={`blog-short-lede ${galleryType === 'blog' && 'show'}`}>
            <h5 className='show-for-small-only'>{shortLede}</h5>
            <h6 className='show-for-medium'>{shortLede}</h6>
          </div>
        </div>
      </Link>
    </InlineCss>
  );
}
