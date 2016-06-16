'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Line extends React.Component {
  constructor(props) {
    super(props);

    this.line = d3.line()
                  .x(d => props.xScale(d[props.cols[0]]) + (props.colType === 'ordinal' ? props.xScale.bandwidth()/2 : 0))
                  .y(d => props.yScale(d[props.cols[1]]));
  }

  componentDidMount() {
    d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .attr('d', this.line);
  }

  componentWillReceiveProps(nextProps) {
    this.line = d3.line()
                  .x(d => nextProps.xScale(d[nextProps.cols[0]]) + (nextProps.colType === 'ordinal' ? nextProps.xScale.bandwidth()/2 : 0))
                  .y(d => nextProps.yScale(d[nextProps.cols[1]]));

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
  xScale: React.PropTypes.func,
  yScale: React.PropTypes.func
};

export default Line;