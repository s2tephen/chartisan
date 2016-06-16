'use strict';

import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDataChange(e) {
    this.props.handleDataChange(e);
  }

  handlePropChange(propName, e) {
    this.props.handlePropChange(propName, e);
  }

  render() {
    return (
      <div className="form">
        <h2 className="mt4 f6 fw7 ttu tracked">Data (CSV or TSV)</h2>
        <textarea className="form-data w-100 pa1 h4 f5 f6-ns monospace b--black-20 b-focus--black-50 no-resize"
                  defaultValue={'episode,score\nI,7.6\nII,6.7\nIII,7.6\nIV,8.7\nV,8.8\nVI,8.4\nVII,8.2'}
                  onChange={this.handleDataChange.bind(this)} />
        <div className="form-title dt w-100 mt4">
          <h2 className="dtc w-20 f6 fw7 ttu tracked">Title</h2>
          <input type="text"
                 className="dtc w-100 pa1 ba b--black-20 b-focus--black-50"
                 value={this.props.title}
                 maxLength="50"
                 onChange={this.handlePropChange.bind(this, 'title')} />
        </div>
        <div className="dt form-subtitle w-100 mt2">
          <h2 className="dtc w-20 f6 fw7 ttu tracked">Subtitle</h2>
          <input type="text"
                 className="dtc w-100 pa1 ba b--black-20 b-focus--black-50"
                 value={this.props.subtitle}
                 maxLength="60"
                 onChange={this.handlePropChange.bind(this, 'subtitle')} />
        </div>
        <div className="dt form-credit w-100 mt4">
          <h2 className="dtc w-20 f6 fw7 ttu tracked">Credit</h2>
          <input type="text"
                 className="dtc w-100 pa1 ba b--black-20 b-focus--black-50"
                 value={this.props.credit}
                 maxLength="60"
                 onChange={this.handlePropChange.bind(this, 'credit')} />
        </div>
        <div className="dt form-source w-100 mt2">
          <h2 className="dtc w-20 f6 fw7 ttu tracked">Source</h2>
          <input type="text"
                 className="dtc w-100 pa1 ba b--black-20 b-focus--black-50"
                 value={this.props.source}
                 maxLength="60"
                 onChange={this.handlePropChange.bind(this, 'source')} />
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  credit: React.PropTypes.string,
  handleDataChange: React.PropTypes.func,
  handlePropChange: React.PropTypes.func,
  source: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string
};

export default Form;