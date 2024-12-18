import React, { useState } from "react";

function CountItems({ items, onSubmitCount }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [count, setCount] = useState("");

  const currentItem = items[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (count.trim() === "" || isNaN(count) || parseInt(count, 10) < 0) {
      alert("Please enter a valid count.");
      return;
    }

    // Convert count to a number and submit it
    const countValue = parseInt(count, 10);
    onSubmitCount(currentItem.articleNumber, countValue);

    // Move to the next item or reset for the next
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCount(""); // Reset count for the next item
    } else {
      // No more items left to count
      alert("Counting complete! Check the summary below.");
    }
  };

  if (!currentItem) {
    return <p>No items to count.</p>;
  }

  return (
    <div>
      <h3>
        Counting Item {currentIndex + 1} of {items.length}
      </h3>
      <p>Article Number: {currentItem.articleNumber}</p>
      <p>Item Number: {currentItem.itemNumber}</p>
      <p>Description: {currentItem.description}</p>
      <p>Desired Stock Level: {currentItem.stockLevel}</p>

      <form onSubmit={handleSubmit}>
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
}

export default CountItems;




