import { useState, useEffect } from "react";

export function useInventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("inventory")) || [];
    setInventory(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

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

  return { inventory, addItem, editItem, deleteItem };
}
