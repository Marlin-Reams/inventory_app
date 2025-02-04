import React, { useState, useEffect } from "react";
import { useInventory } from "../context/InventoryContext";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import "../css/CountPage.css"; 

function CountPage() {
  const { inventory, categories, customOrder } = useInventory(); // Added customOrder from context
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState("");
  const [itemsToOrder, setItemsToOrder] = useState([]);
  const [countedItems, setCountedItems] = useState([]);
  const [countingStarted, setCountingStarted] = useState(false);
  const [finalizeCounting, setFinalizeCounting] = useState(false);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const navigate = useNavigate(); // Add navigate hook

  useEffect(() => {
    if (selectedCategory) {
      // ✅ Convert both values to lowercase for case-insensitive comparison
      const itemsInCategory = inventory.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
  
      console.log("Filtered Items for Category:", selectedCategory, itemsInCategory); // ✅ Debugging
  
      // ✅ Ensure new items are included in the order list
      if (customOrder[selectedCategory]?.length > 0) {
        const orderedItems = customOrder[selectedCategory]
          .map((id) => itemsInCategory.find((item) => item.id === id))
          .filter(Boolean); // Remove null values
  
        // ✅ Include missing items that are not in custom order
        const missingItems = itemsInCategory.filter(
          (item) => !customOrder[selectedCategory].includes(item.id)
        );
  
        setFilteredInventory([...orderedItems, ...missingItems]);
      } else {
        setFilteredInventory(itemsInCategory);
      }
    } else {
      setFilteredInventory([]); // Clear inventory if no category is selected
    }
  }, [inventory, selectedCategory, customOrder]); 
  

  const handleStartCounting = () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }
    setCountingStarted(true);
    setCurrentIndex(0);
    setItemsToOrder([]);
    setCountedItems([]); // Reset counted items
  };

  const handleSubmitCount = async (e) => {
    e.preventDefault();
    const currentItem = filteredInventory[currentIndex];

    if (count.trim() === "" || isNaN(count) || parseInt(count, 10) < 0) {
      alert("Please enter a valid count.");
      return;
    }

    const countedQuantity = parseInt(count, 10);
    const discrepancy = parseInt(currentItem.stockLevel, 10) - countedQuantity;

    try {
      const itemRef = doc(db, "inventory", currentItem.id);
      await updateDoc(itemRef, { quantity: countedQuantity });

      const updatedItem = {
        ...currentItem,
        countedQuantity,
        discrepancy,
      };

      setCountedItems((prev) =>
        prev.filter((item) => item.articleNumber !== currentItem.articleNumber).concat(updatedItem)
      );

      if (discrepancy > 0) {
        setItemsToOrder((prev) =>
          prev.filter((item) => item.articleNumber !== currentItem.articleNumber).concat(updatedItem)
        );
      }

      if (currentIndex < filteredInventory.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setCount("");
      } else {
        setFinalizeCounting(true);
      }
    } catch (error) {
      console.error("Error updating item in Firestore:", error);
      alert("Failed to update item in the database.");
    }
  };

  const handleEditItem = (index) => {
    const itemToEdit = countedItems[index];
    setCurrentIndex(index);
    setCount(itemToEdit ? itemToEdit.countedQuantity.toString() : "");
  };

  const updateFinalizedItem = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...countedItems[currentIndex],
      countedQuantity: parseInt(count, 10),
      discrepancy: parseInt(countedItems[currentIndex].stockLevel, 10) - parseInt(count, 10),
    };

    setCountedItems((prev) =>
      prev.map((item, index) => (index === currentIndex ? updatedItem : item))
    );
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setCount(countedItems[currentIndex - 1]?.countedQuantity.toString() || "");
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredInventory.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setCount(countedItems[currentIndex + 1]?.countedQuantity.toString() || "");
    }
  };

  const handleSaveCountSession = async () => {
    if (countedItems.length === 0) {
      alert("No items counted to save.");
      return;
    }

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const sessionData = {
      date: currentDate,
      category: selectedCategory,
      items: countedItems,
    };

    try {
      await addDoc(collection(db, "countHistory"), sessionData);
      alert("Count session saved successfully.");
      setFinalizeCounting(false);
      setCountingStarted(false);
    } catch (error) {
      console.error("Error saving count session:", error);
      alert("Failed to save count session.");
    }
  };

  const renderCountingForm = () => {
    const currentItem = filteredInventory[currentIndex];

    if (!currentItem) {
      return <p>No items to count in this category.</p>;
    }

    return (
      <div>
        <h3>
          Counting Item {currentIndex + 1} of {filteredInventory.length}
        </h3>
        <p>Article Number: {currentItem.articleNumber}</p>
        <p>Description: {currentItem.itemNumber}</p>
        <p>Stock Level: {currentItem.stockLevel}</p>

        <form onSubmit={handleSubmitCount}>
          <label>
            Enter Count:
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button type="submit" style={{ marginLeft: "10px" }}>
            Submit
          </button>
        </form>

        <button onClick={goToPrevious} disabled={currentIndex <= 0} style={{ marginTop: "10px" }}>
          Previous
        </button>
        <button onClick={goToNext} disabled={currentIndex >= filteredInventory.length - 1} style={{ marginLeft: "10px", marginTop: "10px" }}>
          Next
        </button>
      </div>
    );
  };

  const renderFinalizeSection = () => (
    <div>
      <h3>Finalize Counting</h3>
      <p>Please review all items and make any necessary changes before saving the session.</p>
      {countingStarted && (
        <form onSubmit={updateFinalizedItem}>
          <label>
            Edit Count for Current Item:
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              required
              style={{ marginLeft: "10px" }}
            />
          </label>
          <button type="submit" style={{ marginLeft: "10px" }}>
            Update
          </button>
        </form>
      )}
      <button onClick={handleSaveCountSession} style={{ marginTop: "10px" }}>
        Finalize and Save
      </button>
    </div>
  );

  const renderResultsTable = () => {
    if (countedItems.length === 0) {
      return <p>No items have been counted yet.</p>;
    }

    return (
      <div>
        <h3>Counted Items</h3>
        <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Article Number</th>
              <th>Description</th>
              <th>Counted Quantity</th>
              <th>Stock Level</th>
              <th>Amount Needed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countedItems.map((item, index) => (
              <tr key={item.articleNumber}>
                <td>{item.articleNumber}</td>
                <td>{item.description}</td>
                <td>{item.countedQuantity}</td>
                <td>{item.stockLevel}</td>
                <td>{item.discrepancy > 0 ? item.discrepancy : "In Stock"}</td>
                <td>
                  <button onClick={() => handleEditItem(index)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="count-container">
      {!countingStarted && !finalizeCounting ? (
        <div className="count-form">
          <h2>Select Category to Start Counting</h2>
          <label>
            
            <select
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <br />
          <div className="button-group">
  <button onClick={handleStartCounting} className="start-button">
    Start Counting
  </button>

  <button
    onClick={() => navigate(`/change-order`)}
    className="manage-order-button"
  >
    Manage Order
  </button>
</div>

        </div>
      ) : finalizeCounting ? (
        renderFinalizeSection()
      ) : (
        renderCountingForm()
      )}
      <hr />
      {renderResultsTable()}
    </div>
  );
}

export default CountPage;



