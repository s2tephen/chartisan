'use strict';

import React from 'react';
import {extent} from 'd3-array';
import {timeDay, timeHour, timeMonth, timeWeek, timeYear} from 'd3-time';
import {domain, nice, padding, scaleBand, scaleLinear, scaleTime} from 'd3-scale';
import {isEqual, pick} from 'lodash';
import moment from 'moment';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.innerWidth = props.width - props.margin.left - props.margin.right;
    this.innerHeight = props.height - props.margin.top - props.margin.bottom;

    this.colors = ['purple', 'blue', 'orange', 'green'];
    this.timeFormats = {
      date: ['MM/DD/YY', 'MM-DD-YY', 'MM/DD/YYYY', 'MM-DD-YYYY', 'YYYY/MM/DD', 'YYYY-MM-DD'],
      time: ['H:mm', 'HH:mm', 'h:mma', 'h:mm a', 'h:mmA', 'h:mm A', 'hh:mma', 'hh:mm a', 'hh:mmA', 'hh:mm A'],
      year: 'YYYY'
    };

    this.setXScale(props, false);
    this.setYScale(props, false);
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
      let xVals = props.data.map(d => moment(d[props.cols[0]], this.timeFormats[props.timeFormat], true))
                            .sort((a, b) => a.diff(b));
      let extent = [xVals[0], xVals[xVals.length - 1]];

      this.xScale = scaleTime().rangeRound([props.margin.right, this.innerWidth - props.margin.right])
                               .domain(extent);
      this.setTimeOrder(props.timeFormat, extent[0], extent[1]);
    }
  }

  setTimeOrder(format, start, end) {
    if (format === 'time') {
      this.timeOrder = 'day';
      this.xScale.nice(timeHour, 1);
    } else if (end.diff(start, 'years') >= 10) {
      this.timeOrder = 'years';
      this.xScale.nice(timeYear, 5);
    } else if (end.diff(start, 'years') >= 5) {
      this.timeOrder = 'years';
      this.xScale.nice(timeYear, 1);
    } else if (end.diff(start, 'years') >= 1) {
      this.timeOrder = 'monthYears';
      this.xScale.nice(timeMonth, 1);
    } else if (end.diff(start, 'months') > 3) {
      this.timeOrder = 'months';
      this.xScale.nice(timeMonth, 1);
    } else if (end.diff(start, 'weeks') >= 4) {
      this.timeOrder = 'weeks';
      this.xScale.nice(timeWeek, 2);
    } else if (end.diff(start, 'weeks') < 2) {
      this.timeOrder = 'days';
      this.xScale.nice(timeDay, 1);
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
  timeFormat: React.PropTypes.string,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default Chart;