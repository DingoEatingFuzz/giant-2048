var _ = require('lodash');

var Grid = function (width, height, vals) {

    if (vals && vals.length != width * height) {
        throw 'vals must match the size of the grid if specified';
    }

    _.assign(this, {
        cells:  vals || new Array(width * height),
        _cells: [],
        _rows:  [],
        _cols:  [],
        height: height,
        width: width,
    });

}

_.assign(Grid.prototype, {

    cell: function(idx) {
        var self = this;

        if (this._cells[idx]) return this._cells[idx];

        var cell = {
            value: function() {
                return self.cells[idx];
            },
            set: function(v) {
                self.cells[idx] = v;
                return this;
            }
        };

        this._cells[idx] = cell;
        return cell;
    },

    cellAt: function(x, y) {
        return this.cell(y * this.width + x);
    },

    row: function(y) {
        var self = this;

        if (this._rows[y]) return this._rows[y];

        var firstIdx = y * this.width;

        var row = {
            values: function() {
                return self.cells.slice(firstIdx, firstIdx + self.width);;
            },
            set: function(vals) {
                if (vals.length != self.width)
                    throw new Error("values must be an array with length equal to the grid width.");
                self.cells.splice.apply(self.cells, [ firstIdx, self.width ].concat(vals));
                return this;
            }
        };

        this._rows[y] = row;
        return row;
    },

    col: function(x) {
        var self = this;

        if (this._cols[x]) return this._cols[x];

        var col = {
            values: function() {
                return _.filter(self.cells, function(val, idx) {
                    return idx % self.width === x;
                });
            },
            set: function(vals) {
                if (vals.length != self.height)
                    throw new Error("values must be an array with length equal to the grid height.");
                _.map(vals, function(val, idx) {
                    self.cells[idx * self.width + x] = val;
                });
                return this;
            }
        };

        this._cols[x] = col;
        return col;
    }

});

module.exports = Grid;
