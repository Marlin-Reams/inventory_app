import React, { useEffect, useState } from "react";
import { useInventory } from "../context/InventoryContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ChangeOrderPage() {
  const { inventory, categories, customOrder, updateCustomOrder } = useInventory();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const itemsInCategory = inventory.filter(
        (item) => item.category === selectedCategory
      );

      if (customOrder[selectedCategory]?.length > 0) {
        // Sort items based on the custom order
        const orderedItems = customOrder[selectedCategory].map((id) =>
          itemsInCategory.find((item) => item.id === id)
        );
        setOrderList(orderedItems.filter(Boolean)); // Filter out null/undefined items
      } else {
        // Default order
        setOrderList(itemsInCategory);
      }
    }
  }, [inventory, selectedCategory, customOrder]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = Array.from(orderList);
    const [movedItem] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, movedItem);

    setOrderList(reorderedList);
  };

  const handleSaveOrder = () => {
    if (!selectedCategory) {
      alert("Please select a category first.");
      return;
    }

    const newOrder = orderList.map((item) => item.id);
    updateCustomOrder({ ...customOrder, [selectedCategory]: newOrder });
    alert(`Custom order for ${selectedCategory} saved!`);
  };

  return (
    <div>
      <h2>Change Count Order</h2>

      {/* Category Selector */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{ padding: "8px", marginBottom: "20px" }}
      >
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="categoryOrder">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {orderList.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "10px",
                            marginBottom: "5px",
                            backgroundColor: "#f0f0f0",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {item.description} - {item.category}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <button onClick={handleSaveOrder} style={{ marginTop: "20px" }}>
            Save Order
          </button>
        </>
      )}
    </div>
  );
}

export default ChangeOrderPage;



