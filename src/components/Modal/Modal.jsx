import React from 'react';
import { Component } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  // Закриття модалки по кліку на Escape
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  // Чистимо слухача після закриття модалки
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  // Відслідковування натискання Escape і виклик функції закриття модалки
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  // Закриття по кліку на бекдроп
  hanleBeckdropClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return (
      <div className="Overlay" onClick={this.hanleBeckdropClick}>
        <div className="Modal">
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImage: PropTypes.string,
};
