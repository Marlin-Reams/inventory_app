import React, { createContext, useContext, useState } from "react";

const NotificationContext = createContext(); // Create the context

export function NotificationProvider({ children }) {
  // State to manage the notification message
  const [message, setMessage] = useState("");

  // Function to show a message
  const showMessage = (msg) => {
    setMessage(msg); // Set the message
    setTimeout(() => setMessage(""), 3000); // Clear the message after 3 seconds
  };

  // Provide the state and function to the children
  return (
    <NotificationContext.Provider value={{ message, showMessage }}>
      {children}
    </NotificationContext.Provider>
  );
}

// Custom hook to use the NotificationContext
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}


