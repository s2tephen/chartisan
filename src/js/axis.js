'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Axis extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className={`${this.props.className} axis`}
         transform={this.props.transform}></g>
    );
  }
}

Axis.propTypes = {
  className: React.PropTypes.string,
  scale: React.PropTypes.func,
  transform: React.PropTypes.string
};

class XAxis extends Axis {
  constructor(props) {
    super(props);
    this.axis = d3.axisBottom(props.scale)
                  .tickSizeInner(-props.innerHeight);
  }

  componentDidMount() {
    d3.select(ReactDOM.findDOMNode(this))
      .call(this.axis)
      .selectAll('text')
      .classed('f6 sans-serif', true)
      .attr('dy', '1rem');
  }

  componentWillReceiveProps(nextProps) {
    this.axis = d3.axisBottom(nextProps.scale)
                  .tickSizeInner(-nextProps.innerHeight);

    d3.select(ReactDOM.findDOMNode(this))
      .call(this.axis)
      .selectAll('text')
      .classed('f6 sans-serif', true)
      .attr('dy', '1rem');
  }
}

class YAxis extends Axis {
  constructor(props) {
    super(props);
    this.axis = d3.axisLeft(props.scale)
                  .ticks(5, ',f')
                  .tickSizeInner(-props.innerWidth);
  }

  componentDidMount() {
    d3.select(ReactDOM.findDOMNode(this))
      .call(this.axis)
      .selectAll('text')
      .classed('f6 sans-serif', true)
      .attr('dx', '-.25rem');
  }

  componentWillReceiveProps(nextProps) {
    this.axis = d3.axisLeft(nextProps.scale)
                  .ticks(5, ',f')
                  .tickSizeInner(-nextProps.innerWidth)
                  .tickSizeOuter(0);

    d3.select(ReactDOM.findDOMNode(this))
      .call(this.axis)
      .selectAll('text')
      .classed('f6 sans-serif', true)
      .attr('dx', '-.25rem');
  }
}

export default Axis;
export {XAxis, YAxis};