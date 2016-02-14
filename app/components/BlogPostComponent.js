import React from 'react';
import InlineCss from 'react-inline-css';
import ProgressiveLoadImage from './ProgressiveLoadImage';
import ImageGallery from './ImageGallery';
import BlogBody from './BlogBody';

function stylesheet () {
  return (`
    & .blog-description {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 33px;
    }
    & .small-image-lede {
      margin-bottom: 10px;
    }
  `);
}

export default function BlogPostComponent (props) {
  const lede = props.lede.value;
  const shortLede = props.shortLede.value;
  const featuredImage = props.featuredImage.value.main;
  const content = props.body.value;
  const publishDate = new Date(props.publishDate.value);
  const mediumImageProps = {
    imgSrc: featuredImage.url,
    alt: featuredImage.alt,
    height: featuredImage.dimensions.height,
    width: featuredImage.dimensions.width,
    isVertical: true
  };
  const squareImageProps = {
    imgSrc: props.featuredImage.value.views.square.url,
    alt: featuredImage.alt,
    height: props.featuredImage.value.views.square.dimensions.height,
    width: props.featuredImage.value.views.square.dimensions.width,
    isVertical: true
  }
  const gallery = props.gallery && props.gallery.value.map((img) => {
    return {
      url: img.image.value.main.url,
      description: img.altText && img.altText.value,
      dimensions: img.image.value.main.dimensions
    }
  });

  return (
    <InlineCss stylesheet={stylesheet()}>
      <div className='show-for-small-only blog-description'>
        <h1>{lede}</h1>
        <h5>{shortLede}</h5>
      </div>

      <div className='show-for-small-only small-image-lede'>
        <ProgressiveLoadImage {...squareImageProps} />
      </div>

      <div className='show-for-medium'>
        <ProgressiveLoadImage {...mediumImageProps} />
      </div>

      <div className='show-for-medium blog-description'>
        <h1>{lede}</h1>
        <h5>{shortLede}</h5>
      </div>

      <BlogBody content={content} />
      <ImageGallery gallery={gallery} />

    </InlineCss>
  );
}
