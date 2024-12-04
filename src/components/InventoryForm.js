import React, { useState } from "react";

function InventoryForm({ onAddItem }) {
  // State to track form fields
  const [formData, setFormData] = useState({
    articleNumber: "",
    itemNumber: "",
    description: "",
    quantity: "",
    stockLevel: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(formData); // Pass data back to App
    setFormData({ articleNumber: "", itemNumber: "", description: "", quantity: "", stockLevel: "" }); // Clear form
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Article Number:
        <input type="text" name="articleNumber" value={formData.articleNumber} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Item Number:
        <input type="text" name="itemNumber" value={formData.itemNumber} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Description:
        <input type="text" name="description" value={formData.description} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Stock Level:
        <input type="number" name="stockLevel" value={formData.stockLevel} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default InventoryForm;
