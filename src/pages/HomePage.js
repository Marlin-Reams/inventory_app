import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import InventoryTable from "../components/InventoryTable";

function HomePage() {
  const { inventory, deleteItem } = useInventory(); // Include deleteItem for the table
  const [searchQuery, setSearchQuery] = useState("");

  // Filter inventory based on the search query
  const filteredInventory = inventory.filter((item) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.articleNumber.toLowerCase().includes(lowerCaseQuery) ||
      item.itemNumber.toLowerCase().includes(lowerCaseQuery) ||
      item.description.toLowerCase().includes(lowerCaseQuery) ||
      item.category.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <h2>Inventory List</h2>
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
      />
      <InventoryTable
        inventory={filteredInventory}
        onDeleteItem={(index) => {
          if (window.confirm("Are you sure you want to delete this item?")) {
            deleteItem(index);
          }
        }}
      />
    </div>
  );
}

export default HomePage;






