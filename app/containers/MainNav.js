import React, { Component } from 'react';
import { Link } from 'react-router';
import InlineCss from 'react-inline-css';
import { connect } from 'react-redux';
import analytics from '../utils/analytics';

import renderHamburger from '../components/hamburger';
import SideNav from '../components/SideNav';

class MainNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNavIsShowing: false
    }
  }

  static css () {
    return (`
      & nav {
        height: 50px;
        border-bottom: 1px solid #f3f3f3;
      }
      & .heading {
        padding: 10px 15px;
        font-size: 1.5rem;
        display: inline-block;
      }
  `);
  }

  toggleSideNav(doShow) {
    function setBodyOverflow () {
      document.body.style.overflow = this.state.sideNavIsShowing ? 'hidden' : 'scroll';
    }

    this.setState({
      sideNavIsShowing: doShow
    }, setBodyOverflow);
  }

  componentDidMount() {
    analytics.create();
  }

  componentWillReceiveProps(props) {
    analytics.send('pageview', props.routing.location.pathname);
  }

  render() {
    return (
      <InlineCss stylesheet={MainNav.css()}>
        <nav>
          {renderHamburger(this.toggleSideNav.bind(this, true))}
          <SideNav isShowing={this.state.sideNavIsShowing} showNav={this.toggleSideNav.bind(this, false)} />
          <Link to='/'><h1 className='heading'>Peddecord<strong>Photo</strong></h1></Link>
        </nav>
      </InlineCss>
    )
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect(mapStateToProps)(MainNav);
