import {useState} from "react";

function Item({ item }) {
    const [isOpen, setIsOpen] = useState(false);

  return <div className={isOpen ? "item open": "item"} onClick={() => setIsOpen(!isOpen)}>
    <p className="number">{item.id}</p>
    <p className="title">{item.title}</p>
    <p className="icon">{isOpen ? '-': '+'}</p>
    {isOpen && <div className="content-box">{item.text}</div>}
  </div>;
}

export default function Accordion({ data }) {
  return (
    <div className="accordion">
      {data?.map((item, index) => (
        <Item key={index} item={{...item, id: index}} />
      ))}
    </div>
  );
}
