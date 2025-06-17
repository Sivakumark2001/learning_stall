import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

function Sidebar({ components }) {
  return (
    <Droppable droppableId="Sidebar" isDropDisabled={true}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            width: "250px",
            marginRight: "20px",
            background: "var(--bg-card)",
            padding: "10px",
            borderRadius: "10px",
            color: "var(--text-main)",
            boxShadow: "0 2px 8px rgba(60,72,88,0.07)",
          }}
        >
          <h3 style={{ color: "var(--accent-main)" }}>📦 Components</h3>
          {components.map((comp, index) => (
            <Draggable key={comp.id} draggableId={comp.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style,
                    border: "1px solid #ccc",
                    padding: "8px",
                    marginBottom: "10px",
                    backgroundColor: "var(--bg-main)",
                    borderRadius: "6px",
                    cursor: "grab",
                    color: "var(--text-main)",
                    boxShadow: "0 2px 8px rgba(60,72,88,0.07)",
                  }}
                >
                  {comp.type}
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

export default Sidebar;