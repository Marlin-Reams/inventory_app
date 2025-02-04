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

      {/* Sticky Search and Category Filter */}
      <div className="filter-container">
        <div className="filter-section">
          <label>Category: </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const newCategory = e.target.value;
              setSelectedCategory(newCategory);
              navigate(newCategory ? `/category/${newCategory}` : "/");
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-section">
          <label>Search: </label>
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="clear-btn">✖</button>
          )}
        </div>
      </div>

      {/* Inventory Table */}
      {selectedCategory || searchQuery ? (
        filteredInventory.length > 0 ? (
          <div className="table-wrapper">
            <InventoryTable
              inventory={filteredInventory}
              onDeleteItem={(id) => {
                if (window.confirm("Are you sure you want to delete this item?")) {
                  deleteItem(id); 
                }
              }}
              onEditItem={(id) => navigate(`/edit-item/${id}`)}
            />
          </div>
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











