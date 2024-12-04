import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InventoryForm from "./components/InventoryForm";
import InventoryTable from "./components/InventoryTable";

function App() {
  const [inventory, setInventory] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); // Track if data has been loaded

  // Load inventory from localStorage on app initialization
  useEffect(() => {
    console.log("Initial Load: Checking localStorage");
    const savedItems = localStorage.getItem("inventory");
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      console.log("Loaded Items from localStorage:", parsedItems);
      setInventory(parsedItems);
    }
    setIsInitialized(true); // Mark that initialization is complete
  }, []);

  // Save inventory to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (isInitialized) {
      console.log("Saving Inventory to localStorage:", inventory);
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
  }, [inventory, isInitialized]);

  const addInventoryItem = (item) => {
    console.log("Adding Item:", item);
    setInventory((prevInventory) => {
      const updatedInventory = [...prevInventory, item];
      console.log("Updated Inventory State:", updatedInventory);
      return updatedInventory;
    });
  };

  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Inventory Management</h1>
          <nav>
            <Link to="/" style={{ margin: "0 10px" }}>Home</Link>
            <Link to="/add-item" style={{ margin: "0 10px" }}>Add Item</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2>Inventory List</h2>
                  {inventory.length > 0 ? (
                    <InventoryTable inventory={inventory} />
                  ) : (
                    <p>No items in inventory. Add some to get started!</p>
                  )}
                </div>
              }
            />
            <Route path="/add-item" element={<InventoryForm onAddItem={addInventoryItem} />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

