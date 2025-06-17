import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";

const initialComponents = [
  { id: "1", type: "Heading", content: "Sample Heading" },
  { id: "2", type: "Paragraph", content: "Sample paragraph text." },
  { id: "3", type: "Button", content: "Click Me" },
];

function LayoutBuilder() {
  const [canvasItems, setCanvasItems] = useState([]);

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Drag from Sidebar to Canvas
    if (source.droppableId === "Sidebar" && destination.droppableId === "Canvas") {
      const component = initialComponents.find((c) => c.id === draggableId);
      setCanvasItems([
        ...canvasItems,
        { ...component, id: Date.now().toString() }
      ]);
    }

    // Reordering inside the Canvas
    if (
      source.droppableId === "Canvas" &&
      destination.droppableId === "Canvas"
    ) {
      const newItems = Array.from(canvasItems);
      const [moved] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, moved);
      setCanvasItems(newItems);
    }
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Sidebar components={initialComponents} />
        <Canvas components={canvasItems} />
      </DragDropContext>
    </div>
  );
}

export default LayoutBuilder;