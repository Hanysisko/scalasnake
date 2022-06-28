ScalaSnake in React with Hooks and canvas
live deployment: https://hanysisko.github.io/scalasnake/

Hello! I present to you rudimentary Snake Game!
Snake spawns at 1 length and goes with certain speed, which is changing x1.25 every 5 eaten apples. But watch out! Apple changes its position every 10 seconds and bombs will start appear after 30 seconds! 
(all these parameters can be changed easily in data/variables.js)

Have fun!

functionalities added:
- ✓ adding mines 
- ✓ local score 
- ✓ modal when finishing game with reset button

problems solved
- ✓ better styling (f.e. color themes in variables; for canvas) (update: I just put everything in color palette of my gameboard, pls, don't laugh at me :c )
- ✓(partially) problem with snake going in opposite direction; 
  f.e. when going up, it should ignore ArrowDown, not to collapse on itself (SOLUTION: new moveSnake() )
- ✓ comments next to functions
- ✓ there's small chance that bomb can generate on apple, meybe even in snake etc. - I need to check on that later (SOLUTION: generateOnEmptyField() )

PROBLEMS TO SOLVE
- NEW snake can still collapse on itself if you click two directions fast enough. Probable solution: increase game fps but it will be time consuming (I need to rebuild rules that are implemented into game mechanics like separate game ticks and snake movement)

IDEAS
- New Button component can be added with prop to change its appearance 
- Difficulty levels? Maybe options as modal to change parameters?

