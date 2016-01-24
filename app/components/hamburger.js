import React, { Component } from 'react';
import InlineCss from 'react-inline-css';

export default function renderHamburger (toggleNav) {
    const hammyCss = `
      & .hamburger-menu {
        height: 28px;
        width: 35px;
        position: absolute;
        right: 6px;
        top: 12px;
        padding: 0 5px 5px 5px;
      }

      & .menu-bar {
        height: 2px;
        width: 22px;
        background-color: #d7d7d7;
        margin-top: 5px;
        display: block;
      }
    `

    return (
      <InlineCss stylesheet={hammyCss}>
        <button className='hamburger-menu' onClick={toggleNav}>
          <span className='menu-bar' />
          <span className='menu-bar' />
          <span className='menu-bar' />
        </button>
      </InlineCss>
    );
}
