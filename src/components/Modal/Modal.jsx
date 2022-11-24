import { useEffect } from 'react';

import './Modal.css';
import PropTypes from 'prop-types';

export function Modal({ onClose, largeImage }) {
  // Закриття модалки по кліку на Escape
  // вішає EventListener на Escape і знімає
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Відслідковування натискання Escape і виклик функції закриття модалки
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  // Закриття по кліку на бекдроп
  const hanleBeckdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={hanleBeckdropClick}>
      <div className="Modal">
        <img src={largeImage} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  largeImage: PropTypes.string,
};
