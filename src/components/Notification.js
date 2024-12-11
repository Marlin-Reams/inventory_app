// src/components/Notification.js

import React from "react";
import { useNotification } from "../context/NotificationContext";

function Notification() {
  const { notification } = useNotification();

  if (!notification.message) {
    return null; // Don't render anything if there's no message
  }

  const notificationStyles = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: notification.type === "error" ? "red" : "green",
    color: "white",
    zIndex: 1000,
  };

  return (
    <div style={notificationStyles}>
      {notification.message}
    </div>
  );
}

export default Notification;
