// utils/localStorage.js

const INVENTORY_KEY = "inventory";

export const loadInventory = () => {
  const savedInventory = localStorage.getItem(INVENTORY_KEY);
  console.log("Loading inventory from localStorage:", savedInventory);
  return savedInventory ? JSON.parse(savedInventory) : [];
};

export const saveInventory = (inventory) => {
  console.log("Saving inventory to localStorage:", inventory);
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
};
