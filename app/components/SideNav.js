import React, { Component } from 'react';
import { Link } from 'react-router';
import InlineCss from 'react-inline-css';

export default class SideNav extends Component {
  static css(isShowing) {
    return(`
      & ul, & li {
        list-style-type: none !important;
      }
      & .side-nav {
        text-align: left;
        padding-top: 49px;
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

      & .side-nav-wraper {
        margin-bottom: 0;
      }

      & ul {
        margin-left: 0;
      }

      & li.section {
        border-bottom: 1px solid #f3f3f3;
      }

      & .section-heading {
        color: #a0a0a0;
        display: block;
      }

      & .section-heading, .sub-section li, .sub-section a {
        padding: 10px 0 10px 25px;
      }

      & .section-heading:hover, & .sub-section li:hover,  & .sub-section a:hover {
        background-color: #f3f3f3;
      }

      & .sub-section a {
        display: list-item;
      }

      & a.section-heading, & .sub-section a {
        color: #222;
      }

      & a.active {
        background-color: #eee;
        color: tomato;
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
            <ul className='side-nav-wraper'>

              <li className='section'>
                <Link to='/portfolio' activeClassName='active' className='section-heading'>Portfolio</Link>
                <ul className='sub-section'>
                  <Link to='/portfolio/studio' activeClassName='active'>Studio</Link>
                  <Link to='/portfolio/moving-portraits' activeClassName='active'>Moving Portraits</Link>
                  <Link to='/portfolio/documentary' activeClassName='active'>Documentary</Link>
                  <Link to='/portfolio/live' activeClassName='active'>Live</Link>
                </ul>
              </li>

              <li className='section'>
                <Link to='/work' activeClassName='active' className='section-heading'>Work</Link>
                <ul className='sub-section'>
                  <Link to='/work/odyssey-sojourn'>Odyssey/Sojourn</Link>
                  <Link to='/work/new-series'>New Series</Link>
                  <Link to='/work/aloft-new-dance-project'>Aloft</Link>
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
