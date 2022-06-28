const GAME_COLORS = {
  snakeBody: "sienna",
  snakeHead: "saddlebrown",
  apple: "red",
  mines: "black"
}
const CANVAS_SIZE = [20, 20]; // background is 20x20 image, it will not scale with changing CANVAS_SIZE!
const SNAKE_START = [
  [7, 9]
]; // snake start position
const FIRST_APPLE = [12, 9]; // apple start position
const SPEED = 300; // snake speed; lower = faster
const BOMB_SPAWN_TIME = 10000; //how often new bomb should show up
const LEVEL_MULTIPLIER = 5; //snake will go faster after X eaten apples
const APPLE_SPEED = 10000; // changing position of apple
const DIRECTIONS = {
  "ArrowUp": [0, -1],
  "ArrowDown": [0, 1],
  "ArrowLeft": [-1, 0],
  "ArrowRight": [1, 0]
};

export {
  GAME_COLORS,
  CANVAS_SIZE,
  SNAKE_START,
  FIRST_APPLE,
  SPEED,
  BOMB_SPAWN_TIME,
  LEVEL_MULTIPLIER,
  APPLE_SPEED,
  DIRECTIONS
};
