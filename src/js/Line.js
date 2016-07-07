'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Line extends React.Component {
  constructor(props) {
    super(props);

    this.line = d3.line()
                  .x(d => props.x(d))
                  .y(d => props.y(d));
  }

  componentDidMount() {
    d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .attr('d', this.line);
  }

  componentWillReceiveProps(nextProps) {
    this.line = d3.line()
                  .x(d => nextProps.x(d))
                  .y(d => nextProps.y(d));

    d3.select(ReactDOM.findDOMNode(this))
      .datum(nextProps.data)
      .attr('d', this.line);
  }

  render() {
    return (
      <path className="line" />
    );
  }
}

Line.propTypes = {
  cols: React.PropTypes.array,
  colType: React.PropTypes.string,
  data: React.PropTypes.array,
  x: React.PropTypes.func,
  y: React.PropTypes.func
};

export default Line;