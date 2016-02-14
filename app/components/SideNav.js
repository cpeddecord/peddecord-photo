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

  renderSubSection (sectionType, sectionArr) {
    return(
      <ul className='sub-section'>
        {sectionArr.map((section, i) => {
          return <Link key={i} to={`/${sectionType}/${section.slug}`} activeClassName='active'>{section.title}</Link>;
        })}
      </ul>
    );
  }

  render() {
    const { showNav, isShowing } = this.props
    const portfolios = [
      { title: 'Studio', slug: 'studio' },
      { title: 'Moving Portraits', slug: 'moving-portraits' },
      { title: 'Documentary', slug: 'documentary' },
      { title: 'Live', slug: 'live' }
    ];

    const works = [
      { title: 'Odyssey/Sojourn', slug: 'odyssey-sojourn' },
      { title: 'New Series', slug: 'new-series' },
      { title: 'Documentary', slug: 'documentary' },
      { title: 'Aloft', slug: 'aloft-new-dance-project' }
    ];

    return (
      <InlineCss stylesheet={SideNav.css(isShowing)}>
        <div onClick={showNav} className='side-nav-overlay'>
          <nav className='side-nav'>
            <button className='side-nav-close' onClick={showNav}>X</button>
            <ul className='side-nav-wraper'>

              <li className='section'>
                <Link to='/portfolio' activeClassName='active' className='section-heading'>Portfolio</Link>
                {this.renderSubSection('portfolio', portfolios)}
              </li>

              <li className='section'>
                <Link to='/work' activeClassName='active' className='section-heading'>Work</Link>
                {this.renderSubSection('work', works)}
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
