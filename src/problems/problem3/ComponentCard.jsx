import React, { useState } from "react";

function ComponentCard({ type, content, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(content);

  const handleDoubleClick = () => setEditing(true);

  const handleBlur = () => {
    setEditing(false);
    if (value !== content && onEdit) onEdit(value);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={e => {
          if (e.key === "Enter") handleBlur();
        }}
        style={{
          fontSize: type === "Heading" ? "1.3em" : "1em",
          fontWeight: type === "Heading" ? 700 : 400,
          width: "100%",
          padding: "4px",
        }}
      />
    );
  }

  switch (type) {
    case "Heading":
      return <h2 onDoubleClick={handleDoubleClick}>{content}</h2>;
    case "Paragraph":
      return <p onDoubleClick={handleDoubleClick}>{content}</p>;
    case "Button":
      return (
        <button onDoubleClick={handleDoubleClick} style={{ cursor: "pointer" }}>
          {content}
        </button>
      );
    default:
      return null;
  }
}

export default ComponentCard;