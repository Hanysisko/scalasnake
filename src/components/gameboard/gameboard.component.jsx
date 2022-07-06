import React, { useEffect, useRef } from "react";
import './gameboard.styles.scss';

import { CANVAS_SIZE, GAME_COLORS } from '../../data/variables.js';

export default function Gameboard({ snake, apple, bomb }) {

  const canvasRef = useRef();

  // generating canvas (gameboard) for the game
  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = GAME_COLORS.snakeBody;
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = GAME_COLORS.snakeHead;
    context.fillRect(snake[0][0], snake[0][1], 1, 1);
    context.fillStyle = GAME_COLORS.apple;
    context.fillRect(apple[0], apple[1], 1, 1);
    context.fillStyle = GAME_COLORS.bombs;
    bomb.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
  }, [snake, apple, bomb]);

  
  return(
    <div className="gameboard">
      <canvas
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
    </div>
  )
}