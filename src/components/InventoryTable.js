import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/InventoryTable.css";

function InventoryTable({ inventory, onDeleteItem }) {
    const navigate = useNavigate();

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
                {inventory.map((item, index) => (
                    <tr key={index}>
                        <td>{item.articleNumber}</td>
                        <td>{item.itemNumber}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.stockLevel}</td>
                        <td>
                            <button onClick={() => navigate(`/edit-item/${index}`)}>Edit</button>
                            <button
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this item?")) {
                                        onDeleteItem(index);
                                    }
                                }}
                            >
                                Delete
                            </button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default InventoryTable;


