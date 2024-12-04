import React from "react";
import { useNotification } from "../context/NotificationContext";

function Notification() {
  const { message } = useNotification();

  return (
    message && (
      <div
        style={{
          textAlign: "center",
          color: "green",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        {message}
      </div>
    )
  );
}

export default Notification;
