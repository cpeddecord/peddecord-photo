import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import '../scss/App.scss';

import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

class App extends Component {

  render() {
    return (
      <div>
        <Helmet
          title='Peddecord Photo'
          titleTemplate='Peddecord Photo | %s'
          meta={[
            {'char-set': 'utf-8'},
            {'name': 'description', 'content': 'Dance Photographer Christopher Peddecord. Based in Portland, OR.'},
            {'name': 'viewport', 'content':'width=device-width, initial-scale=1'}
          ]}
        />
        <div className='page-wrapper'>
          <MainNav />
          <div className='route-content'>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="page-transition"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}
            >
              {React.cloneElement(this.props.children, {
                key: this.props.location.pathname
              })}
            </ReactCSSTransitionGroup>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
