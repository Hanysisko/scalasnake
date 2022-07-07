import React, { useRef, useState, useEffect } from "react";
import { useInterval } from './hooks/useInterval'
import {
  CANVAS_SIZE,
  SNAKE_START,
  FIRST_APPLE,
  SPEED,
  BOMB_SPAWN_TIME,
  LEVEL_MULTIPLIER,
  APPLE_SPEED,
  DIRECTIONS
} from "./data/variables";

import Modal from "./components/modal/modal.component";
import CustomButton from "./components/custom-button/custom-button.component";
import Header from "./components/header/header.component";
import Gameboard from "./components/gameboard/gameboard.component";

import './App.css';

const App = () => {
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);

  const [snake, setSnake] = useState<number[][]>(SNAKE_START);
  const [apple, setApple] = useState<number[]>(FIRST_APPLE);
  const [bomb, setBomb] = useState<number[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showStartButton, setShowStartButton] = useState<boolean>(true);

  const scoreCounter = useRef<number>(0);
  const [dir, setDir] = useState<number[]>([1, 0]);
  const lastDir = useRef<number[]>([1, 0]);
  const [speed, setSpeed] = useState<number>(0);
  const [bombSpawnTime, setBombSpawnTime] = useState<null | number>(null); 
  const [appleSpeed, setAppleSpeed] = useState<null | number>(null);


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
    setSpeed(0);
    setAppleSpeed(null);
    setBombSpawnTime(null);
    setGameOver(true);
  };

  const resetGame = () => {
    setSnake(SNAKE_START);
    setApple(FIRST_APPLE);
    setDir([1, 0]);
    setBomb([]);
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
      default: break
    }
  }

  //generating new entity (apple or bomb) in empty place on canvas
  const generateOnEmptyField = () => {
    let entityGenerator = () => {
      let randomEntity:number[] = 
      [
        Math.floor(Math.random() * (CANVAS_SIZE[0])),
        Math.floor(Math.random() * (CANVAS_SIZE[1]))
      ]
      return randomEntity;
    };
    
    let newEntity = entityGenerator();
    while (checkDeadlyEntitiesCollision(newEntity)) {
      newEntity = entityGenerator();
    }
    return newEntity;
  }

  //collision for walls
  const checkWallCollision = (piece: number[]) => {
    if (
      piece[0] >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] >= CANVAS_SIZE[1] ||
      piece[1] < 0
    ) return true;
    return false;
  }

  //checking collision for all hostile objects (snake and bombs)
  const checkDeadlyEntitiesCollision = (piece: number[]) => {
    let deadlyEntities:number[][] = snake.concat(bomb)
    for (const segment of deadlyEntities) {
      if (
        piece[0] === segment[0] && piece[1] === segment[1]
      ) return true;
    }
    return false;
  };

  //checking collision for snakeHead and apple, and generating new apple in empty field
  const checkAppleCollision = (newSnake: number[][]) => {
     if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = generateOnEmptyField();
      
      //adding speed when snake surpasses LEVEL_MULTIPLIER
      if (snake.length % LEVEL_MULTIPLIER === 0){
        setSpeed(1.25*speed);
      }
      //updating score
      scoreCounter.current = scoreCounter.current + 10;
      setApple(newApple);      
      return true;
    }
    return false;
  };

  //one 'tick' in the game
  const gameLoop = (time: number) => {
    if (speed === null) return
    requestRef.current = requestAnimationFrame(gameLoop);
    const secondsSinceLastRender = (time - previousTimeRef.current) / 1000;
    if (secondsSinceLastRender < 1 / speed) return
    
    lastDir.current = dir;
    const snakeCopy = JSON.parse(JSON.stringify(snake)); //deep copy of snake
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkDeadlyEntitiesCollision(newSnakeHead) || checkWallCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    
    setSnake(snakeCopy);
    previousTimeRef.current = time;
  };

  //event listener
  useEffect(() => {
    window.addEventListener('keydown', moveSnake);
    return () => window.removeEventListener('keydown', moveSnake);
  }, []);

  //requestAnimationFrame
  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop]);

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

        {gameOver && 
          <Modal 
            points={scoreCounter.current}
            resetGame={resetGame}
          />
        }
        
        <Header
          showStartButton={showStartButton}
          points={scoreCounter.current}
        />
        
        <Gameboard
          snake={snake}
          apple={apple}
          bomb={bomb}
        />

        {showStartButton &&
          <CustomButton 
            mainPage={true}
            onClick={startGame} 
            modal={false}          
          >
            Start game
          </CustomButton>
        }

      </div>
    </div>
  );
};

export default App;
