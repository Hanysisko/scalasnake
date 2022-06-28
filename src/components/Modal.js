import React from "react";

export default function Modal({ points, resetGame }) {

  return(
    <div className="modal">
      <div>
        <h1>Game Over!</h1>
        <p className="lastScore">Your score: {points} points!</p>
        <p className="lastScore">Wanna try again?</p>
        <button onClick={resetGame}>Restart</button>

      </div>
    </div>
  )
}