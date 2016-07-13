'use strict';

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.innerWidth = props.width - props.margin.left - props.margin.right;
    this.innerHeight = props.height - props.margin.top - props.margin.bottom;

    this.setXScale(props, false);
    this.setYScale(props, false);
  }

  componentWillReceiveProps(nextProps) {
    let dataDidChange = !_.isEqual(this.props.data, nextProps.data);

    this.innerWidth = nextProps.width - nextProps.margin.left - nextProps.margin.right;
    this.innerHeight = nextProps.height - nextProps.margin.top - nextProps.margin.bottom;

    this.setXScale(nextProps, dataDidChange);
    this.setYScale(nextProps, dataDidChange);
  }

  setXScale(props, dataDidChange) {
    if (props.colType === 'ordinal') {
      this.xScale = d3.scaleBand()
                      .rangeRound([0, this.innerWidth])
                      .padding(0.1)
                      .domain(props.data.map(d => d[props.cols[0]]));
    } else if (props.colType === 'numeric') {
      this.xScale = d3.scaleLinear()
                      .rangeRound([props.margin.right, this.innerWidth - props.margin.right]);

      if (dataDidChange || props.domain[0] === null) {
        this.xScale.domain(d3.extent(props.data, d => d[props.cols[0]]))
                   .nice();
        props.handleExtentChange('domain', this.xScale.domain().map(x => x.toString()));
      } else {
        this.xScale.domain(props.domain);
      }
    } else {
      this.xScale = d3.scaleTime()
                      .rangeRound([props.margin.right, this.innerWidth - props.margin.right])
                      .domain(d3.extent(props.data, d => d[props.cols[0]]).map(d => new Date(d.toString())))
                      .nice(d3.timeYear, 5);
    }
  }

  setYScale(props, dataDidChange) {
    this.yScale = d3.scaleLinear()
                    .rangeRound([this.innerHeight, 0]);

    if (dataDidChange || props.range[0] === null) {
      this.yScale.domain(d3.extent(props.data, d => d[props.cols[1]]))
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

  y(d) {
    return this.yScale(d[this.props.cols[1]]);
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