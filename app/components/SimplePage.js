import React, { Component } from 'react';

export default class SimplePage extends Component {
  render() {
    const slug = this.props.route.path.substr(1);
    return (
      <div>
        <h1>Hello?</h1>
        <p>{slug}</p>
      </div>
    )
  }
}
