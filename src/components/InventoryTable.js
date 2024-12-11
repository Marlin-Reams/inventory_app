import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/InventoryTable.css";

function InventoryTable({ inventory, onDeleteItem, onEditItem }) {
    return (
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Article Number</th>
            <th>Item Number</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Stock Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.articleNumber}</td>
              <td>{item.itemNumber}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.stockLevel}</td>
              <td>
                <button onClick={() => onEditItem(item.id)}>Edit</button>
                <button onClick={() => onDeleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default InventoryTable;
  

