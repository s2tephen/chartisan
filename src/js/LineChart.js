'use strict';

import React from 'react';
import moment from 'moment';

import Chart from './Chart.js';
import {XAxis, YAxis} from './Axis.js';
import Line from './Line.js';
import Header from './Header.js';
import Legend from './Legend.js';
import Footer from './Footer.js';

class LineChart extends Chart {
  x(d) {
    if (this.props.colType === 'time') {
      return this.xScale(moment(d[this.props.cols[0]], this.timeFormats[this.props.timeFormat], true));
    } else if (this.props.colType === 'ordinal') {
      return this.xScale(d[this.props.cols[0]]) + this.xScale.bandwidth() / 2;
    }
    return this.xScale(d[this.props.cols[0]]);
  }

  render() {
    return (
      <svg className="fl"
           width={this.props.width}
           height={this.props.height}
           xmlns="http://www.w3.org/2000/svg"
           version="1.1">
        <rect width={this.props.width}
              height={this.props.height}
              fill="rgb(244,244,244)" />
        {(this.props.title || this.props.subtitle) &&
          <Header transform={`translate(${this.props.margin.right}, ${this.props.margin.left})`}
                  title={this.props.title}
                  subtitle={this.props.subtitle} />
        }
        {this.props.cols.length > 2 &&
          <Legend cols={this.props.cols.slice(1)}
                  colors={this.colors}
                  size={this.props.margin.right / 2}
                  transform={`translate(${this.props.margin.right}, ${this.props.margin.top - this.props.margin.left})`} />
        }
        <g className="chart"
           transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}>
          <XAxis className="x"
                 innerHeight={this.innerHeight}
                 margin={this.props.margin.right}
                 yAxisOffset={this.yAxisOffset}
                 transform={`translate(0, ${this.innerHeight + this.props.margin.right})`}
                 scale={this.xScale}
                 colType={this.props.colType} 
                 timeOrder={this.timeOrder} />
          <YAxis className="y"
                 innerWidth={this.innerWidth - this.yAxisOffset}
                 margin={this.props.margin.right}
                 transform={`translate(${this.yAxisOffset}, 0)`}
                 scale={this.yScale} />
          {this.props.cols.slice(1).map((c, i) => (
            <Line data={this.sliceData(c)}
                  i={i}
                  x={this.x.bind(this)}
                  y={this.y.bind(this)}
                  transform={`translate(${this.yAxisOffset / 2}, 0)`}
                  color={this.colors[i]}
                  key={`line-${i}`} />
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

export default LineChart;