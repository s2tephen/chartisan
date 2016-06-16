'use strict';

import React from 'react';

import Input from './Input.js';

class RadioInput extends Input {
  render() {
    return (
      <div className={`form-${this.props.field} dt w-100 mt2 mb4`}>
        <h2 className="dtc w-20 f6 fw7 ttu tracked">{this.props.field}</h2>
        {this.props.options.map((o, i) => (
          <div className="dtc"
               key={`radio-${this.props.field}-${i}`}>
            <input type="radio"
                   className="mr2"
                   name={this.props.field}
                   value={o}
                   checked={o === this.props.value}
                   onChange={this.props.onChange.bind(this, this.props.field)} />
            <label>{o}</label>
          </div>
        ))}
      </div>
    );
  }
}

RadioInput.propTypes = {
  field: React.PropTypes.string,
  groupName: React.PropTypes.string,
  onChange: React.PropTypes.func,
  value: React.PropTypes.string
};

export default RadioInput;