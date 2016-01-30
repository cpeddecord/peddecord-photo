import React from 'react';
import InlineCss from 'react-inline-css';
import ProgressiveLoadImage from './ProgressiveLoadImage';
import ImageGallery from './ImageGallery';

function styles () {
  return (`
    & .text-slice {
      padding: 15px 0;
    }
    @media (max-width: 639px) {
      & .text-slice {
        padding: 15px 15px;
      }
    }
    & .image-slice {
      margin-top: 15px;
    }
    & .quote-slice {
      font-size: 2em;
    }
    & .caption {
      padding: 15px 0;
      font-style: oblique;
      font-size: 0.9em;
    }
    @media (max-width: 639px) {
      & .caption {
        padding-left: 15px;
      }
    }
  `);
}

function imageSlice (props) {
  const progProps = {
    imgSrc: props.img.value.main.url,
    alt: props.img.value.main.alt,
    height: props.img.value.main.dimensions.height,
    width: props.img.value.main.dimensions.width,
    isVertical: false
  };

  return (
    <div>
      <ProgressiveLoadImage {...progProps} />
      <div className='caption'>{props.caption.value}</div>
    </div>);
}

function textSlice (props) {
  return props.map((section, i) => {
    switch (section.type) {
      case 'paragraph':
        return <p key={i} dangerouslySetInnerHTML={{__html: paragrapher(section.text, section.spans)}} />
      case 'heading1':
        return <h1 key={i}>{section.text}</h1>
      case 'heading2':
        return <h2 key={i}>{section.text}</h2>
      case 'heading3':
        return <h3 key={i}>{section.text}</h3>
      case 'heading4':
        return <h4 key={i}>{section.text}</h4>
      case 'heading5':
        return <h5 key={i}>{section.text}</h5>
      case 'heading6':
        return <h6 key={i}>{section.text}</h6>
    }
  });
}

function paragrapher (sectionText, sectionSpans) {
  const spanTypes = {
    em: 'em',
    strong: 'strong',
    hyperlink: 'a'
  }

  const spans = sectionSpans.map((span) => {
    const ogSpan = sectionText.slice(span.start + 1, span.end);
    const href = span.type === 'hyperlink'
      ? ` href="${span.data.value.url}" target="_blank"`
      : '';

    return {
      ogSpan,
      replaceSpan: `<${spanTypes[span.type]}${href}>${ogSpan}</${spanTypes[span.type]}>`
    }
  });

  let retText = sectionText;

  spans.forEach((span) => {
    retText = retText.replace(span.ogSpan, span.replaceSpan);
  });

  return retText;
}

export default function BlogBody (props) {

  const contentBody = props.content.map((contentSlice, i) => {
    switch (contentSlice.slice_type) {
      case 'text':
        return <section className='text-slice' key={i}>{textSlice(contentSlice.value.value)}</section>
      case 'quote':
        return <section className='quote-slice' key={i}>{contentSlice.value.value}</section>
      case 'image-with-caption':
        return <section className='image-slice' key={i}>{imageSlice(contentSlice.value.value[0])}</section>
    }
  });

  return (
    <InlineCss stylesheet={styles()} >
      <div className='row'>
        <div className='medium-8 medium-offset-2'>
          {contentBody}
        </div>
      </div>
    </InlineCss>
  );
}
