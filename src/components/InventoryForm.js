import React, { useState, useEffect } from "react";

function InventoryForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    articleNumber: "",
    itemNumber: "",
    description: "",
    quantity: "",
    stockLevel: "",
    category: "",
    ...initialData, // Pre-fill form fields with initialData, if provided
  });

  // Highlighted change: Update formData when initialData changes
  useEffect(() => {
    if (initialData) { // Prevent unnecessary updates
      setFormData((prevData) => ({ ...prevData, ...initialData })); // Update state
    }
  }, [JSON.stringify(initialData)]); // Serialize object for stable comparison

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(formData);
      setFormData({
        articleNumber: "",
        itemNumber: "",
        description: "",
        quantity: "",
        stockLevel: "",
        category: "",
      }); // Reset the form after submission
    } else {
      console.error("onSubmit is not a function");
    }
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
          <option value="Tires">Tires</option>
          <option value="Wiper Blades">Wiper Blades</option>
          <option value="Oil Filters">Oil Filters</option>
          <option value="Air Filters">Air Filters</option>
          <option value="Cabin Air Filters">Cabin Air Filters</option>
          <option value="Oil Eco Boxes">Oil Eco Boxes</option>
          <option value="Light Bulbs">Light Bulbs</option>
          <option value="Consumables">Consumables</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InventoryForm;

