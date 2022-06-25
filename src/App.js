import React, {  useRef, useState, useEffect } from "react";
import { useInterval } from "./hooks/useInterval.js";
import {
  CANVAS_SIZE,
  SNAKE_START,
  FIRST_APPLE,
  SPEED,
  APPLE_SPEED,
  DIRECTIONS
} from "./data/variables.js";

import './App.css';


const App = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(FIRST_APPLE);
  const [dir, setDir] = useState([1, 0]);
  const [speed, setSpeed] = useState(null);
  const [appleSpeed, setAppleSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const endGame = () => {
    setSpeed(null);
    setAppleSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ key }) => {
    if(
      key === "ArrowDown" || 
      key === "ArrowLeft" || 
      key === "ArrowRight" || 
      key === "ArrowUp"
      ){
        setDir(DIRECTIONS[key]);
      }
  }

  const createApple = () => apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i])));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      if (snake.length % 3 === 0) {
        setSpeed(speed - 0.2*speed)
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSpeed(SPEED);
    setAppleSpeed(APPLE_SPEED);

    setSnake(SNAKE_START);
    setApple(FIRST_APPLE);
    setDir([1, 0]);
    setGameOver(false);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "brown";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "black";
    context.fillRect(snake[0][0], snake[0][1], 1, 1);
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useInterval(() => gameLoop(), speed);
  useInterval(() => setApple(createApple()), appleSpeed);
  // useInterval(() => , 10000);

  return (
    <div className='app' onKeyDown={e => moveSnake(e)}>
      <div className='container'>
        <canvas
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />

        <div className='score'>Score: {(snake.length * 10) - 10} points</div>
        <div className='score'>Speed: {Math.floor(1000/speed)} bl/s</div>

        {gameOver && <div>GAME OVER!</div>}
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default App;
