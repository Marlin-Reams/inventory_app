import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import InventoryTable from "../components/InventoryTable";

function HomePage() {
  const { inventory, deleteItem } = useInventory(); // Access deleteItem from context
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInventory = inventory.filter(
    (item) =>
      item.articleNumber.toLowerCase().includes(searchQuery) ||
      item.itemNumber.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div>
      <h2>Inventory List</h2>
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
      />
      <InventoryTable
        inventory={filteredInventory}
        onDeleteItem={deleteItem} // Pass deleteItem as a prop
      />
    </div>
  );
}

export default HomePage;



