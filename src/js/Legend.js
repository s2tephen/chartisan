'use strict';

import React from 'react';

import LegendItem from './LegendItem.js';

class Legend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className="legend"
         transform={this.props.transform}>
        {this.props.cols.map((c, i) => (
          <LegendItem name={c}
                      color={this.props.colors[i]}
                      size={this.props.size}
                      i={i}
                      key={`legendItem-${i}`} />
        ))}
      </g>
    );
  }
}

Legend.propTypes = {
  cols: React.PropTypes.array,
  colors: React.PropTypes.array,
  size: React.PropTypes.number,
  transform: React.PropTypes.string
};

export default Legend;