import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { useNavigate } from "react-router-dom";
import InventoryTable from "../components/InventoryTable";

function HomePage() {
  const { inventory, deleteItem } = useInventory(); // Access inventory and deleteItem from context
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const navigate = useNavigate();

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
        {/* Category Filter */}
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
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search inventory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          style={{ padding: "8px", width: "200px" }}
        />
      </div>
      {/* Inventory Table */}
      <InventoryTable
        inventory={filteredInventory}
        onDeleteItem={(id) => {
          if (window.confirm("Are you sure you want to delete this item?")) {
            deleteItem(id); // Pass the document ID
          }
        }}


        onEditItem={(id) => {
          console.log("Navigating to edit item with ID:", id); // Log the ID being passed
          if (!id) {
            console.error("Error: ID is undefined");
          }
          navigate(`/edit-item/${id}`); // Navigate to the edit page
          console.log("Filtered Inventory:", filteredInventory);
        }}
      />
    </div>
  );

}



export default HomePage;








