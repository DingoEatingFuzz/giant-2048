var Grid = require('../lib/grid');

describe('A 2D grid interface', function() {

    it('should expose grids through the Grid class', function() {
        var grid = new Grid(3, 3);
        expect(grid.cells.length).toEqual(9);

        var grid2 = new Grid(3, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        expect(grid2.cells).toEqual( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
    });

    it('should allow access to an individual cell by idx', function() {
        var grid = new Grid(3, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        expect(grid.cell(4)).toBeDefined();
        expect(grid.cell(4).value()).toEqual(15);
    });

    it('should allow access to an individual cell by coordinates', function() {
        var grid = new Grid(2, 2, [ 1, 2, 3, 4 ]);
        expect(grid.cellAt(0, 1)).toBeDefined();
        expect(grid.cellAt(0, 1).value()).toEqual(3);
    });

    it('should allow access to rows by row number', function() {
        var grid = new Grid(2, 2, [ 1, 2, 3, 4 ]);
        expect(grid.row(1).values()).toEqual([ 3, 4 ]);
    });

    it('should allow access to columns by column number', function() {
        var grid = new Grid(3, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        expect(grid.col(1).values()).toEqual([ 2, 5, 8 ]);
    });

});
