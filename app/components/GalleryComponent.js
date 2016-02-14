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
          margin-bottom: 43px;
        }
      }
      & .content-block{
        margin-bottom: 80px;
        text-align: center;
      }
      & .content-block-small {
        margin: 0 15px -16px 15px;
      }
      & .image-lede-small {
        margin: 25px 0;
      }
    `
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { lede, shortLede, gallery, content } = this.props;

    const smallLede = gallery[0];

    const progProps = {
      imgSrc: smallLede.url,
      alt: smallLede.description,
      height: smallLede.dimensions.height,
      width: smallLede.dimensions.width,
      isVertical: true
    };

    return (
      <InlineCss stylesheet={GalleryComponent.css()}>
        <div className='show-for-small-only gallery-description'>
          <h1 className='gallery-title'>{lede}</h1>
          <h5 className='gallery-short-lede'>{shortLede}</h5>

          <div className='image-lede-small'>
            <ProgressiveLoadImage {...progProps} />
          </div>

          <div className='content-block content-block-small' dangerouslySetInnerHTML={{__html: content}} />
        </div>

        <ImageGallery gallery={gallery} hideFirstMobile={true} />

        <div className='show-for-medium gallery-description'>
          <h1 className='gallery-title'>{lede}</h1>
          <h5 className='gallery-short-lede'>{shortLede}</h5>
        </div>

        <div className='medium-6 medium-offset-3 show-for-medium content-block' dangerouslySetInnerHTML={{__html: content}} />

      </InlineCss>
    )
  }
}
