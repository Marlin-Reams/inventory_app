import { useState, useEffect } from "react";

export function useInventory() {
  const [inventory, setInventory] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); // Track if initial load is done

  // Load inventory from localStorage on initialization
  useEffect(() => {
    console.log("Loading inventory from localStorage...");
    const savedItems = JSON.parse(localStorage.getItem("inventory")) || [];
    console.log("Loaded items:", savedItems);
    setInventory(savedItems);
    setIsInitialized(true); // Mark initialization as complete
  }, []);

  // Save inventory to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (isInitialized) {
      console.log("Saving inventory to localStorage:", inventory);
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
  }, [inventory, isInitialized]);

  const addItem = (item) => {
    console.log("Adding item:", item);
    setInventory((prev) => [...prev, item]);
  };

  const editItem = (index, updatedItem) => {
    setInventory((prev) =>
      prev.map((item, i) => (i === index ? updatedItem : item))
    );
  };

  const deleteItem = (index) => {
    setInventory((prev) => prev.filter((_, i) => i !== index));
  };

  return { inventory, addItem, editItem, deleteItem };
}

