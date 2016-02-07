import React from 'react';
import InlineCss from 'react-inline-css'

export default function Footer () {
  function footerStyles () {
    return (`
      &.das-footer {
        padding: 15px;
        border-top: 1px solid #f3f3f3;
        font-size: 12px;
        color: #a0a0a0;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 50px;
        width: 100%;
      }
      & footer {
        position: relative;
      }
  `);
  }

  return (
    <InlineCss className='das-footer' stylesheet={footerStyles()}>
      <footer>
        <p>© {new Date().getUTCFullYear()} Christopher Peddecord</p>
      </footer>
    </InlineCss>
  );
}
