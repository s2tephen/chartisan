'use strict';

import React from 'react';

class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <rect className={`bar fill--${this.props.color}`}
            width={this.props.width}
            height={this.props.height}
            x={this.props.x}
            y={this.props.y}
            transform={this.props.transform} />
    );
  }
}

Bar.propTypes = {
  color: React.PropTypes.string,
  height: React.PropTypes.number,
  transform: React.PropTypes.string,
  width: React.PropTypes.number,
  x: React.PropTypes.number,
  y: React.PropTypes.number
};

export default Bar;