import React, { Component } from 'react';
import InlineCss from 'react-inline-css';


export default class Footer extends Component {
  static css () {
    return (`
      & footer {
        padding: 10px;
        height: 50px;
        border-top: 1px solid #d7d7d7;
        font-size: 12px;
        bottom: 0;
        color: #a0a0a0;
        width: 100%;
      }
  `);
  }


  render() {
    return (
      <InlineCss stylesheet={Footer.css()}>
        <footer>
          <p>© {new Date().getUTCFullYear()} Christopher Peddecord</p>
        </footer>
      </InlineCss>
    )
  }
}
