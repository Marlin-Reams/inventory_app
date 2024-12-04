import React from "react";

function InventoryTable({ inventory }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4" }}>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Article Number</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Item Number</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Stock Level</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.articleNumber}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.itemNumber}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.description}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.quantity}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.stockLevel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
