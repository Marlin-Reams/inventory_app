import React from "react";
import InventoryForm from "../components/InventoryForm";
import { useInventory } from "../context/InventoryContext";
import { useNotification } from "../context/NotificationContext";

function AddItemPage() {
  const { inventory, addItem } = useInventory(); // Access inventory and addItem
  const { showMessage } = useNotification(); // Access notification system

  const handleAddItem = async (newItem) => {
    console.log("Attempting to add item:", newItem);

    // Check for duplicate article numbers
    const isDuplicate = inventory.some(
      (item) =>
        item.articleNumber.trim().toLowerCase() ===
        newItem.articleNumber.trim().toLowerCase()
    );

    if (isDuplicate) {
      console.warn("Duplicate article number detected:", newItem.articleNumber);
      showMessage("Error: Article number already exists!", { type: "error" });
      return; // Exit early to prevent further processing
    }

    try {
      // Add the item only if no duplicates
      await addItem(newItem);
      console.log("Item added successfully to Firestore:", newItem);
      showMessage("Item added successfully!", { type: "success" });
    } catch (error) {
      console.error("Error adding item:", error.message || error);
      showMessage(`Error: ${error.message || "Failed to add item"}`, {
        type: "error",
      });
    }
  };

  return (
    <div>
      <h2>Add New Item</h2>
      {/* Pass handleAddItem directly */}
      <InventoryForm onSubmit={handleAddItem} />
    </div>
  );
}

export default AddItemPage;


