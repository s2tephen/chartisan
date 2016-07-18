'use strict';

import React from 'react';
import {domain, padding, rangeRound, scaleBand} from 'd3-scale';

import Chart from './Chart.js';
import {XAxis, YAxis} from './Axis.js';
import BarGroup from './BarGroup.js';
import Header from './Header.js';
import Legend from './Legend.js';
import Footer from './Footer.js';

class BarChart extends Chart {
  setXScale(props, dataDidChange) {
    this.xScale = scaleBand().rangeRound([0, this.innerWidth])
                             .padding(0.1)
                             .domain(props.data.map(d => d[props.cols[0]]));

    this.xGroupScale = scaleBand().rangeRound([0, this.xScale.bandwidth()])
                                  .domain(props.cols.slice(1));
  }

  x(d, i) {
    return this.xGroupScale(this.props.cols[i + 1]);
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
                 margin={this.props.margin.right / 2}
                 yAxisOffset={this.yAxisOffset}
                 transform={`translate(0, ${this.innerHeight})`}
                 scale={this.xScale} />
          <YAxis className="y"
                 innerWidth={this.innerWidth - this.yAxisOffset}
                 transform={`translate(${this.yAxisOffset}, 0)`}
                 scale={this.yScale} />
          {this.props.cols.slice(1).map((c, i) => (
            <BarGroup cols={this.props.cols}
                      data={this.sliceData(c)}
                      i={i}
                      x={this.x.bind(this)}
                      y={this.y.bind(this)}
                      transform={`translate(${this.yAxisOffset / 2}, 0)`}
                      xScale={this.xScale}
                      yScale={this.yScale}
                      xGroupScale={this.xGroupScale}
                      yAxisOffset={this.yAxisOffset}
                      innerHeight={this.innerHeight}
                      color={this.colors[i]}
                      key={`barGroup-${i}`} />
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