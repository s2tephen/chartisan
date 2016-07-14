'use strict';

import React from 'react';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className="footer"
         transform={this.props.transform}>
        <line className="stroke--black-20"
              x2={this.props.innerWidth + this.props.margin}
              y1="0"
              y2="0" />
        {this.props.credit &&
          <text className="f6 sans-serif ttu fill--black-20"
                y={this.props.margin}>
            {this.props.credit}
          </text>
        }
        {this.props.source &&
          <text className="f6 sans-serif ttu fill--black-20"
                x={this.props.innerWidth + this.props.margin}
                y={this.props.margin}
                textAnchor="end">
            Source: {this.props.source}
          </text>
        }
      </g>
    );
  }
}

Footer.propTypes = {
  credit: React.PropTypes.string,
  innerWidth: React.PropTypes.number,
  margin: React.PropTypes.number,
  source: React.PropTypes.string,
  transform: React.PropTypes.string
};

export default Footer;