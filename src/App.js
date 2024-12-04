import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InventoryForm from "./components/InventoryForm";

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
                  <ul>
                    {inventory.map((item, index) => (
                      <li key={index}>
                        {item.articleNumber} - {item.description} (Quantity: {item.quantity}, Stock Level: {item.stockLevel})
                      </li>
                    ))}
                  </ul>
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

