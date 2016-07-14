'use strict';

import React from 'react';
import * as d3 from 'd3';

import Chart from './Chart.js';
import {XAxis, YAxis} from './Axis.js';
import Dot from './Dot.js';
import Header from './Header.js';
import Footer from './Footer.js';

class ScatterChart extends Chart {
  x(d) {
    if (this.props.colType === 'time') {
      return this.xScale(new Date(d[this.props.cols[0]].toString()));
    } else if (this.props.colType === 'ordinal') {
      return this.xScale(d[this.props.cols[0]]) + this.xScale.bandwidth() / 2;
    }
    return this.xScale(d[this.props.cols[0]]);
  }

  render() {
    return (
      <svg className="fl"
           width={this.props.width}
           height={this.props.height}>
        <rect width={this.props.width}
              height={this.props.height}
              fill="rgb(244,244,244)" />
        {(this.props.title || this.props.subtitle) &&
          <Header transform={`translate(${this.props.margin.right}, ${this.props.margin.left})`}
                  title={this.props.title}
                  subtitle={this.props.subtitle} />
        }
        <g className="chart"
           transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}>
          <XAxis className="x"
                 innerHeight={this.innerHeight}
                 margin={this.props.margin.right}
                 transform={`translate(0, ${this.innerHeight + this.props.margin.right})`}
                 scale={this.xScale} />
          <YAxis className="y"
                 innerWidth={this.innerWidth - this.yAxisOffset}
                 transform={`translate(${this.yAxisOffset}, 0)`}
                 scale={this.yScale} />
          {this.props.data.map((d, i) => (
            <Dot r={4}
                 cx={this.x(d)}
                 cy={this.y(d)}
                 key={`dot-${i}`} />
          ))}
        </g>
        {(this.props.credit || this.props.source) &&
          <Footer innerWidth={this.innerWidth}
                  margin={this.props.margin.right}
                  transform={`translate(${this.props.margin.right}, ${this.props.height - this.props.margin.left})`}
                  credit={this.props.credit}
                  source={this.props.source} />
        }
      </svg>
    );
  }
}

export default ScatterChart;