'use strict';

import React from 'react';
import {saveSvgAsPng, svgAsDataUri} from 'save-svg-as-png';

import RadioInput from './RadioInput.js';
import TextInput from './TextInput.js';
import ExtentInput from './ExtentInput.js';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  exportPng() {
    saveSvgAsPng(
      document.querySelector('svg'), this.getFilename('png'), {scale: 2.0}
    );
  }

  exportSvg() {
    let self = this;

    svgAsDataUri(document.querySelector('svg'), {}, function(uri) {
      let a = document.createElement('a');
      a.download = self.getFilename('svg');
      a.href = uri;
      document.body.appendChild(a);
      a.click();
      a.parentNode.removeChild(a);
    });
  }

  getFilename(extension) {
    if (this.props.title) {
      return `${this.props.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-chart.${extension}`;
    } else {
      return `${this.props.cols[1]}-vs-${this.props.cols[0]}-chart.${extension}`;
    }
  }

  render() {
    return (
      <div className="form">
        <h2 className="mt0 f6 fw7 ttu tracked">Data (CSV or TSV)</h2>
        <textarea className="form-data w-100 pa1 h4 f5 f6-ns monospace b--black-20 b-focus--black-50 no-resize"
                  defaultValue={'Year,IMDb users,Rotten Tomatoes critics\n1977,87,93\n1980,88,94\n1983,84,80\n1999,76,55\n2002,67,65\n2005,76,79\n2015,82,92'}
                  onChange={this.props.handleDataChange.bind(this)} />
        <RadioInput field="chartType"
                    label="chart"
                    value={this.props.chartType}
                    options={['bar', 'line', 'scatter']}
                    onChange={this.props.handlePropChange} />
        {this.props.chartType !== 'bar' &&
          <RadioInput field="colType"
                    label="x-axis"
                    value={this.props.colType}
                    options={['ordinal', 'numeric', 'time']}
                    onChange={this.props.handlePropChange} />
        }
        {this.props.chartType !== 'bar' && this.props.colType === 'numeric' &&
          <ExtentInput field1="xMin"
                       field2="xMax"
                       label="domain"
                       value1={this.props.xMin}
                       value2={this.props.xMax}
                       onChange={this.props.handlePropChange}
                       onClick={this.props.handleExtentChange} />
        }
        <ExtentInput field1="yMin"
                     field2="yMax"
                     label="range"
                     value1={this.props.yMin}
                     value2={this.props.yMax}
                     onChange={this.props.handlePropChange}
                     onClick={this.props.handleExtentChange} />
        <TextInput field="title"
                   value={this.props.title}
                   maxLength="50"
                   onChange={this.props.handlePropChange} />
        <TextInput field="subtitle"
                   value={this.props.subtitle}
                   maxLength="60"
                   onChange={this.props.handlePropChange} />
        <TextInput field="credit"
                   value={this.props.credit}
                   maxLength="30"
                   onChange={this.props.handlePropChange} />
        <TextInput field="source"
                   value={this.props.source}
                   maxLength="30"
                   onChange={this.props.handlePropChange} />
        <div className="form-export dt w-100 mt2">
          <h2 className="dtc w-20 f6 fw7 ttu tracked v-mid">Export</h2>
          <fieldset className="dtc w-100 h2 pa0 ma0 bn">
            <button className="form-button b-box w-50 h2 pa1 ba b--black-20 bg-near-white bg-hover--black-20 outline-0 pointer"
                    onClick={this.exportPng.bind(this)}>PNG</button>
            <button className="form-button b-box w-50 h2 pa1 ba b--black-20 bg-near-white bg-hover--black-20 outline-0 pointer"
                    onClick={this.exportSvg.bind(this)}>SVG</button>
          </fieldset>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  chartType: React.PropTypes.string,
  credit: React.PropTypes.string,
  colType: React.PropTypes.string,
  handleDataChange: React.PropTypes.func,
  handlePropChange: React.PropTypes.func,
  source: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string,
  xMax: React.PropTypes.string,
  xMin: React.PropTypes.string,
  yMax: React.PropTypes.string,
  yMin: React.PropTypes.string
};

export default Form;