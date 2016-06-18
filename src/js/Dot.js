'use strict';

import React from 'react';

class Dot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <circle className="dot"
              r={this.props.r}
              cx={this.props.cx}
              cy={this.props.cy} />
    );
  }
}

Dot.propTypes = {
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
  r: React.PropTypes.number
};

export default Dot;