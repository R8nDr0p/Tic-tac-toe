// Board.js
import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { Patterns } from "./WinningPatterns";

function Board({ result, setResult }) {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => {
    checkWinner();
    checkTie();
  }, [board]);

  const chooseBlock = async (square) => {
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");
      await channel.sendEvent({
        type: "move",
        data: { square, player },
      });
      setBoard(
        board.map((val, index) => {
          if (index === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  const checkWinner = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        alert("Winner", board[currPattern[0]]);
        setResult({ winner: board[currPattern[0]], state: "won" });
      }
    });
  };

  const checkTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      alert("Tie Game");
      setResult({ winner: "none", state: "tie" });
    }
  };

  channel.on((event) => {
    if (event.type == "move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard(
        board.map((val, idx) => {
          if (idx === event.data.square && val === "") {
            return event.data.player;
          }
          return val;
        })
      );
    }
  });

  return (
    <div className="board">
      <div className="row">
        <Square chooseBlock={() => chooseBlock(0)} val={board[0]} />
        <Square chooseBlock={() => chooseBlock(1)} val={board[1]} />
        <Square chooseBlock={() => chooseBlock(2)} val={board[2]} />
      </div>
      <div className="row">
        <Square chooseBlock={() => chooseBlock(3)} val={board[3]} />
        <Square chooseBlock={() => chooseBlock(4)} val={board[4]} />
        <Square chooseBlock={() => chooseBlock(5)} val={board[5]} />
      </div>
      <div className="row">
        <Square chooseBlock={() => chooseBlock(6)} val={board[6]} />
        <Square chooseBlock={() => chooseBlock(7)} val={board[7]} />
        <Square chooseBlock={() => chooseBlock(8)} val={board[8]} />
      </div>
    </div>
  );
}

export default Board;
