'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Line extends React.Component {
  constructor(props) {
    super(props);

    this.line = d3.line()
                  .x(d => props.x(d))
                  .y(d => props.y(d, props.i));
  }

  componentDidMount() {
    d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .attr('d', this.line);
  }

  componentWillReceiveProps(nextProps) {
    this.line = d3.line()
                  .x(d => nextProps.x(d))
                  .y(d => nextProps.y(d, nextProps.i));

    d3.select(ReactDOM.findDOMNode(this))
      .datum(nextProps.data)
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