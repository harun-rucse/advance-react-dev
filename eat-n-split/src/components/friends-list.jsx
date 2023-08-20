import React from "react";
import Friend from "./friend";

export default function FriendsList({ friends, selectedFriend, onSelectFriend }) {
  return (
    <ul>
      {friends?.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
