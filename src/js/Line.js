'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {attr, datum, select} from 'd3-selection';
import {line, x, y} from 'd3-shape';

class Line extends React.Component {
  constructor(props) {
    super(props);

    this.line = line().x(d => props.x(d))
                      .y(d => props.y(d, props.i));
  }

  componentDidMount() {
    select(findDOMNode(this)).datum(this.props.data)
                             .attr('d', this.line);
  }

  componentWillReceiveProps(nextProps) {
    this.line = line().x(d => nextProps.x(d))
                      .y(d => nextProps.y(d, nextProps.i));

    select(findDOMNode(this)).datum(nextProps.data)
                             .attr('d', this.line);
  }

  render() {
    return (
      <path className={`line stroke--${this.props.color}`}
            transform={this.props.transform} />
    );
  }
}

Line.propTypes = {
  color: React.PropTypes.string,
  data: React.PropTypes.array,
  i: React.PropTypes.number,
  transform: React.PropTypes.string,
  x: React.PropTypes.func,
  y: React.PropTypes.func
};

export default Line;