# Giant 2048

A 4x4 grid is much too small. How about 128x128? 256x256?

## Rules of the game

### Objective

Achieve a highscore by combining tiles into higher scoring tiles.

### Controls

**Left**: Slides all tiles to the left, combining matching tiles from left-to-right

**Right**: Slides all tiles to the right, combining matching tiles from right-to-left

**Up**: Slides all tiles to the top, combining matching tiles from top-to-bottom

**Down**: Slides all tiles to the bottom, combining matching tiles from bottom-to-top

### Game Environment

A tiled, square board with large dimensions.

### Sequence of Events

1. The game board is seeded with 2 randomly placed tiles
2. The player chooses to slide the board in one of the four directions
3. The game slides tiles towards the direction of player input
    * tile combination is evaluated from target direction to the opposite,
    (e.g., `[ 2, 2, 2 ] -> [ 4, 2 ]` when input is left; `[ 2, 2, 2 ] -> [ 2, 4 ]` when input is right).
    * tiles don't slide when there is nowhere for them to slide
4. A new tile is randomly placed in an open location

### End game condition

The game board is full and no combinations can be made, (i.e., no equal tiles are adjacent).

## Technical notes

The entire game is rendered as a 2D canvas. The value ofn

## Setup for development

`npm install && gulp`

## Running tests

`gulp test`

## Deploy for production

`gulp deploy`
