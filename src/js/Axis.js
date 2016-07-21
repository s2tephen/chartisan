'use strict';

import React from 'react';
import {findDOMNode} from 'react-dom';
import {axisBottom, axisLeft, ticks, tickSizeInner} from 'd3-axis';
import {attr, call, classed, select, selectAll} from 'd3-selection';
import {timeMonth, timeYear} from 'd3-time';
import {timeFormat} from 'd3-time-format';

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
    this.axis = axisBottom(props.scale).tickSizeInner(-props.innerHeight - 2 * props.margin);

    if (props.colType === 'time') {
      if (props.timeOrder === 'monthYears') {
        this.axis.tickFormat(timeFormat('%b \'%y'));
      } else if (props.timeOrder === 'months') {
        this.axis.tickFormat(timeFormat('%b'));
      } else if (props.timeOrder === 'weeks' || props.timeOrder === 'days') {
        this.axis.tickFormat(timeFormat('%b %-d'));
      }
    }

    let axis = select(findDOMNode(this)).call(this.axis);

    axis.select('.domain')
        .classed('stroke--transparent', true);

    let ticks = axis.selectAll('.tick')
                    .attr('transform', function(t) {
                      return `${this.getAttribute('transform')} translate(${props.yAxisOffset / 2}, 0)`;
                    });
    
    ticks.select('text')
         .attr('dy', '1.25em')
         .classed('f6 sans-serif fill--black-30', true);

    ticks.select('line')
         .classed('stroke--black-10', true);
  }
}

XAxis.propTypes = {
  className: React.PropTypes.string,
  colType: React.PropTypes.string,
  innerHeight: React.PropTypes.number,
  margin: React.PropTypes.number,
  scale: React.PropTypes.func,
  timeOrder: React.PropTypes.string,
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
    this.axis = axisLeft(props.scale).ticks(5, ',f').tickSizeInner(-props.innerWidth);

    let axis = select(findDOMNode(this)).call(this.axis);

    axis.select('.domain')
        .classed('stroke--transparent', true);

    let ticks = axis.selectAll('.tick');
    
    ticks.select('text')
         .attr('dx', '-.5em')
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