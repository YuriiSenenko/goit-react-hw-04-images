import React from 'react';
import { Component } from 'react';
import './Button.css';
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    return (
      <button className="Button" type="button" onClick={this.props.loadMore}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  children: PropTypes.string,
};
