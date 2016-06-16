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
                  defaultValue={'episode,score\nI,7.6\nII,6.7\nIII,7.6\nIV,8.7\nV,8.8\nVI,8.4\nVII,8.2'}
                  onChange={this.props.handleDataChange.bind(this)} />
        <RadioInput field="chart"
                    value={this.props.chart}
                    options={['bar', 'line']}
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
  chart: React.PropTypes.string,
  credit: React.PropTypes.string,
  handleDataChange: React.PropTypes.func,
  handlePropChange: React.PropTypes.func,
  source: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string
};

export default Form;