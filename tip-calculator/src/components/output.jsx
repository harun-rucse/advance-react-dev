import React from "react";

export default function Output({ bill, tip }) {
  return (
    <div className="output">
      <p>
        You pay <b>${bill + tip}</b> (${bill} + ${tip})
      </p>
    </div>
  );
}
