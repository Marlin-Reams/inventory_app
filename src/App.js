import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import InventoryForm from "./components/InventoryForm";
import InventoryTable from "./components/InventoryTable";
import { useInventory } from "./hooks/useInventory";

function App() {
  const { inventory, addItem, editItem, deleteItem } = useInventory();

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
                    <InventoryTable
                      inventory={inventory}
                      onEditItem={(index) => console.log("Edit:", index)} // Placeholder
                      onDeleteItem={deleteItem}
                    />
                  ) : (
                    <p>No items in inventory. Add some to get started!</p>
                  )}
                </div>
              }
            />
            <Route
              path="/add-item"
              element={<InventoryForm onAddItem={addItem} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
