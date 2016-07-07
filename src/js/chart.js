'use strict';

import React from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.innerHeight = props.height - props.margin.top - props.margin.bottom;
    this.setYScale(props, false);

    this.maxDigits = Math.max(-0.5, this.yScale.domain()[1].toString().length - 2);
    this.innerWidth = props.width - props.margin.left - props.margin.right;
    this.setXScale(props, false);
  }

  componentWillReceiveProps(nextProps) {
    let dataDidChange = !_.isEqual(this.props.data, nextProps.data);

    this.innerHeight = nextProps.height - nextProps.margin.top - nextProps.margin.bottom;
    this.setYScale(nextProps, dataDidChange);

    this.maxDigits = Math.max(-0.5, ...this.yScale.ticks(5).map(t => t.toString().length - 2));
    this.innerWidth = nextProps.width - nextProps.margin.left - nextProps.margin.right;
    this.setXScale(nextProps, dataDidChange);
  }

  setXScale(props, dataDidChange) {
    if (props.colType === 'numeric') {
      this.xScale = d3.scaleLinear()
                      .rangeRound([props.margin.right, this.innerWidth - props.margin.right]);

      if (dataDidChange || props.domain[0] === null) {
        this.xScale.domain(d3.extent(props.data, d => d[props.cols[0]]))
                   .nice();
        props.handleExtentChange('domain', this.xScale.domain().map(x => x.toString()));
      } else {
        this.xScale.domain(props.domain);
      }
    } else if (props.colType === 'time') {
      this.xScale = d3.scaleTime()
                      .rangeRound([props.margin.right, this.innerWidth - props.margin.right])
                      .domain(d3.extent(props.data, d => d[props.cols[0]]).map(d => new Date(d.toString())))
                      .nice(d3.timeYear, 5);
    } else {
      this.xScale = d3.scaleBand()
                      .rangeRound([this.maxDigits * 10, this.innerWidth])
                      .padding(0.1)
                      .domain(props.data.map(d => d[props.cols[0]]));
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