import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import InventoryForm from "../components/InventoryForm";
import { useInventory } from "../context/InventoryContext";
import { useNotification } from "../context/NotificationContext";

function EditItemPage() {
  const { id } = useParams();
  const { editItem } = useInventory();
  const { showMessage } = useNotification();
  const [itemToEdit, setItemToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        if (!id) {
          console.error("Error: ID is undefined");
          setLoading(false);
          return;
        }
        const itemDoc = doc(db, "inventory", id);
        const docSnap = await getDoc(itemDoc);
        if (docSnap.exists()) {
          setItemToEdit({ ...docSnap.data(), id: docSnap.id });
        } else {
          console.error("No such document exists!");
        }
      } catch (error) {
        console.error("Error fetching item:", error);
        showMessage("Error fetching item data.", { type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id, showMessage]);

  const handleEditItem = async (updatedItem) => {
    try {
      await editItem(id, updatedItem);
      showMessage("Item updated successfully!", { type: "success" });
      navigate("/");
    } catch (error) {
      console.error("Error updating item:", error);
      showMessage("Error updating item. Please try again.", { type: "error" });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!itemToEdit) {
    return <p>Error: Item not found.</p>;
  }

  return (
    <div>
      <h2>Edit Item</h2>
      <InventoryForm initialData={itemToEdit} onSubmit={handleEditItem} />
    </div>
  );
}

export default EditItemPage;





