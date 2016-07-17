'use strict';

import React from 'react';

import Bar from './Bar.js';

class BarGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className="series"
         transform={this.props.transform}>
        {this.props.data.map((d, j) => (
          <Bar width={this.props.xGroupScale.bandwidth()}
               height={this.props.innerHeight - this.props.yScale(d[this.props.cols[this.props.i + 1]])}
               x={this.props.x(d, this.props.i)}
               y={this.props.y(d, this.props.i)}
               transform={`translate(${this.props.xScale(d[this.props.cols[0]])}, 0)`}
               color={this.props.color}
               key={`bar-${this.props.i}-${j}`} />
        ))}
      </g>
    );
  }
}

BarGroup.propTypes = {
  color: React.PropTypes.string,
  cols: React.PropTypes.array,
  data: React.PropTypes.array,
  i: React.PropTypes.number,
  innerHeight: React.PropTypes.number,
  x: React.PropTypes.func,
  xGroupScale: React.PropTypes.func,
  xScale: React.PropTypes.func,
  y: React.PropTypes.func,
  yScale: React.PropTypes.func
};

export default BarGroup;