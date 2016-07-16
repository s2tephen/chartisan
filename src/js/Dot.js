'use strict';

import React from 'react';

class Dot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <circle className={`dot fill--${this.props.color}`}
              r="4"
              cx={this.props.cx}
              cy={this.props.cy} />
    );
  }
}

Dot.propTypes = {
  color: React.PropTypes.string,
  cx: React.PropTypes.number,
  cy: React.PropTypes.number
};

export default Dot;