import { useState } from "react";

function Item({ item, currOpen, onCurrOpen }) {
  const { id, title, text } = item;
  const isOpen = currOpen === id;

  return (
    <div
      className={isOpen ? "item open" : "item"}
      onClick={() => onCurrOpen(id)}
    >
      <p className="number">{id}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

export default function Accordion({ data }) {
  const [currOpen, setCurrOpen] = useState(null);

  const handleToggleOpen = (id) => {
    currOpen === id ? setCurrOpen(null) : setCurrOpen(id);
  };

  return (
    <div className="accordion">
      {data?.map((item, index) => (
        <Item
          key={index}
          item={{ ...item, id: index }}
          currOpen={currOpen}
          onCurrOpen={handleToggleOpen}
        />
      ))}
    </div>
  );
}
