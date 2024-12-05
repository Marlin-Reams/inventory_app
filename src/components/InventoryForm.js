import React, { useState, useEffect } from "react";
import { useInventory } from "../context/InventoryContext";
import { useNotification } from "../context/NotificationContext";

function InventoryForm({ onSubmit, initialData }) {
  const { categories, addCategory } = useInventory();
  const { showMessage } = useNotification();

  // State for the form fields
  const [formData, setFormData] = useState({
    articleNumber: "",
    itemNumber: "",
    description: "",
    quantity: "",
    stockLevel: "",
    category: "",
  });

  // State for adding new categories
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Prepopulate form data if initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategorySubmit = () => {
    if (!newCategory.trim()) {
      showMessage("Category cannot be empty!", { type: "error" });
      return;
    }
    if (categories.includes(newCategory)) {
      showMessage("Category already exists!", { type: "error" });
      return;
    }
    addCategory(newCategory);
    setFormData((prevData) => ({ ...prevData, category: newCategory }));
    setNewCategory("");
    setShowAddCategory(false);
    showMessage("Category added successfully!", { type: "success" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      articleNumber: "",
      itemNumber: "",
      description: "",
      quantity: "",
      stockLevel: "",
      category: "",
    });
    showMessage("Item saved successfully!", { type: "success" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Article Number:
        <input
          type="text"
          name="articleNumber"
          value={formData.articleNumber}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Item Number:
        <input
          type="text"
          name="itemNumber"
          value={formData.itemNumber}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Stock Level:
        <input
          type="number"
          name="stockLevel"
          value={formData.stockLevel}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setShowAddCategory(!showAddCategory)}
          style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
        >
          +
        </button>
      </label>
      {showAddCategory && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button
            type="button"
            onClick={handleCategorySubmit}
            style={{ marginLeft: "5px" }}
          >
            Add
          </button>
        </div>
      )}
      <br />
      <button type="submit">Save Item</button>
    </form>
  );
}

export default InventoryForm;

