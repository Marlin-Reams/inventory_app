import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import InventoryForm from "../components/InventoryForm";

function EditItemPage() {
  const { index } = useParams(); // Get the item index from the URL
  const { inventory, editItem } = useInventory(); // Access inventory and edit function
  const navigate = useNavigate();

  // Get the item to edit
  const itemToEdit = inventory[parseInt(index, 10)];

  if (!itemToEdit) {
    return <p>Item not found!</p>; // Handle invalid index gracefully
  }

  const handleEditItem = (updatedItem) => {
    editItem(parseInt(index, 10), updatedItem); // Update the item
    navigate("/"); // Redirect to homepage after saving
  };

  return (
    <div>
      <h2>Edit Item</h2>
      {/* Pass the item to edit and the submit handler to the form */}
      <InventoryForm initialData={itemToEdit} onSubmit={handleEditItem} />
    </div>
  );
}

export default EditItemPage;


