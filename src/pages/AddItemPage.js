import React from "react";
import InventoryForm from "../components/InventoryForm";
import { useInventory } from "../context/InventoryContext";
import { useNotification } from "../context/NotificationContext";

function AddItemPage() {
  const { inventory, addItem } = useInventory(); // Access inventory and addItem
  const { showMessage } = useNotification(); // Access notification system

  const handleAddItem = (newItem) => {
    // Check for duplicate article numbers
    const isDuplicate = inventory.some(
      (item) => item.articleNumber === newItem.articleNumber
    );

    if (isDuplicate) {
      showMessage("Error: Article number already exists!"); // Notify user
    } else {
      addItem(newItem); // Add the new item to inventory
      showMessage("Item added successfully!");
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <InventoryForm onSubmit={handleAddItem} /> {/* Pass the function */}
    </div>
  );
}

export default AddItemPage;


