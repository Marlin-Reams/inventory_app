import React, { createContext, useState, useContext } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState("");

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 5000); // Clear after 3 seconds
  };

  return (
    <NotificationContext.Provider value={{ message, showMessage }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
