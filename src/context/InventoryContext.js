import React, { createContext, useContext, useState, useEffect } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false); // Lock for initialization

  // Load inventory from localStorage when the app starts
  useEffect(() => {
    const savedInventory = localStorage.getItem("inventory");
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory)); // Parse and set saved data
    }
    setIsInitialized(true); // Unlock after initialization
  }, []);

  // Save inventory to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("inventory", JSON.stringify(inventory));
    }
  }, [inventory, isInitialized]);

  // Functions to manage inventory
  const addItem = (item) => {
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

  return (
    <InventoryContext.Provider
      value={{ inventory, addItem, editItem, deleteItem }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}





