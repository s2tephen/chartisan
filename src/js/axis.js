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

class XAxis extends Axis {
  constructor(props) {
    super(props);
    this.axis = d3.axisBottom(props.scale)
                  .tickSizeInner(-props.innerHeight - 2 * props.margin);
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
                  .tickSizeInner(-nextProps.innerHeight - 2 * nextProps.margin);

    d3.select(ReactDOM.findDOMNode(this))
      .call(this.axis)
      .selectAll('text')
      .classed('f6 sans-serif', true)
      .attr('dy', '1rem');
  }
}

XAxis.propTypes = {
  className: React.PropTypes.string,
  innerHeight: React.PropTypes.number,
  margin: React.PropTypes.number,
  scale: React.PropTypes.func,
  transform: React.PropTypes.string
};

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
                  .tickSizeInner(-nextProps.innerWidth);

    d3.select(ReactDOM.findDOMNode(this))
      .call(this.axis)
      .selectAll('text')
      .classed('f6 sans-serif', true)
      .attr('dx', '-.25rem');
  }
}

YAxis.propTypes = {
  className: React.PropTypes.string,
  innerWidth: React.PropTypes.number,
  scale: React.PropTypes.func,
  transform: React.PropTypes.string
};

export default Axis;
export {XAxis, YAxis};