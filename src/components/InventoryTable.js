import { useNavigate } from "react-router-dom";
import "../css/InventoryTable.css"; // Adjust path as needed

function InventoryTable({ inventory, onDeleteItem }) {
  const navigate = useNavigate();

  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ backgroundColor: "#f4f4f4" }}>
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
              <button onClick={() => onDeleteItem(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;