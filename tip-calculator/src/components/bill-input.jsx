import React from "react";

export default function BillInput({ value, onSetBill }) {
  return (
    <div className="bill">
      <span>How much was the bill?</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}
