import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../context/InventoryContext";
import CountItems from "../components/CountItems";

function CountPage() {
  const { inventory, categories } = useInventory();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortingOrder, setSortingOrder] = useState("articleNumber");
  const [countingStarted, setCountingStarted] = useState(false);
  const [counts, setCounts] = useState([]); // Updated to track counts as an array
  const navigate = useNavigate();

  // Filter and sort inventory
  const filteredInventory = inventory
    .filter((item) => item.category === selectedCategory)
    .sort((a, b) => {
      if (sortingOrder === "articleNumber") {
        return a.articleNumber.localeCompare(b.articleNumber);
      }
      return a.itemNumber.localeCompare(b.itemNumber);
    });

  const handleStartCounting = () => {
    if (!selectedCategory) return; // Ensure category is selected
    setCountingStarted(true); // Start the counting process
  };

  const handleSubmitCount = (articleNumber, count) => {
    console.log(`Submitting count for article: ${articleNumber}, Count: ${count}`);
  
    const item = inventory.find((item) => item.articleNumber === articleNumber);
    if (!item) {
      console.error(`Item with article number ${articleNumber} not found.`);
      return;
    }
  
    const desiredStockLevel = parseInt(item.stockLevel, 10);
    const discrepancy = desiredStockLevel - count;
  
    const newItem = {
      ...item,
      countedQuantity: count,
      discrepancy,
      needsRestocking: discrepancy > 0,
    };
  
    setCounts((prev) => {
      const updatedCounts = [...prev, newItem];
      console.log("Counts updated:", updatedCounts);
      return updatedCounts;
    });
  };
  
  
  const handleCompleteCounting = () => {
    console.log("Final Counts Before Navigation:", counts);
  
    // Ensure the latest submission is included
    const updatedCounts = [...counts];
  
    console.log("Final Counts After Explicit Update:", updatedCounts);
  
    // Navigate to the summary page
    navigate("/count-summary", {
      state: { countedItems: updatedCounts, category: selectedCategory },
    });
  };
  
  

  if (countingStarted) {
    return (
      <CountItems
        items={filteredInventory}
        onSubmitCount={handleSubmitCount}
        onComplete={handleCompleteCounting}
      />
    );
  }

  return (
    <div>
      <h2>Select Category and Sorting Order</h2>
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
      <label>
        Sorting Order:
        <select
          value={sortingOrder}
          onChange={(e) => setSortingOrder(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="articleNumber">By Article Number</option>
          <option value="itemNumber">By Item Number</option>
        </select>
      </label>
      <br />
      <button onClick={handleStartCounting} style={{ marginTop: "20px" }}>
        Start Counting
      </button>
    </div>
  );
}

export default CountPage;

