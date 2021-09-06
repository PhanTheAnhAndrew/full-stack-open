import React from "react";
import "./styles.css";

function Notification({ message }) {
  if (!message) {
    return null;
  }

  return <div className="error">{message}</div>;
}

export default Notification;
