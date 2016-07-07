'use strict';

import React from 'react';
import * as d3 from 'd3';

import Chart from './Chart.js';
import {XAxis, YAxis} from './Axis.js';
import Bar from './Bar.js';
import Header from './Header.js';
import Footer from './Footer.js';

class BarChart extends Chart {
  barWidth() {
    if (this.props.colType === 'ordinal') {
      return this.xScale.bandwidth();
    } else {
      return this.innerWidth / (this.xScale.domain()[1] - this.xScale.domain()[0]);
    }
  }

  x(d) {
    if (this.props.colType === 'ordinal') {
      return this.xScale(d[this.props.cols[0]]);
    } else {
      return this.xScale(d[this.props.cols[0]]) - this.barWidth() / 2;
    }
  }

  render() {
    return (
      <svg className="fl bg-near-white"
           width={this.props.width}
           height={this.props.height}>
        {(this.props.title || this.props.subtitle) &&
          <Header transform={`translate(${this.props.margin.right}, ${this.props.margin.left})`}
                  title={this.props.title}
                  subtitle={this.props.subtitle} />
        }
        <g className="chart"
           transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}>
          <XAxis className="x"
                 innerHeight={this.innerHeight}
                 margin={this.props.margin.right / 2}
                 transform={`translate(0, ${this.innerHeight})`}
                 scale={this.xScale} />
          <YAxis className="y"
                 innerWidth={this.innerWidth - this.maxDigits * 10}
                 transform={`translate(${this.maxDigits * 10}, 0)`}
                 scale={this.yScale} />
          {this.props.data.map((d, i) => (
            <Bar x={this.x(d)}
                 y={this.y(d)}
                 width={this.barWidth()}
                 height={this.innerHeight - this.yScale(d[this.props.cols[1]])}
                 key={`bar-${i}`} />
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

export default BarChart;