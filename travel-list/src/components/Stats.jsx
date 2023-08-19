import React from "react";

export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const totalItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((numPacked / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "You got everithing! Ready to go ✈️"
          : `👜 You have ${totalItems} items in your list, and you already packed
        ${numPacked} (${packedPercentage}%)`}
      </em>
    </footer>
  );
}
