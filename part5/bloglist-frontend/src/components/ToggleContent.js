import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types';

const ToggleContent = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const { label, children } = props;

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
      visible,
    }
  })

  return (
    <div>
      <div className="toggle__title">{label} <button className="btn-toggle" onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button></div>
      <div className="toggle__content" style={showWhenVisible}>
        {children}
      </div>
    </div>
  );
});

ToggleContent.displayName = 'ToggleContent';

ToggleContent.propTypes = {
  label: PropTypes.string.isRequired,
}

export default ToggleContent;