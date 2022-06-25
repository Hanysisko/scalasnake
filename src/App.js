import React, {  useRef, useState, useEffect } from "react";
import { useInterval } from "./hooks/useInterval.js";
import {
  CANVAS_SIZE,
  SNAKE_START,
  FIRST_APPLE,
  SPEED,
  BOMB_SPAWN_TIME,
  LEVEL_MULTIPLIER,
  APPLE_SPEED,
  DIRECTIONS
} from "./data/variables.js";

import './App.css';


const App = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(FIRST_APPLE);
  const [bomb, setBomb] = useState([]);
  const [bombSpawnTime, setBombSpawnTime] = useState(null);
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

  const checkCollision = (piece, snek = snake) => {
    //collision for walls
    if (
      piece[0] >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] >= CANVAS_SIZE[1] ||
      piece[1] < 0
    ) 
    return true;

    //collision for mines
    for (const segment of bomb) {
      if (
        piece[0] === segment[0] && piece[1] === segment[1]
      ) return true;
    }

    //collison for snek tummy
    for (const segment of snek) {
      if (
        piece[0] === segment[0] && piece[1] === segment[1]
      ) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      if (snake.length % LEVEL_MULTIPLIER === 0) {
        setSpeed(Math.floor(speed - 0.2*speed))
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake)); //deep copy of snake
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    setSpeed(SPEED);
    setAppleSpeed(APPLE_SPEED);
    setBombSpawnTime(BOMB_SPAWN_TIME);

    setSnake(SNAKE_START);
    setApple(FIRST_APPLE);
    setDir([1, 0]);
    setGameOver(false);
  };

  useEffect(() => { // gameboard for the game
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "sienna";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "saddlebrown";
    context.fillRect(snake[0][0], snake[0][1], 1, 1);
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);
    context.fillStyle = "black";
    bomb.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

  }, [snake, apple, gameOver]);

  useInterval(() => gameLoop(), speed);
  useInterval(() => setApple(createApple()), appleSpeed);
  
  //adding new bombs to the game
  useInterval(() => setBomb(
    arr => [...arr, 
      [
        Math.floor(Math.random()* (CANVAS_SIZE[0])),
        Math.floor(Math.random()* (CANVAS_SIZE[1]))
      ]
    ]),
    bombSpawnTime);

  return (
    <div className='app' onKeyDown={e => moveSnake(e)}>
      <div className='container'>
        <h1>ScalaSnake</h1>
        <h2>Score: {(snake.length * 10) - 10} points</h2>
        
        <canvas
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        
        {gameOver && <div>GAME OVER!</div>}
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default App;
