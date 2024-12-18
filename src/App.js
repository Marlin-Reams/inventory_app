import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";
import { NotificationProvider } from "./context/NotificationContext";
import Notification from "./components/Notification";
import HomePage from "./pages/HomePage.js";
import AddItemPage from "./pages/AddItemPage";
import EditItemPage from "./pages/EditItemPage";
import CountItems from "./components/CountItems.js";
import CountPage from "./pages/CountPage.js";
import CountHistory from "./pages/CountHistory.js";

function App() {
  return (
    <InventoryProvider>
      <NotificationProvider>
        <Router>
          <Notification />
          <header style={{ textAlign: "center", marginBottom: "20px" }}>
            <h1>Inventory Management</h1>
            <nav>
              <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
              <Link to="/add-item" style={{ margin: "0 10px" }}>Add Item</Link>
              <Link to="/count" style={{ margin: "0 10px" }}>Count Inventory</Link>
              <Link to="/count-history" style={{ margin: "0 10px" }}>Count History</Link>

            </nav>
          </header>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="/edit-item/:id" element={<EditItemPage />} />
            <Route path="/count" element={<CountPage />} />
            <Route path="/count-items/:category/:sortingOrder" element={<CountItems />} />
            <Route path="/count-history" element={<CountHistory />} />
            
          </Routes>
        </Router>
      </NotificationProvider>
    </InventoryProvider>
  );
}

export default App;






