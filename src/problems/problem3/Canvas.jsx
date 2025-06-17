import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import ComponentCard from "./ComponentCard";

function Canvas({ components }) {
  return (
    <Droppable droppableId="Canvas">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            flex: 1,
            minHeight: "400px",
            padding: "20px",
            border:
              snapshot.isDraggingOver
                ? "3px solid #1976d2"
                : "2px dashed var(--accent-main)",
            borderRadius: "12px",
            color: "var(--text-main)",
            transition: "background 0.2s, border 0.2s",
            boxShadow:
              snapshot.isDraggingOver ? "0 0 16px 2px #90caf9" : undefined,
          }}
        >
          <h3 style={{ color: "var(--accent-main)" }}>🧩 Page Canvas</h3>
          {components.map((comp, index) => (
            <Draggable key={comp.id} draggableId={comp.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    marginBottom: "10px",
                    padding: "10px",
                    backgroundColor: "var(--bg-main)",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    color: "var(--text-main)",
                  }}
                >
                  <ComponentCard type={comp.type} content={comp.content} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Canvas;