'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';

import {select} from 'd3-selection';

class LegendItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   this.updatePosition(this.props); 
  }

  componentWillReceiveProps(nextProps) {
    this.updatePosition(nextProps);
  }

  updatePosition(props) {
    let x = 0, self = select(findDOMNode(this));
    let node = self.node();
    while (node.previousSibling) {
      node = node.previousSibling;
      x += node.getBBox().width + props.size * 2;
    }
    self.attr('transform', `translate(${x}, 0)`);
  }

  render() {
    return (
      <g className="legend-item">
        <rect className={`fill--${this.props.color}`}
              width={this.props.size}
              height={this.props.size} />
        <text className={`f6 sans-serif fill--${this.props.color}`}
              dx={this.props.size * 1.5}
              dy={this.props.size}>
          {this.props.name}
        </text>
      </g>
    );
  }
}

LegendItem.propTypes = {
  color: React.PropTypes.string,
  name: React.PropTypes.string,
  size: React.PropTypes.number
};

export default LegendItem;