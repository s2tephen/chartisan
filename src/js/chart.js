'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import {XAxis, YAxis} from './axis';
import Bar from './bar';

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.innerWidth  = props.width - props.margin.left - props.margin.right;
    this.innerHeight = props.height - props.margin.top - props.margin.bottom;

    this.xScale = d3.scaleBand()
                    .rangeRound([0, this.innerWidth])
                    .padding(0.1)
                    .domain(props.data.map(d => d[props.cols[0]]));

    this.yScale = d3.scaleLinear()
                    .rangeRound([this.innerHeight, 0])
                    .domain([0, d3.max(props.data, d => d[props.cols[1]])])
                    .nice(1);
  }

  componentWillReceiveProps(nextProps) {
    this.innerWidth  = nextProps.width - nextProps.margin.left - nextProps.margin.right;
    this.innerHeight = nextProps.height - nextProps.margin.top - nextProps.margin.bottom;

    this.xScale = d3.scaleBand()
                    .rangeRound([0, this.innerWidth])
                    .padding(0.1)
                    .domain(nextProps.data.map(d => d[nextProps.cols[0]]));

    this.yScale = d3.scaleLinear()
                    .rangeRound([this.innerHeight, 0])
                    .domain([0, d3.max(nextProps.data, d => d[nextProps.cols[1]])])
                    .nice(1);
  }

  render() {
    return (
      <svg className="fr bg-near-white"
           width={this.props.width}
           height={this.props.height}>
        {this.props.title &&
          <text className="f3 fw7 tracked-tight fill--black-70"
                x={this.props.margin.right}
                y={this.props.margin.left}>
            {this.props.title}
          </text>
        }
        {this.props.subtitle &&
          <text className="f4 fw4 i fill--black-50"
              x={this.props.margin.right}
              y={this.props.margin.left}
              dy={this.props.title ? '1.5rem' : null}>
              {this.props.subtitle}
          </text>
        }
        <g transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}>
          <XAxis className="x"
                 scale={this.xScale}
                 innerHeight={this.innerHeight}
                 transform={`translate(0, ${this.innerHeight})`} />
          <YAxis className="y"
                 scale={this.yScale}
                 innerWidth={this.innerWidth} />
          {this.props.data.map((d, i) => (
            <Bar x={this.xScale(d[this.props.cols[0]])}
                 y={this.yScale(d[this.props.cols[1]])}
                 width={this.xScale.bandwidth()}
                 height={this.innerHeight - this.yScale(d[this.props.cols[1]])}
                 key={`bar-${i}`} />
          ))}
        </g>
        {(this.props.credit || this.props.source) &&
          <line className="stroke--black-30"
                x1={this.props.margin.right}
                y1={this.props.height - this.props.margin.left}
                x2={this.props.width - this.props.margin.right}
                y2={this.props.height - this.props.margin.left} />
        }
        {this.props.credit &&
          <text className="f6 ttu fill--black-30"
                x={this.props.margin.right}
                y={this.props.height}
                dy={-this.props.margin.right}>
            {this.props.credit}
          </text>
        }
        {this.props.source &&
          <text className="f6 ttu fill--black-30"
              x={this.props.width}
              y={this.props.height}
              dx={-this.props.margin.right}
              dy={-this.props.margin.right}
              textAnchor="end">
              Source: {this.props.source}
          </text>
        }
      </svg>
    );
  }
}

Chart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  margin: React.PropTypes.object
};

export default Chart;