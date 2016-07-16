'use strict';

import './index.html';
import './css/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import moment from 'moment';

import Form from './js/Form.js';
import BarChart from './js/BarChart.js';
import LineChart from './js/LineChart.js';
import ScatterChart from './js/ScatterChart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: ['year', 'imdb', 'rt'],
      delimiter: ',',
      data: [
        {'year': 1977, 'imdb': 87, 'rt': 93},
        {'year': 1980, 'imdb': 88, 'rt': 94},
        {'year': 1983, 'imdb': 84, 'rt': 80},
        {'year': 1999, 'imdb': 76, 'rt': 55},
        {'year': 2002, 'imdb': 67, 'rt': 65},
        {'year': 2005, 'imdb': 76, 'rt': 79},
        {'year': 2015, 'imdb': 82, 'rt': 92}
      ],
      colType: 'time',
      chartType: 'line',
      xMin: '1975',
      xMax: '2015',
      yMin: '50',
      yMax: '100',
      title: 'The Force is strong with this series',
      subtitle: 'Average ratings of Star Wars episodes by release year',
      credit: 'stephensuen.com/chartisan',
      source: 'IMDb/Rotten Tomatoes'
    };
  }

  handleDataChange(e) {
    let rows = e.target.value.split('\n');
    let delimiter = this.getDelimiter(rows);
    let cols = rows.shift().split(delimiter),
        colType = this.getColType(rows);

    if (this.validateData(rows, cols, delimiter)) {    
      this.setState({
        cols: cols,
        data: rows.map(function(r) {
          let vals = r.split(delimiter),
              row = {};
          for (let i = 0; i < cols.length; i++) {
            row[cols[i]] = vals[i];
          }
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

  handleExtentChange(extentName, value) {
    if (extentName === 'domain') {
      this.setState({xMin: value[0], xMax: value[1]});
    } else if (extentName === 'range') {
      this.setState({yMin: value[0], yMax: value[1]});
    }
  }

  getColType(rows) {
    if (rows.every(r => !isNaN(Number(r.split(',')[0])))) {
      this.setState({colType: 'numeric'});
      return 'numeric';
    } else if (rows.every(r => moment(r.split(',')[0]).isValid())) {
      this.setState({colType: 'time'});
      return 'time';
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
    if (numCols > 5) {
      throw new Error('Data has too many columns.');
    } else if (rows.some(r => r.split(delimiter).length !== numCols)) {
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
    let marginTop = 50,
        marginBottom = 40;

    if (this.state.title || this.state.subtitle) marginTop += 25;
    if (this.state.title && this.state.subtitle) marginTop += 25;

    if (this.state.chartType !== 'bar') marginBottom += 20;
    if (this.state.credit || this.state.source) marginBottom += 40;

    return (
      <div>
        <div className="w-100 w-50-ns pr3 pr5-ns fl">
          <Form chartType={this.state.chartType}
                colType={this.state.colType}
                cols={this.state.cols}
                xMin={this.state.xMin}
                xMax={this.state.xMax}
                yMin={this.state.yMin}
                yMax={this.state.yMax}
                title={this.state.title}
                subtitle={this.state.subtitle}
                credit={this.state.credit}
                source={this.state.source}
                handleDataChange={this.handleDataChange.bind(this)}
                handlePropChange={this.handlePropChange.bind(this)}
                handleExtentChange={this.handleExtentChange.bind(this)} />
        </div>
        <div className="w-100 w-50-ns fr">
          <h2 className="mt0 f6 fw7 ttu tracked">Preview</h2>
          {this.state.chartType === 'bar' &&
            <BarChart width={640}
                      height={480}
                      margin={{'top': marginTop, 'right': 20, 'bottom': marginBottom, 'left': 40}}
                      padding={0.2}
                      cols={this.state.cols}
                      data={this.state.data}
                      colType={this.state.colType}
                      domain={[this.state.xMin, this.state.xMax]}
                      range={[this.state.yMin, this.state.yMax]}
                      title={this.state.title}
                      subtitle={this.state.subtitle}
                      credit={this.state.credit}
                      source={this.state.source}
                      handleExtentChange={this.handleExtentChange.bind(this)} />
          }
          {this.state.chartType === 'line' &&
            <LineChart width={640}
                       height={480}
                       margin={{'top': marginTop, 'right': 20, 'bottom': marginBottom, 'left': 40}}
                       cols={this.state.cols}
                       data={this.state.data}
                       colType={this.state.colType}
                       domain={[this.state.xMin, this.state.xMax]}
                       range={[this.state.yMin, this.state.yMax]}
                       title={this.state.title}
                       subtitle={this.state.subtitle}
                       credit={this.state.credit}
                       source={this.state.source}
                       handleExtentChange={this.handleExtentChange.bind(this)} />
          }
          {this.state.chartType === 'scatter' &&
            <ScatterChart width={640}
                          height={480}
                          margin={{'top': marginTop, 'right': 20, 'bottom': marginBottom, 'left': 40}}
                          cols={this.state.cols}
                          data={this.state.data}
                          colType={this.state.colType}
                          domain={[this.state.xMin, this.state.xMax]}
                          range={[this.state.yMin, this.state.yMax]}
                          title={this.state.title}
                          subtitle={this.state.subtitle}
                          credit={this.state.credit}
                          source={this.state.source}
                          handleExtentChange={this.handleExtentChange.bind(this)} />
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