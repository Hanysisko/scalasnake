const CANVAS_SIZE = [20, 20]; // background is 20x20 image, it will not scale with changing CANVAS_SIZE!
const SNAKE_START = [
  [7, 9]
]; // snake start position
const FIRST_APPLE = [12, 9]; // apple start position
const SPEED = 250; // snake speed

const APPLE_SPEED = 10000; // changing position of apple
const DIRECTIONS = {
  "ArrowUp": [0, -1],
  "ArrowDown": [0, 1],
  "ArrowLeft": [-1, 0],
  "ArrowRight": [1, 0]
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  FIRST_APPLE,
  SPEED,
  APPLE_SPEED,
  DIRECTIONS
};
