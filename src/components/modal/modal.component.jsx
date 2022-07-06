import React from "react";

import CustomButton from "../custom-button/custom-button.component";
import './modal.styles.scss';


export default function Modal({ points, resetGame }) {

  return(
    <div className="modal">
      <div>
        <h1>Game Over!</h1>
        <p className="lastScore">Your score: {points} points!</p>
        <p className="lastScore">Wanna try again?</p>

          <CustomButton
            modal
            onClick={resetGame}
          >
            Restart
          </CustomButton>

      </div>
    </div>
  )
}