import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";

function JoinGame() {
  const [rival, setRival] = useState("");
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();
  const createChannel = async () => {
    // code goes here
    const response = await client.queryUsers({
      name: { $eq: rival },
    });
    if (response.users.length === 0) {
      alert("User not fount");
      return;
    }
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            type="text"
            placeholder="Username of rival..."
            onChange={(event) => {
              setRival(event.target.value);
            }}
          />
          <button onClick={createChannel}>Join/Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
