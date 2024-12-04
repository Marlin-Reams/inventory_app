import React from "react";
import { useParams } from "react-router-dom";
import InventoryForm from "../components/InventoryForm";
import { useInventory } from "../context/InventoryContext";
import { useNotification } from "../context/NotificationContext";

function EditItemPage() {
  const { index } = useParams(); // Get item index from the URL
  const { inventory, editItem } = useInventory(); // Access inventory and editItem function
  const { showMessage } = useNotification(); // Access showMessage for notifications

  const itemToEdit = inventory[parseInt(index)]; // Get the item to edit

  if (!itemToEdit) {
    return <p>Item not found!</p>; // Show an error if the item doesn't exist
  }

  const handleEditItem = (updatedItem) => {
    editItem(parseInt(index), updatedItem); // Update the item in the inventory
    showMessage("Item updated successfully!"); // Show success message
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <InventoryForm initialData={itemToEdit} onSubmit={handleEditItem} /> {/* Pass data to form */}
    </div>
  );
}

export default EditItemPage;
