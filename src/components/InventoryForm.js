import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function InventoryForm({ onAddItem, onEditItem, inventory }) {
  const { index } = useParams();
  const navigate = useNavigate();

  // Determine if editing or adding
  const isEditing = index !== undefined;

  // State to track form fields
  const [formData, setFormData] = useState({
    articleNumber: "",
    itemNumber: "",
    description: "",
    quantity: "",
    stockLevel: "",
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (isEditing) {
      const itemToEdit = inventory[parseInt(index)];
      if (itemToEdit) {
        setFormData(itemToEdit);
      }
    }
  }, [isEditing, index, inventory]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onEditItem(parseInt(index), formData);
    } else {
      onAddItem(formData);
    }
    navigate("/"); // Redirect to home after submission
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
      <button type="submit">{isEditing ? "Update Item" : "Add Item"}</button>
    </form>
  );
}

export default InventoryForm;
