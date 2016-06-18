'use strict';

import React from 'react';

import RadioInput from './RadioInput.js';
import TextInput from './TextInput.js';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form">
        <h2 className="mt4 f6 fw7 ttu tracked">Data (CSV or TSV)</h2>
        <textarea className="form-data w-100 pa1 h4 f5 f6-ns monospace b--black-20 b-focus--black-50 no-resize"
                  defaultValue={'location,enrollment\nCA,694\nNY,384\nMA,336\nTX,267\nFL,232\nNJ,191\nIL,148\nMD,142\nPA,127\nVA,126\nMI,104\nGA,86\nCT,85\nWA,76\nOH,73\nNC,70'}
                  onChange={this.props.handleDataChange.bind(this)} />
        <RadioInput field="chartType"
                    label="Chart"
                    value={this.props.chartType}
                    options={['bar', 'line', 'scatter']}
                    onChange={this.props.handlePropChange} />
        <RadioInput field="colType"
                    label="X-Axis"
                    value={this.props.colType}
                    options={['ordinal', 'numeric', 'time']}
                    onChange={this.props.handlePropChange} />
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
  title: React.PropTypes.string
};

export default Form;