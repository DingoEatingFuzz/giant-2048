var Game = require('../lib/game')
  , Grid = require('../lib/grid')
;

var _ = undefined;

var boardStates = {
    sparseNoMatches: [
        _, 2, _, 4,
        4, _, 8, _,
        2, 8, 4, 2,
        _, _, _, _,
   ]
};

describe('A sliding board game', function() {
    it('should slide tiles up', function() {
        var game = new Game();
        game.grid = new Grid(4, 4, boardStates.sparseNoMatches.slice());

        game.slideUp();

        expect(game.grid.cells).toEqual([
            4, 2, 8, 4,
            2, 8, 4, 2,
            _, _, _, _,
            _, _, _, _
        ]);
    });
});
