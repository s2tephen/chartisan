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
  }

  componentDidMount() {
    this.updateAxis(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateAxis(nextProps);
  }

  updateAxis(props) {
    this.axis = d3.axisBottom(props.scale)
                  .tickSizeInner(-props.innerHeight - 2 * props.margin);

    let axis = d3.select(ReactDOM.findDOMNode(this))
                 .call(this.axis);

    axis.select('.domain')
        .classed('stroke--transparent', true);

    let ticks = axis.selectAll('.tick');
    
    ticks.select('text')
         .attr('dy', '1rem')
         .classed('f6 sans-serif fill--black-30', true);

    ticks.select('line')
         .classed('stroke--black-10', true);
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
  }

  componentDidMount() {
    this.updateAxis(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateAxis(nextProps);
  }

  updateAxis(props) {
    this.axis = d3.axisLeft(props.scale)
                  .ticks(5, ',f')
                  .tickSizeInner(-props.innerWidth);

    let axis = d3.select(ReactDOM.findDOMNode(this))
                 .call(this.axis);

    axis.select('.domain')
        .classed('stroke--transparent', true);

    let ticks = axis.selectAll('.tick');
    
    ticks.select('text')
         .attr('dx', '-.25rem')
         .classed('f6 sans-serif fill--black-30', true);

    if (props.scale.domain()[0] < 0 && props.scale.domain()[1] > 0) {
      ticks.select('line')
           .attr('class', (d, i) => d ? 'stroke--black-10' : 'stroke--black-50');
    } else {
      ticks.select('line')
           .attr('class', (d, i) => i ? 'stroke--black-10' : 'stroke--black-50');
    }
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