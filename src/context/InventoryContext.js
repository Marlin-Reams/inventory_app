import React, { createContext, useContext, useState, useEffect } from "react";
import { loadInventory, saveInventory } from "../utils/localStorage";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);

  // Load inventory and categories from localStorage
  useEffect(() => {
    const initialInventory = loadInventory();
    console.log("Initial inventory loaded:", initialInventory);

    // Only set inventory if it's empty (to avoid overwrites)
    if (initialInventory.length > 0) {
      setInventory(initialInventory);
      const initialCategories = Array.from(new Set(initialInventory.map((item) => item.category))).sort();
      setCategories(initialCategories);
    }
  }, []); // Run only once on mount

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    if (inventory.length > 0) {
      console.log("Saving inventory to localStorage:", inventory);
      saveInventory(inventory);
    }
  }, [inventory]); // Save whenever `inventory` changes

  // Add an item to the inventory
  const addItem = (item) => {
    console.log("Adding item:", item);
    setInventory((prev) => [...prev, item]);
    if (!categories.includes(item.category)) {
      setCategories((prev) => [...prev, item.category]);
    }
  };

  // Edit an item in the inventory
  const editItem = (index, updatedItem) => {
    console.log(`Editing item at index ${index}:`, updatedItem);
    setInventory((prev) =>
      prev.map((item, i) => (i === index ? updatedItem : item))
    );
  };

  // Delete an item from the inventory
 // Delete an item from the inventory
const deleteItem = (index) => {
    setInventory((prev) => {
      const updatedInventory = prev.filter((_, i) => i !== index);
      console.log("Updated inventory after deletion:", updatedInventory);
  
      // Update categories based on the new inventory
      const updatedCategories = Array.from(new Set(updatedInventory.map((item) => item.category)));
      setCategories(updatedCategories);
  
      // Persist the updated inventory to localStorage immediately
      saveInventory(updatedInventory);
  
      return updatedInventory;
    });
  };
  

  // Add a new category directly
  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  return (
    <InventoryContext.Provider
      value={{ inventory, addItem, editItem, deleteItem, categories, addCategory }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}




