import React, { Component } from 'react';
import { isClient } from '../utils';

export default class ProgressiveLoadImage extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const img = new Image();
    img.src = this.props.imgSrc;
    img.onload = function () {
      if (!this._unmounted)
        this.setState({ isLoading: false });
    }.bind(this);
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  getHeight(imgRatioMultiplier) {
    if (!isClient) return;

    return this.state.isLoading
      ? this.props.isVertical
        ? '100%'
        : window.outerWidth * imgRatioMultiplier + 'px'
      : '';
  }

  render() {
    const { imgSrc, alt, isVertical, height, width } = this.props;

    const imgRatioMultiplier = height > width
      ? Math.max(width / height, height / width)
      : Math.min(width / height, height / width);

    const style = {
      width: isVertical && '100%',
      height: this.getHeight(imgRatioMultiplier),
      opacity: this.state.isLoading ? 0 : 1,
      transition: 'opacity 0.5s'
    };

    return <img style={style} src={imgSrc} alt={alt} />;
  }
}
