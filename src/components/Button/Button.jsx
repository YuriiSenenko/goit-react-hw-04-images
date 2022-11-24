// import React from 'react';

import './Button.css';
import PropTypes from 'prop-types';

export function Button({ loadMore, children }) {
  return (
    <button className="Button" type="button" onClick={loadMore}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
};
