'use strict';

import React from 'react';

import Dot from './Dot.js';

class DotGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className="series"
         transform={this.props.transform}>
        {this.props.data.map((d, j) => (
          <Dot cx={this.props.x(d)}
               cy={this.props.y(d, this.props.i)}
               color={this.props.color}
               key={`dot-${this.props.i}-${j}`} />
        ))}
      </g>
    );
  }
}

DotGroup.propTypes = {
  color: React.PropTypes.string,
  data: React.PropTypes.array,
  i: React.PropTypes.number,
  transform: React.PropTypes.string,
  x: React.PropTypes.func,
  y: React.PropTypes.func
};

export default DotGroup;