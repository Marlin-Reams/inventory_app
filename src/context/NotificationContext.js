// NotificationContext.js

import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showMessage = (message, options = {}) => {
    console.log("Displaying notification:", message, options);
    const { type = "success" } = options; // Default to "success" type
    setNotification({ message, type });
  
    setTimeout(() => {
      console.log("Clearing notification after timeout");
      setNotification({ message: "", type: "" });
    }, 3000); // Clear the message after 3 seconds
  };
  

  return (
    <NotificationContext.Provider value={{ notification, showMessage }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}


