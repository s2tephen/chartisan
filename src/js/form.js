'use strict';

import React from 'react';

import RadioInput from './RadioInput.js';
import TextInput from './TextInput.js';
import ExtentInput from './ExtentInput.js';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form">
        <h2 className="mt0 f6 fw7 ttu tracked">Data (CSV or TSV)</h2>
        <textarea className="form-data w-100 pa1 h4 f5 f6-ns monospace b--black-20 b-focus--black-50 no-resize"
                  defaultValue={'year,score\n1977,8.7\n1980,8.8\n1983,8.4\n1999,7.6\n2002,6.7\n2005,7.6\n2015,8.2'}
                  onChange={this.props.handleDataChange.bind(this)} />
        <RadioInput field="chartType"
                    label="chart"
                    value={this.props.chartType}
                    options={['bar', 'line', 'scatter']}
                    onChange={this.props.handlePropChange} />
        <RadioInput field="colType"
                    label="x-axis"
                    value={this.props.colType}
                    options={['ordinal', 'numeric', 'time']}
                    onChange={this.props.handlePropChange} />
        {this.props.colType === 'numeric' &&
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