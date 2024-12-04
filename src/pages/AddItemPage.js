import React from "react";
import InventoryForm from "../components/InventoryForm";
import { useInventory } from "../context/InventoryContext";
import { useNotification } from "../context/NotificationContext";

function AddItemPage() {
  const { addItem } = useInventory(); // Access the addItem function from context
  const { showMessage } = useNotification(); // Access notification system

  const handleAddItem = (item) => {
    addItem(item); // Add item to inventory
    showMessage("Item added successfully!"); // Notify the user
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <InventoryForm onSubmit={handleAddItem} /> {/* Pass the function */}
    </div>
  );
}

export default AddItemPage;

