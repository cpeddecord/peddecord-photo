import React, { Component } from 'react';

if (typeof window !== 'undefined' && typeof Typekit !== 'undefined') {
  Typekit.load({
    async: true,
    active () {
      document.getElementById('loader').style.opacity = 0;
      document.getElementById('loader').style.zIndex = -1;
      document.getElementById('loader').style.height = 0;
      document.getElementById('loader').style.width = 0;
    }
  });
}

class Root extends Component {

  renderInitialState() {
    if (this.props.initialState) {
      let innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return (
        <script dangerouslySetInnerHTML={{__html: innerHtml}} />
      );
    }
  }

  renderConfig() {
    let innerHtml = `window.CONFIG = ${JSON.stringify(this.props.config)}`;
    return (
      <script dangerouslySetInnerHTML={{__html: innerHtml}} />
    );
  }

  renderLoadingSpinner() {
    const spinnerStyle = {
      'transition': 'all 0.4s',
      'height': '100%',
      'width': '100%',
      'zIndex': '9999',
      'backgroundColor': '#fff',
      'position': 'fixed'
    };

    return (
      <div id='loader' style={spinnerStyle}>
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      </div>
    );
  }

  render() {
    const isLocal = process.env.NODE_ENV === undefined;
    const head = this.props.head;

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          <script src='https://use.typekit.net/suh8dru.js' />
          {!isLocal && <link rel='stylesheet' type='text/css' href='/style.min.css' />}
        </head>
        <body>
          {this.renderLoadingSpinner()}
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
          {this.renderInitialState()}
          {this.renderConfig()}
          {head.script.toComponent()}
          <script src={isLocal ? '/bundle.js' : '/bundle.min.js'}></script>
        </body>
      </html>
    );
  }
}

export default Root;
