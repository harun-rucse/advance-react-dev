import React from "react";
import Logo from "../components/Logo";
import Form from "../components/Form";
import PackingList from "../components/PackingList";
import Stats from "../components/Stats";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList items={initialItems} />
      <Stats />
    </div>
  );
}
