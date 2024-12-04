import React from "react";

function InventoryForm() {
  return (
    <form>
      <label>
        Article Number:
        <input type="text" name="articleNumber" required />
      </label>
      <br />
      <label>
        Item Number:
        <input type="text" name="itemNumber" required />
      </label>
      <br />
      <label>
        Description:
        <input type="text" name="description" required />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" name="quantity" required />
      </label>
      <br />
      <label>
        Stock Level:
        <input type="number" name="stockLevel" required />
      </label>
      <br />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default InventoryForm;
