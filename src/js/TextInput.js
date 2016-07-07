'use strict';

import React from 'react';

import Input from './Input.js';

class TextInput extends Input {
  render() {
    return (
      <div className={`form-${this.props.field} dt w-100 mt2`}>
        <h2 className="dtc w-20 f6 fw7 ttu tracked">{this.props.label || this.props.field}</h2>
        <input type="text"
               className="dtc w-100 pa1 ba b--black-20 b-focus--black-50 outline-0"
               value={this.props.value}
               maxLength={this.props.maxLength}
               onChange={this.props.onChange.bind(this, this.props.field)} />
      </div>
    );
  }
}

TextInput.propTypes = {
  field: React.PropTypes.string,
  label: React.PropTypes.string,
  maxLength: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
};

export default TextInput;