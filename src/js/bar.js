'use strict';

import React from 'react';

class Bar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <rect className="bar"
            x={this.props.x}
            y={this.props.y}
            width={this.props.width}
            height={this.props.height} />
    );
  }
}

Bar.propTypes = {
  x: React.PropTypes.number,
  width: React.PropTypes.number,
  y: React.PropTypes.number,
  height: React.PropTypes.number
};

export default Bar;