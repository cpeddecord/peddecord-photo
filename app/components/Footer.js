import React, { Component } from 'react';
import InlineCss from 'react-inline-css';


export default class Footer extends Component {
  static css () {
    return (`
      &.das-footer {
        padding: 10px;
        border-top: 1px solid #d7d7d7;
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


  render() {
    return (
      <InlineCss className='das-footer' stylesheet={Footer.css()}>
        <footer>
          <p>© {new Date().getUTCFullYear()} Christopher Peddecord</p>
        </footer>
      </InlineCss>
    )
  }
}
