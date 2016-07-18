'use strict';

import React from 'react';
import {extent} from 'd3-array';
import {timeYear} from 'd3-time';
import {domain, nice, padding, scaleBand, scaleLinear, scaleTime} from 'd3-scale';
import {isEqual, pick} from 'lodash';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.innerWidth = props.width - props.margin.left - props.margin.right;
    this.innerHeight = props.height - props.margin.top - props.margin.bottom;

    this.setXScale(props, false);
    this.setYScale(props, false);

    this.colors = ['purple', 'blue', 'orange', 'green'];
  }

  componentWillReceiveProps(nextProps) {
    let dataDidChange = !isEqual(this.props.data, nextProps.data);

    this.innerWidth = nextProps.width - nextProps.margin.left - nextProps.margin.right;
    this.innerHeight = nextProps.height - nextProps.margin.top - nextProps.margin.bottom;

    this.setXScale(nextProps, dataDidChange);
    this.setYScale(nextProps, dataDidChange);
  }

  setXScale(props, dataDidChange) {
    if (props.colType === 'ordinal') {
      this.xScale = scaleBand().rangeRound([0, this.innerWidth])
                               .padding(0.1)
                               .domain(props.data.map(d => d[props.cols[0]]));
    } else if (props.colType === 'numeric') {
      this.xScale = scaleLinear().rangeRound([props.margin.right, this.innerWidth - props.margin.right]);

      if (dataDidChange || props.domain[0] === null) {
        this.xScale.domain(extent(props.data, d => d[props.cols[0]]))
                   .nice();
        props.handleExtentChange('domain', this.xScale.domain().map(x => x.toString()));
      } else {
        this.xScale.domain(props.domain);
      }
    } else {
      this.xScale = scaleTime().rangeRound([props.margin.right, this.innerWidth - props.margin.right])
                               .domain(extent(props.data, d => d[props.cols[0]]).map(d => new Date(d.toString())))
                               .nice(timeYear, 5);
    }
  }

  setYScale(props, dataDidChange) {
    this.yScale = scaleLinear().rangeRound([this.innerHeight, 0]);

    if (dataDidChange || props.range[0] === null) {
      let yVals = [];
      for (let i = 1; i < props.cols.length; i++) {
        yVals = yVals.concat(props.data.map(d => d[props.cols[i]]));
      }
      yVals.sort((a, b) => a - b);

      this.yScale.domain([yVals[0], yVals[yVals.length - 1]])
                 .nice(1);
      props.handleExtentChange('range', this.yScale.domain().map(y => y.toString()));
    } else {
      this.yScale.domain(props.range);
    }

    this.yAxisOffset = 10 * Math.max(0, ...this.yScale.ticks(5)
                                                      .map(this.yScale.tickFormat(5, ',f'))
                                                      .map(this.tickLength));
  }

  tickLength(tick) {
    return tick.split('')
               .map(d => isNaN(d) ? 0.5 : 1)
               .reduce((a, b) => a + b) - 2;
  }

  x(d) {
    return this.xScale(d[this.props.cols[0]]);
  }

  y(d, i) {
    return this.yScale(d[this.props.cols[i + 1]]);
  }

  sliceData(col) {
    return this.props.data.map(d => pick(d, [this.props.cols[0], col]));
  }
}

Chart.propTypes = {
  cols: React.PropTypes.array,
  colType: React.PropTypes.string,
  credit: React.PropTypes.string,
  data: React.PropTypes.array,
  domain: React.PropTypes.array,
  margin: React.PropTypes.object,
  range: React.PropTypes.array,
  source: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default Chart;