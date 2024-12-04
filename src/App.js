import React from "react";
import InventoryForm from "./components/InventoryForm";

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Inventory Management</h1>
        <p>Track and manage your stock effortlessly.</p>
      </header>
      <main>
        <section style={{ marginBottom: "20px" }}>
          <h2>Add Inventory Item</h2>
          <InventoryForm />
        </section>
        <section style={{ marginBottom: "20px" }}>
          <h2>Inventory Table</h2>
          <p>Table will go here.</p>
        </section>
        <section>
          <h2>Reorder List</h2>
          <p>Reorder list will go here.</p>
        </section>
      </main>
    </div>
  );
}

export default App;

