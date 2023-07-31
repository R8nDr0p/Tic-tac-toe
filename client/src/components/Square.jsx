// Square.js
import React from "react";

function Square({ chooseBlock, val }) {
  return (
    <div className="square" onClick={chooseBlock}>
      {val}
    </div>
  );
}

export default Square;
