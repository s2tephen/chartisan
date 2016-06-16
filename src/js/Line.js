'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Line extends React.Component {
  constructor(props) {
    super(props);

    this.line = d3.line()
                  .x(d => props.xScale(d[props.cols[0]]) + props.xScale.bandwidth()/2)
                  .y(d => props.yScale(d[props.cols[1]]));
  }

  componentDidMount() {
    d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .attr('d', this.line);
  }

  componentWillReceiveProps(nextProps) {
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
  data: React.PropTypes.array,
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func
};

export default Line;