'use strict';

import React from 'react';
import * as d3 from 'd3';

import Chart from './Chart.js';
import {XAxis, YAxis} from './Axis.js';
import Line from './Line.js';
import Header from './Header.js';
import Footer from './Footer.js';

class LineChart extends Chart {
  render() {
    return (
      <svg className="fr bg-near-white"
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
                 transform={`translate(0, ${this.innerHeight})`}
                 scale={this.xScale} />
          <YAxis className="y"
                 innerWidth={this.innerWidth}
                 scale={this.yScale} />
          <Line cols={this.props.cols}
                data={this.props.data}
                xScale={this.xScale}
                yScale={this.yScale} />
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