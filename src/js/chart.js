'use strict';

import React from 'react';
import * as d3 from 'd3';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.innerWidth  = props.width - props.margin.left - props.margin.right;
    this.innerHeight = props.height - props.margin.top - props.margin.bottom;

    this.setXScale(props);
    this.setYScale(props);
  }

  componentWillReceiveProps(nextProps) {
    this.innerWidth  = nextProps.width - nextProps.margin.left - nextProps.margin.right;
    this.innerHeight = nextProps.height - nextProps.margin.top - nextProps.margin.bottom;

    this.setXScale(nextProps);
    this.setYScale(nextProps);
  }

  setXScale(props) {
    if (props.colType === 'number') {
      this.xScale = d3.scaleLinear()
                      .rangeRound([props.margin.right, this.innerWidth - props.margin.right])
                      .domain(d3.extent(props.data, d => d[props.cols[0]]))
                      .nice();
    } else {
      this.xScale = d3.scaleBand()
                      .rangeRound([0, this.innerWidth])
                      .padding(0.1)
                      .domain(props.data.map(d => d[props.cols[0]]));
    }
  }

  setYScale(props) {
    this.yScale = d3.scaleLinear()
                    .rangeRound([this.innerHeight, 0])
                    .domain([0, d3.max(props.data, d => d[props.cols[1]])])
                    .nice(1);

    // this.yScale = d3.scaleLinear()
    //                 .rangeRound([this.innerHeight, 0])
    //                 .domain(d3.extent(props.data, d => d[props.cols[1]]))
    //                 .nice(1);
  }
}

Chart.propTypes = {
  cols: React.PropTypes.array,
  colType: React.PropTypes.string,
  credit: React.PropTypes.string,
  data: React.PropTypes.array,
  margin: React.PropTypes.object,
  source: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
};

export default Chart;