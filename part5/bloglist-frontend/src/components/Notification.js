import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function Notification({ message }) {
  if (!message) {
    return null;
  }

  return <div className="error">{message}</div>;
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
