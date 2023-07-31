import React, { useState } from "react";
import Board from "./Board";

function Game({ channel }) {
  const [playerReady, setPlayerReady] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "", state: "" });

  channel.on("user.watching.start", (event) => {
    setPlayerReady(event.watcher_count === 2);
  });
  if (!playerReady) {
    return <div>Waiting for your Rival</div>;
  }

  return (
    <div className="game-container">
      <Board result={result} setResult={setResult} />
      {/* Chatbox */}
      {/* Leave Game Button */}
    </div>
  );
}

export default Game;
