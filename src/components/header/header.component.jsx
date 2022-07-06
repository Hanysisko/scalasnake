import React from "react";
import { GAME_COLORS } from "../../data/variables.js";

import './header.styles.scss'

export default function Header({ points, showStartButton }) {
  return(
    <div className="header">
      <h1>ScalaSnake</h1>
      <p>You are a <span style={{color: GAME_COLORS.snakeHead}}>Snake</span> !</p>
      <p>Try to eat as many 
        <span style={{color: GAME_COLORS.apple}}> apples </span> 
        as possible but try to avoid  
        <span style={{color: GAME_COLORS.bombs}}> bombs </span>
        !
      </p>

      {showStartButton &&
        <h2>Good luck!</h2>
      }
      {!showStartButton &&
        <h2 style={{color:"black"}}>Score: <span style={{color:"white"}}>{points}</span> points</h2>
      }
    </div>
  )
}