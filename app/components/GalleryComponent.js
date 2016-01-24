import React, { Component } from 'react';
import InlineCss from 'react-inline-css';
import { Link } from 'react-router';

import ProgressiveLoadImage from './ProgressiveLoadImage';


export default class GalleryComponent extends Component {
  static css () {
    return `
      & .gallery-description {
        text-align: center;
        margin-top: 30px;
      }
      & .vertical-images img {
        margin-top: 25px;
      }
      & .horizontal-images {
        margin-top: 15px;
        margin-bottom: 25px;
        overflow-x: auto;
        white-space: nowrap;
        height: 600px;
      }
      & .horizontal-images img {
        max-height: 100%;
        max-width: inherit;
        margin-right: 15px;
      }
      & .horizontal-images img:first-child {
        margin-left: 15px;
      }
      @media (min-width: 40em) {
        & .gallery-description {
          margin-bottom: 35px;
        }
      }
    `
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { lede, shortLede, galleryType, featuredImage, gallery } = this.props;

    return (
      <InlineCss stylesheet={GalleryComponent.css()}>
        <div className='show-for-small-only gallery-description'>
          <h1 className='gallery-title'>{lede}</h1>
          <h5 className='gallery-short-lede'>{shortLede}</h5>
        </div>

        <div className='vertical-images show-for-small-only'>
          {gallery.map((imgObj, i) => {
            const progProps = {
              imgSrc: imgObj.url,
              alt: imgObj.description,
              height: imgObj.dimensions.height,
              width: imgObj.dimensions.width,
              isVertical: true
            };
            return <ProgressiveLoadImage key={i} {...progProps} />
          })}
        </div>

        <div className='horizontal-images show-for-medium'>
          {gallery.map((imgObj, i) => {
            const progProps = {
              imgSrc: imgObj.url,
              alt: imgObj.description,
              height: imgObj.dimensions.height,
              width: imgObj.dimensions.width,
              isVertical: false
            };
            return <ProgressiveLoadImage key={i} {...progProps} />
          })}
        </div>

        <div className='show-for-medium gallery-description'>
          <h1 className='gallery-title'>{lede}</h1>
          <h5 className='gallery-short-lede'>{shortLede}</h5>
        </div>

      </InlineCss>
    )
  }
}
