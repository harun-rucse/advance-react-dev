import React from "react";
import Button from "./button";

export default function Friend({ friend, onSelectFriend, selectedFriend }) {
  const { name, image, balance } = friend;
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li
      className={isSelected ? "selected" : ""}
      onClick={() => onSelectFriend(friend)}
    >
      <img src={image} alt={name} />
      <h3>{name}</h3>

      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}$
        </p>
      )}

      {balance > 0 && (
        <p className="green">
          {name} owes you {Math.abs(balance)}$
        </p>
      )}

      {balance === 0 && (
        <p>
          You owe {name} {Math.abs(balance)}$
        </p>
      )}

      <Button>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}
