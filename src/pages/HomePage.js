import React, { useState, useEffect } from "react";
import { useInventory } from "../context/InventoryContext";
import { useNavigate, useParams } from "react-router-dom";
import InventoryTable from "../components/InventoryTable";
import "../css/HomePage.css";


function HomePage() {
  const { inventory, deleteItem } = useInventory();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const { categoryName } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    // Set category from URL or default to empty for "All Categories"
    setSelectedCategory(categoryName || "");
  }, [categoryName]);

  const categories = Array.from(new Set(inventory.map((item) => item.category))).sort();

  const filteredInventory = inventory.filter(
    (item) =>
      (selectedCategory === "" || item.category === selectedCategory) &&
      (item.articleNumber.toLowerCase().includes(searchQuery) ||
        item.itemNumber.toLowerCase().includes(searchQuery) ||
        item.description.toLowerCase().includes(searchQuery))
  );
  

  return (
    <div>
      <h2>Inventory Management</h2>
      <div style={{ marginBottom: "20px" }}>
        {/* Category Selector */}
        <select
          value={selectedCategory}
          onChange={(e) => {
            const newCategory = e.target.value;
            setSelectedCategory(newCategory);
            if (newCategory) {
              navigate(`/category/${newCategory}`); // Navigate to category page
            } else {
              navigate("/"); // Navigate to homepage
            }
          }}
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
      {/* Conditionally Render Inventory Table */}
      {selectedCategory || searchQuery ? (
        filteredInventory.length > 0 ? (
          <InventoryTable
            inventory={filteredInventory}
            onDeleteItem={(id) => {
              if (window.confirm("Are you sure you want to delete this item?")) {
                deleteItem(id); 
              }
            }}
            onEditItem={(id) => navigate(`/edit-item/${id}`)}
          />
        ) : (
          <p>No items found. Try adjusting your filters or search query.</p>
        )
      ) : (
        <p>Select a category or enter a search term to view inventory.</p>
      )}
    </div>
  );
}

export default HomePage;









