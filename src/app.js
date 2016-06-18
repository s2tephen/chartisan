'use strict';

import './index.html';
import './css/style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Form from './js/Form.js';
import BarChart from './js/BarChart.js';
import LineChart from './js/LineChart.js';
import ScatterChart from './js/ScatterChart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: ['state', 'enrollment'],
      delimiter: ',',
      data: [
        {state: 'CA', enrollment: 694},
        {state: 'NY', enrollment: 384},
        {state: 'MA', enrollment: 336},
        {state: 'TX', enrollment: 267},
        {state: 'FL', enrollment: 232},
        {state: 'NJ', enrollment: 191},
        {state: 'IL', enrollment: 148},
        {state: 'MD', enrollment: 142},
        {state: 'PA', enrollment: 127},
        {state: 'VA', enrollment: 126},
        {state: 'MI', enrollment: 104},
        {state: 'GA', enrollment: 86},
        {state: 'CT', enrollment: 85},
        {state: 'WA', enrollment: 76},
        {state: 'OH', enrollment: 73},
        {state: 'NC', enrollment: 70}
      ],
      colType: 'ordinal',
      chartType: 'bar',
      title: 'The Force is strong with this series',
      subtitle: 'Average IMDb user ratings of all Star Wars episodes',
      credit: 'stephensuen.com/chartisan',
      source: 'IMDb'
    };
  }

  handleDataChange(e) {
    let rows = e.target.value.split('\n');
    let delimiter = this.getDelimiter(rows);
    let cols = rows.shift().split(delimiter);
    let colType = this.getColType(rows);

    if (this.validateData(rows, cols, delimiter)) {    
      this.setState({
        cols: cols,
        data: rows.map(function(r) {
          let vals = r.split(delimiter);
          let row = {};
          row[cols[0]] = vals[0];
          row[cols[1]] = parseFloat(vals[1]);
          return row;
        })
      });
    }
  }

  handlePropChange(propName, e) {
    let nextState = {};
    nextState[propName] = e.target.value;
    this.setState(nextState);
  }

  getColType(rows) {
    if (rows.every(r => !isNaN(parseFloat(r.split(',')[0])))) {
      this.setState({colType: 'numeric'});
      return 'numeric';
    } else {
      this.setState({colType: 'ordinal'});
      return 'ordinal';
    }
  }

  getDelimiter(rows) {
    if (rows.every(r => r.split(',').length > 1)) {
      this.setState({delimiter: ','});
      return ',';
    } else if (rows.every(r => r.split('\t').length > 1)) {
      this.setState({delimiter: '\t'});
      return '\t';
    } else {
      throw new Error('Data does not contain a valid delimiter.');
    }
  }

  validateData(rows, cols, delimiter) {
    let numCols = cols.length;
    if (rows.some(r => r.split(delimiter).length !== numCols)) {
      throw new Error('Data contains an inconsistent number of columns.');
    } else if (rows.map(r => r.split(delimiter).slice(1))
                   .reduce((a, b) => a.concat(b))
                   .some(d => isNaN(d))) {
      throw new Error('Data contains invalid numerical data.');
    } else {
      return true;
    }
  }

  render() {
    let marginTop = 50;
    if (this.state.title || this.state.subtitle) marginTop += 25;
    if (this.state.title && this.state.subtitle) marginTop += 25;

    let marginBottom = 40;
    if (this.state.chartType !== 'bar') marginBottom += 20;
    if (this.state.credit || this.state.source) marginBottom += 40;

    return (
      <div>
        <div className="w-100 w-50-ns pr3 pr5-ns fl">
          <h1 className="mt0 f4 f3-ns lh-title tracked-tight">Farm to table to chart.</h1>
          <p className="measure f6 f5-ns lh-copy">
            <strong>Chartisan</strong> is a browser tool that brings you hand-crafted, highly opinionated charts
            right from the source — by which I mean <a className="dim link blue" href="//facebook.github.io/react/">
            React</a>, <a className="dim link blue" href="//d3js.org/">D3</a>, and <a className="dim link blue"
            href="//tachyons.io/">Tachyons</a>. Plug in some data below to get started!
          </p>
          <Form chartType={this.state.chartType}
                colType={this.state.colType}
                title={this.state.title}
                subtitle={this.state.subtitle}
                credit={this.state.credit}
                source={this.state.source}
                handleDataChange={this.handleDataChange.bind(this)}
                handlePropChange={this.handlePropChange.bind(this)} />
        </div>
        <div className="w-100 w-50-ns fr">
          {this.state.chartType === 'bar' &&
            <BarChart width={640}
                      height={480}
                      margin={{'top': marginTop, 'right': 20, 'bottom': marginBottom, 'left': 40}}
                      cols={this.state.cols}
                      data={this.state.data}
                      colType={this.state.colType}
                      title={this.state.title}
                      subtitle={this.state.subtitle}
                      credit={this.state.credit}
                      source={this.state.source} />
          }
          {this.state.chartType === 'line' &&
            <LineChart width={640}
                       height={480}
                       margin={{'top': marginTop, 'right': 20, 'bottom': marginBottom, 'left': 40}}
                       cols={this.state.cols}
                       data={this.state.data}
                       colType={this.state.colType}
                       title={this.state.title}
                       subtitle={this.state.subtitle}
                       credit={this.state.credit}
                       source={this.state.source} />
          }
          {this.state.chartType === 'scatter' &&
            <ScatterChart width={640}
                          height={480}
                          margin={{'top': marginTop, 'right': 20, 'bottom': marginBottom, 'left': 40}}
                          cols={this.state.cols}
                          data={this.state.data}
                          colType={this.state.colType}
                          title={this.state.title}
                          subtitle={this.state.subtitle}
                          credit={this.state.credit}
                          source={this.state.source} />
          }
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
