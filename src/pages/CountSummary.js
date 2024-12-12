import React from "react";
import { useLocation } from "react-router-dom";

function CountSummary() {
  const location = useLocation();
  const { countedItems = [], category = "Unknown" } = location.state || {};

  console.log("CountSummary received state:", location.state);

  // Filter items that are below the stock level
  const itemsBelowStock = countedItems.filter(
    (item) => item.countedQuantity < parseInt(item.stockLevel, 10)
  );

  console.log("Filtered items for summary:", itemsBelowStock);

  return (
    <div>
      <h2>Summary of Counts</h2>
      <p>Category: {category}</p>

      {itemsBelowStock.length > 0 ? (
        <>
          <p>Items below required stock level:</p>
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
              {itemsBelowStock.map((item) => (
                <tr key={item.articleNumber}>
                  <td>{item.articleNumber}</td>
                  <td>{item.description}</td>
                  <td>{item.countedQuantity}</td>
                  <td>{item.stockLevel}</td>
                  <td>{parseInt(item.stockLevel, 10) - item.countedQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>All items are at or above the required stock level.</p>
      )}
    </div>
  );
}

export default CountSummary;



