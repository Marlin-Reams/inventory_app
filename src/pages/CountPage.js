import React, { useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function CountPage() {
  const { inventory, categories } = useInventory();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState("");
  const [itemsToOrder, setItemsToOrder] = useState([]);
  const [countedItems, setCountedItems] = useState([]);
  const [countingStarted, setCountingStarted] = useState(false);

  const filteredInventory = inventory.filter(
    (item) => item.category === selectedCategory
  );

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
        alert("Counting complete.");
        setCountingStarted(false);
      }
    } catch (error) {
      console.error("Error updating item in Firestore:", error);
      alert("Failed to update item in the database.");
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
    } catch (error) {
      console.error("Error saving count session:", error);
      alert("Failed to save count session.");
    }
  };

  const handleGeneratePDF = () => {
    if (itemsToOrder.length === 0) {
      alert("No items need to be ordered.");
      return;
    }

    const doc = new jsPDF();
    doc.text(`Items to Order - ${selectedCategory}`, 10, 10);
    doc.autoTable({
      startY: 20,
      head: [["Article Number", "Description", "Stock Level", "Counted Quantity", "Amount Needed"]],
      body: itemsToOrder.map((item) => [
        item.articleNumber,
        item.description,
        item.stockLevel,
        item.countedQuantity,
        item.discrepancy,
      ]),
    });

    doc.save(`Items_to_Order_${selectedCategory}.pdf`);
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
        <p>Description: {currentItem.description}</p>
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
      </div>
    );
  };

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
            </tr>
          </thead>
          <tbody>
            {countedItems.map((item) => (
              <tr key={item.articleNumber}>
                <td>{item.articleNumber}</td>
                <td>{item.description}</td>
                <td>{item.countedQuantity}</td>
                <td>{item.stockLevel}</td>
                <td>{item.discrepancy > 0 ? item.discrepancy : "In Stock"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSaveCountSession} style={{ marginTop: "10px" }}>
          Save Count Session
        </button>
        <button onClick={handleGeneratePDF} style={{ marginTop: "10px", marginLeft: "10px" }}>
          Generate PDF
        </button>
      </div>
    );
  };

  return (
    <div>
      {!countingStarted ? (
        <div>
          <h2>Select Category to Start Counting</h2>
          <label>
            Category:
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
          <button onClick={handleStartCounting} style={{ marginTop: "20px" }}>
            Start Counting
          </button>
        </div>
      ) : (
        renderCountingForm()
      )}
      <hr />
      {renderResultsTable()}
    </div>
  );
}

export default CountPage;












