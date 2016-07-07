'use strict';

import React from 'react';

import Input from './Input.js';

class ExtentInput extends Input {
  render() {
    return (
      <div className={`form-${this.props.label} dt w-100 mt2`}>
        <h2 className="dtc w-20 f6 fw7 ttu tracked v-mid">{this.props.label}</h2>
        <fieldset className="dtc w-100 h2 pa0 ma0 bn">
          <span className="form-extent absolute pa2 f6 monospace black-50 pe-none">min</span>
          <input type="number"
                 className="form-extent b-box w-34 h2 pa1 ba b--black-20 b-focus--black-50 outline-0"
                 value={this.props.value1}
                 onChange={this.props.onChange.bind(this, this.props.field1)} />
          <span className="form-extent absolute pa2 f6 monospace black-50 pe-none">max</span>
          <input type="number"
                 className="form-extent b-box w-33 h2 pa1 ba b--black-20 b-focus--black-50 outline-0"
                 value={this.props.value2}
                 onChange={this.props.onChange.bind(this, this.props.field2)} />
          <button className="form-extent b-box w-33 h2 pa1 ba b--black-20 bg-near-white bg-hover--black-20 outline-0 pointer"
                  onClick={this.props.onClick.bind(this, this.props.label, [null, null])}>Auto</button>
        </fieldset>
      </div>
    );
  }
}

ExtentInput.propTypes = {
  field1: React.PropTypes.string,
  field2: React.PropTypes.string,
  label: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value1: React.PropTypes.string,
  value2: React.PropTypes.string
};

export default ExtentInput;