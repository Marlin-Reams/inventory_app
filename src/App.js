import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InventoryForm from "./components/InventoryForm";

function App() {
  return (
    <Router>
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
      <h1>Inventory Management</h1>
          <nav>
            <Link to="/" style={{ margin: "0 10px" }}>
              Home
            </Link>
            <Link to="/add-item" style={{ margin: "0 10px" }}>
              Add Item
            </Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2>Welcome to Inventory Management</h2>
                  <p>Select an option from the menu above to get started.</p>
                </div>
              }
            />
            <Route path="/add-item" element={<InventoryForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

