import React, { Component } from 'react';
import InlineCss from 'react-inline-css';
import ProgressiveLoadImage from './ProgressiveLoadImage';

function styles (hideFirstMobile) {
  return (`
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
    & .vertical-images img:first-child {
      ${hideFirstMobile && 'display: none;'}
    }
    @media screen and ( min-height: 776px ) {
      & .horizontal-images {
        height: 698px;
      }
    }
  `);
}

export default class ImageGallery extends Component {
  componentWillReceiveProps () {
    if (typeof window !== 'undefined')
      document.getElementsByClassName('horizontal-images')[0].scrollLeft = 0;
  }

  render () {
    const gallery = this.props.gallery || [];
    const { hideFirstMobile } = this.props || false;
    if (!gallery.length) return <div />;

    return (
      <InlineCss stylesheet={styles(hideFirstMobile)} >
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
      </InlineCss>
    );

  }

}
