import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import InventoryTable from "../components/InventoryTable";

function HomePage() {
  const { inventory, deleteItem } = useInventory(); // Access deleteItem from context
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

  // Unique categories in the inventory
  const categories = Array.from(new Set(inventory.map((item) => item.category))).sort();

  // Filter inventory by category and search query
  const filteredInventory = inventory.filter(
    (item) =>
      (selectedCategory === "" || item.category === selectedCategory) &&
      (item.articleNumber.toLowerCase().includes(searchQuery) ||
        item.itemNumber.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery))
  );

  return (
    <div>
      <h2>Inventory List</h2>
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          style={{ padding: "8px", width: "200px" }}
        />
      </div>
      <InventoryTable
  inventory={filteredInventory}
  onDeleteItem={(index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteItem(index); // Call deleteItem directly with the index
    }
  }}
/>
    </div>
  );
}

export default HomePage;





