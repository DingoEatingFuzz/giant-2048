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
        expect(grid.cell(4).value()).toEqual(5);
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

describe('A grid cell interface', function() {
    it('should update the underlying grid when a value is set', function() {
        var grid = new Grid(3, 3);
        var cell = grid.cellAt(2, 2);

        expect(cell.value()).toBeUndefined();
        expect(cell.set(10).value()).toEqual(10);
    });
});

describe('A grid row interface', function() {
    it('should update the underlying grid when values are set', function() {
        var grid = new Grid(3, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        var row = grid.row(1);

        expect(row.set([ 100, 101, 102 ]).values()).toEqual([ 100, 101, 102]);
        expect(grid.cells).toEqual([ 1, 2, 3, 100, 101, 102, 7, 8, 9 ]);

        expect(function() { row.set([ 100 ]); }).toThrow();
    });
});

describe('A grid column interface', function() {
    it('should update the underlying grid when values are set', function() {
        var grid = new Grid(3, 3, [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        var col = grid.col(1);

        expect(col.set([ 100, 101, 102 ]).values()).toEqual([ 100, 101, 102 ]);
        expect(grid.cells).toEqual([ 1, 100, 3, 4, 101, 6, 7, 102, 9 ]);

        expect(function() { col.set([ 100 ]); }).toThrow();
    });
});
