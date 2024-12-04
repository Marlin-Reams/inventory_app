import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext"; // Import NotificationContext
import "../css/InventoryTable.css";

function InventoryTable({ inventory, onDeleteItem }) {
  const navigate = useNavigate();
  const { showMessage } = useNotification(); // Access showMessage from context

  const handleDelete = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      onDeleteItem(index);
      showMessage("Item deleted successfully!"); // Show success message
    }
  };

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
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
