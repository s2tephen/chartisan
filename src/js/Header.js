'use strict';

import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className="header"
         transform={this.props.transform}>
        {this.props.title &&
          <text className="f3 sans-serif fw7 tracked-tight fill--black-70">
            {this.props.title}
          </text>
        }
        {this.props.subtitle &&
          <text className="f4 sans-serif fw4 i fill--black-50"
                y={this.props.title ? '1.5rem' : null}>
            {this.props.subtitle}
          </text>
        }
      </g>
    );
  }
}

Header.propTypes = {
  subtitle: React.PropTypes.string,
  title: React.PropTypes.string,
  transform: React.PropTypes.string
};

export default Header;