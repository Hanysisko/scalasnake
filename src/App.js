import React, { useRef, useState, useEffect } from "react";
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

import Modal from "./components/modal/modal.component.jsx";
import CustomButton from "./components/custom-button/custom-button.component.jsx";

import './App.css';
import Header from "./components/header/header.component.jsx";
import Gameboard from "./components/gameboard/gameboard.component.jsx";


const App = () => {
  const scoreCounter = useRef(0);

  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(FIRST_APPLE);
  const [bomb, setBomb] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);

  const [bombSpawnTime, setBombSpawnTime] = useState(null); 
  const [dir, setDir] = useState([1, 0]);
  const lastDir = useRef([0,0]);
  const [speed, setSpeed] = useState(null);
  const [appleSpeed, setAppleSpeed] = useState(null);


  const startGame = () => {
    setSpeed(SPEED);
    setAppleSpeed(APPLE_SPEED);
    setBombSpawnTime(BOMB_SPAWN_TIME);
    setSnake(SNAKE_START);
    setApple(FIRST_APPLE);
    setDir([1, 0]);
    setBomb([]);
    scoreCounter.current = 0;
    setGameOver(false);
    setShowStartButton(false);
  };

  const endGame = () => {
    setSpeed(null);
    setAppleSpeed(null);
    setBombSpawnTime(null);
    setGameOver(true);
  };

  const resetGame = () => {
    setSnake(SNAKE_START);
    setApple(FIRST_APPLE);
    setDir([1, 0]);
    setBomb([]);
    scoreCounter.current = 0;
    setGameOver(false);
    setShowStartButton(true);
  };

  //changing snake direction
  const moveSnake = ({ key }) => {
    switch (key) {
      case 'ArrowUp':
        if (lastDir.current[1] !== 0) break
        setDir(DIRECTIONS[key])
        break
      case 'ArrowDown':
        if (lastDir.current[1] !== 0) break
        setDir(DIRECTIONS[key])
        break
      case 'ArrowLeft':
        if (lastDir.current[0] !== 0) break
        setDir(DIRECTIONS[key])
        break
      case 'ArrowRight':
        if (lastDir.current[0] !== 0) break
        setDir(DIRECTIONS[key])
        break
    }
  }

  //generating new entity (apple or bomb) in empty place on canvas
  const generateOnEmptyField = () => {
    
    let entityGenerator = () => {
      let randomEntity = 
      [
        Math.floor(Math.random() * (CANVAS_SIZE[0])),
        Math.floor(Math.random() * (CANVAS_SIZE[1]))
      ]
      return randomEntity;
    };
    let newEntity = entityGenerator();

    // do not spawn entity on snake or bombs
    while (checkCollision(newEntity)) {
      newEntity = entityGenerator();
    }
    return newEntity;
  }

  //collision for walls
  const checkWallCollision = (piece) => {
    if (
      piece[0] >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] >= CANVAS_SIZE[1] ||
      piece[1] < 0
    ) return true;
    return false;
  }

  //checking collision for all hostile objects (snake and bombs)
  const checkCollision = (piece) => {
    let deadlyEntities = snake.concat(bomb)
    for (const segment of deadlyEntities) {
      if (
        piece[0] === segment[0] && piece[1] === segment[1]
      ) return true;
    }
    return false;
  };

  //checking collision for snakeHead and apple, and generating new apple in empty field
  const checkAppleCollision = newSnake => {
     if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      
      let newApple = generateOnEmptyField();
      //adding speed when snake surpasses LEVEL_MULTIPLIER
      if (snake.length % LEVEL_MULTIPLIER === 0) {
        setSpeed(Math.floor(0.8*speed))
      }
      //updating score
      scoreCounter.current = scoreCounter.current + 10;
      
      setApple(newApple);      
      return true;
    }
    return false;
  };

  //one 'tick' in the game
  const gameLoop = () => {
    lastDir.current = dir;
    const snakeCopy = JSON.parse(JSON.stringify(snake)); //deep copy of snake
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead) || checkWallCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  //event listener
  useEffect(() => {
    window.addEventListener('keydown', moveSnake);
    return () => window.removeEventListener('keydown', moveSnake);
  }, [moveSnake]);

  //game interval is 'speed', which we change in proper functions, f.e. startGame, resetGame
  useInterval(() => gameLoop(), speed);

  //adding new bombs to the game every 'bombSpawnTime' ms
  useInterval(() => {    
    let newBomb = generateOnEmptyField();
    setBomb(arr => [...arr, newBomb]);
  }, bombSpawnTime);

  //changing apple place every 'appleSpeed' ms
  useInterval(() => {
    let newApple = generateOnEmptyField();
    setApple(newApple);
  }, appleSpeed);


  return (
    <div className='app'>
      <div className='container'>
        
        <Header
          showStartButton={showStartButton}
          points={scoreCounter.current}
        />
        
        <Gameboard
          snake={snake}
          apple={apple}
          bomb={bomb}
        />
        
        {gameOver && 
          <Modal 
            points={scoreCounter.current}
            resetGame={resetGame}
          />
        }

        {showStartButton &&
          <CustomButton 
            mainPage
            onClick={startGame}
          >
            Start game
          </CustomButton>
        }

      </div>
    </div>

  );
};

export default App;
