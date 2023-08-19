import React from "react";

export default function Button({ children, onReset }) {
  return (
    <button className="btn" onClick={onReset}>
      {children}
    </button>
  );
}
