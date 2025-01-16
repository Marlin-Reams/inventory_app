// import React, { createContext, useContext, useState, useEffect } from "react";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "../firebase/firebase";

// const InventoryContext = createContext();


// export function InventoryProvider({ children }) {
//   const [inventory, setInventory] = useState([]);
//   const [categories, setCategories] = useState([]); // State for categories

//   const inventoryCollectionRef = collection(db, "inventory");

//   // Load inventory and categories from Firestore
//   useEffect(() => {
//     const fetchInventory = async () => {
//       const data = await getDocs(inventoryCollectionRef);
//       const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//       setInventory(items);

//       // Extract unique categories
//       const uniqueCategories = Array.from(new Set(items.map((item) => item.category))).sort();
//       setCategories(uniqueCategories);
//     };
//     fetchInventory();
//   }, []);

// // Add an item to Firestore
// const addItem = async (item) => {
//   try {
//     console.log("here we are")
//     console.log("Attempting to add item:", item);

//     // Check for duplicate article numbers
//     const isDuplicate = inventory.some(
//       (existingItem) =>
//         existingItem.articleNumber.trim().toLowerCase() ===
//         item.articleNumber.trim().toLowerCase()
//     );

//     if (isDuplicate) {
//       console.warn("Duplicate article number detected:", item.articleNumber);
//       console.log("this is where we are")
//       throw new Error("Article number already exists!");
      
//     }

//     // Add the item to Firestore
//     const docRef = await addDoc(inventoryCollectionRef, item);
//     console.log("Item successfully added with ID:", docRef.id);

//     // Update inventory state
//     setInventory((prev) => [...prev, { ...item, id: docRef.id }]);

//     // Add the category if it's new
//     if (!categories.includes(item.category)) {
//       console.log("Adding new category:", item.category);
//       setCategories((prev) => [...prev, item.category]);
//     }
//   } catch (error) {
//     console.error("Error adding item:", error.message || error);
//     throw error; // Re-throw the error to handle it in the UI
//   }
// };


// // Edit an item in Firestore
// const editItem = async (id, updatedItem) => {
//   try {
//     // Check for duplicate article numbers (excluding the current item being edited)
//     const isDuplicate = inventory.some(
//       (existingItem) =>
//         existingItem.articleNumber.trim().toLowerCase() ===
//           updatedItem.articleNumber.trim().toLowerCase() &&
//         existingItem.id !== id // Exclude the current item being edited
//     );

//     if (isDuplicate) {
//       throw new Error("Article number already exists!");
//     }

//     const itemDoc = doc(db, "inventory", id);
//     await updateDoc(itemDoc, updatedItem);
//     setInventory((prev) =>
//       prev.map((item) => (item.id === id ? { ...updatedItem, id } : item))
//     );
//   } catch (error) {
//     console.error("Error updating item:", error.message || error);
//     throw error; // Re-throw the error to handle it in the UI
//   }
// };


//   // Delete an item from Firestore
//   const deleteItem = async (id) => {
//     try {
//       console.log("Attempting to delete item with ID:", id);
//       const docRef = doc(db, "inventory", id);
//       await deleteDoc(docRef);
//       console.log("Item deleted successfully");

//       // Update state to remove the item
//       setInventory((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   // Add a new category
//   const addCategory = (newCategory) => {
//     if (!categories.includes(newCategory)) {
//       setCategories((prev) => [...prev, newCategory]);
//     }
//   };

//   return (
//     <InventoryContext.Provider
//       value={{
//         inventory,
//         categories,
//         addItem,
//         editItem,
//         deleteItem,
//         addCategory,
//       }}
//     >
//       {children}
//     </InventoryContext.Provider>
//   );
// }

// export function useInventory() {
//   return useContext(InventoryContext);
// }
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [customOrder, setCustomOrder] = useState([]);

  const inventoryCollectionRef = collection(db, "inventory");
  const customOrderDocRef = doc(db, "customOrders", "countOrder");

  // Load inventory, categories, and custom order from Firestore
  useEffect(() => {
    const fetchInventory = async () => {
      const data = await getDocs(inventoryCollectionRef);
      const items = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setInventory(items);

      // Extract unique categories
      const uniqueCategories = Array.from(new Set(items.map((item) => item.category))).sort();
      setCategories(uniqueCategories);

      // Load custom order
      try {
        const customOrderDoc = await getDoc(customOrderDocRef);
        if (customOrderDoc.exists()) {
          setCustomOrder(customOrderDoc.data().order || []);
        }
      } catch (error) {
        console.error("Error loading custom order:", error);
      }
    };
    fetchInventory();
  }, []);

  // Add an item to Firestore
  const addItem = async (item) => {
    try {
      const isDuplicate = inventory.some(
        (existingItem) =>
          existingItem.articleNumber.trim().toLowerCase() ===
          item.articleNumber.trim().toLowerCase()
      );

      if (isDuplicate) {
        throw new Error("Article number already exists!");
      }

      const docRef = await addDoc(inventoryCollectionRef, item);
      setInventory((prev) => [...prev, { ...item, id: docRef.id }]);

      if (!categories.includes(item.category)) {
        setCategories((prev) => [...prev, item.category]);
      }
    } catch (error) {
      console.error("Error adding item:", error.message || error);
      throw error;
    }
  };

  // Edit an item in Firestore
  const editItem = async (id, updatedItem) => {
    try {
      const isDuplicate = inventory.some(
        (existingItem) =>
          existingItem.articleNumber.trim().toLowerCase() ===
            updatedItem.articleNumber.trim().toLowerCase() &&
          existingItem.id !== id
      );

      if (isDuplicate) {
        throw new Error("Article number already exists!");
      }

      const itemDoc = doc(db, "inventory", id);
      await updateDoc(itemDoc, updatedItem);
      setInventory((prev) =>
        prev.map((item) => (item.id === id ? { ...updatedItem, id } : item))
      );
    } catch (error) {
      console.error("Error updating item:", error.message || error);
      throw error;
    }
  };

  // Delete an item from Firestore
  const deleteItem = async (id) => {
    try {
      const docRef = doc(db, "inventory", id);
      await deleteDoc(docRef);
      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Add a new category
  const addCategory = (newCategory) => {
    if (!categories.includes(newCategory)) {
      setCategories((prev) => [...prev, newCategory]);
    }
  };

  // Update custom order and save to Firestore
  const updateCustomOrder = async (newOrder) => {
    try {
      setCustomOrder(newOrder);
      await setDoc(customOrderDocRef, { order: newOrder });
      console.log("Custom order saved to Firestore.");
    } catch (error) {
      console.error("Error saving custom order:", error);
    }
  };

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        categories,
        customOrder,
        addItem,
        editItem,
        deleteItem,
        addCategory,
        updateCustomOrder,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  return useContext(InventoryContext);
}


