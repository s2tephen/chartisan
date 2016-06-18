'use strict';

import React from 'react';

import Input from './Input.js';

class RadioInput extends Input {
  render() {
    return (
      <div className={`form-${this.props.field} dt w-100 mt2`}>
        <h2 className="dtc w-20 f6 fw7 ttu tracked v-mid">{this.props.label || this.props.field}</h2>
        <fieldset className="dtc w-100 pa0 ma0 bn">
          {this.props.options.map((o, i) => (
            <div className={`form-radio relative dib w-${i === 1 ? '34' : '33'} h2 ba ${o === this.props.value ? 'b--black-50 bg-near-white' : 'b--black-20'}`}
                 key={`radio-${this.props.field}-${i}`}>
              <input type="radio"
                     className={`absolute w-100 h2 o-0 z-1${o !== this.props.value ? ' pointer' : ''}`}
                     name={this.props.field}
                     value={o}
                     checked={o === this.props.value}
                     onChange={this.props.onChange.bind(this, this.props.field)} />
              <label className={`absolute b-box w-100 h2 pv1 ttc tc`}>{o}</label>
            </div>
          ))}
        </fieldset>
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