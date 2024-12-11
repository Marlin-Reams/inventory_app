import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./css/global.css";
import { InventoryProvider } from "./context/InventoryContext"; // Adjust the path if necessary
import { NotificationProvider } from "./context/NotificationContext"; // Adjust the path if necessary



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <InventoryProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </InventoryProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();