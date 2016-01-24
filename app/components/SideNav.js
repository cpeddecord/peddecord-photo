import React, { Component } from 'react';
import { Link } from 'react-router';
import InlineCss from 'react-inline-css';

export default class SideNav extends Component {
  static css(isShowing) {
    return(`
      & .side-nav {
        text-align: left;
        padding-top: 46px;
        padding-left: 30px;
        display: block;
        background: #fff;
        position: fixed;
        height: 100%;
        width: 50%;
        overflow: scroll;
        right: ${isShowing ? '0px' : '-360px'};
        min-width: 240px;
        max-width: 300px;
        transition: right 0.3s;
        -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.34);
        -moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.34);
        box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.34);
      }

      & .side-nav-overlay {
        z-index: 9999;
        background-color: ${isShowing ? 'rgba(128, 128, 128, 0.40)' : 'rgba(128, 128, 128, 0.0)'};
        transition: background-color 1s;
        ${isShowing &&
          `width: 100%;
          height: 100%;
          display: block;
          position: fixed;`
        }
      }

      & .side-nav-close {
        color: #d7d7d7;
        position: absolute;
        height: 40px;
        width: 40px;
        right: 10px;
        top: 8px;
      }

      & ul {
        margin-left: 0;
      }

      & li.section {
        padding-bottom: 20px;
      }

      .sub-section li {
        padding-bottom: 10px;
      }

      .section-heading {
        padding-bottom: 10px;
        display: block
      }
    `);
  }

  render() {
    const { showNav, isShowing } = this.props

    return (
      <InlineCss stylesheet={SideNav.css(isShowing)}>
        <div onClick={showNav} className='side-nav-overlay'>
          <nav className='side-nav'>
            <button className='side-nav-close' onClick={showNav}>X</button>
            <ul>

              <li className='section'>
                <span className='section-heading'>Portfolio</span>
                <ul className='sub-section'>
                  <li>Studio</li>
                  <li>Documentary</li>
                  <li>Live</li>
                  <li>Moving Portraits</li>
                </ul>
              </li>

              <li className='section'>
                <span className='section-heading'>Work</span>
                <ul className='sub-section'>
                  <li>Odyssey/Sojourn</li>
                  <li>New Series</li>
                  <li>Aloft</li>
                  <li>Personal Work I</li>
                </ul>
              </li>

              <li className='section'>
                <Link to='/blog' activeClassName='active' className='section-heading'>Blog</Link>
              </li>

              <li className='section'>
                <Link to='/about' activeClassName='active' className='section-heading'>About</Link>
              </li>

            </ul>
          </nav>
        </div>
      </InlineCss>
    )
  }
}
