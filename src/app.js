'use strict';

import './index.html';
import './css/style.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Form from './js/Form.js';
import BarChart from './js/BarChart.js';
import LineChart from './js/LineChart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: ['episode', 'score'],
      delimiter: ',',
      data: [
        {'episode': 'I', 'score': 7.6},
        {'episode': 'II', 'score': 6.7},
        {'episode': 'III', 'score': 7.6},
        {'episode': 'IV', 'score': 8.7},
        {'episode': 'V', 'score': 8.8},
        {'episode': 'VI', 'score': 8.4},
        {'episode': 'VII', 'score': 8.2}
      ],
      colType: 'ordinal',
      chart: 'bar',
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
      this.setState({colType: 'number'});
      return 'number';
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
    if (this.state.chart !== 'bar') marginBottom += 20;
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
          <Form chart={this.state.chart}
                title={this.state.title}
                subtitle={this.state.subtitle}
                credit={this.state.credit}
                source={this.state.source}
                handleDataChange={this.handleDataChange.bind(this)}
                handlePropChange={this.handlePropChange.bind(this)} />
        </div>
        <div className="w-100 w-50-ns fr">
          {this.state.chart === 'bar' &&
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
          {this.state.chart === 'line' &&
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
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
);
