import React from 'react';
import InlineCss from 'react-inline-css';
import ProgressiveLoadImage from './ProgressiveLoadImage';

function styles () {
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
  `);
}

export default function ImageGallery (props) {
  const gallery = props.gallery || [];
  if (!gallery.length) return <div></div>;

  return (
    <InlineCss stylesheet={styles()} >
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
