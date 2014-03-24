var _ = require('lodash');

var Grid = function (width, height, vals) {

    if (vals && vals.length != width * height) {
        throw 'vals must match the size of the grid if specified';
    }

    var grid = vals || new Array(width * height);

    var _cells = [],
        _rows  = [],
        _cols  = []
    ;

    _.assign(this, {

        height: height,
        width: width,

        cells: grid,

        cell: function(idx) {
            var self = this;

            if (_cells[idx]) return _cells[idx];

            var cell = {
                value: function() {
                    return self.cells[idx];
                }
            };

            _cells[idx] = cell;
            return cell;
        },

        cellAt: function(x, y) {
            return this.cell(y * width + x);
        },

        row: function(y) {
            if (_rows[y]) return _rows[y];

            var firstIdx = y * this.width;
            var vals = this.cells.slice(firstIdx, firstIdx + this.width);

            var row = {
                values: function() {
                    return vals;
                }
            };

            _rows[y] = row;
            return row;
        },

        col: function(x) {
            if (_cols[x]) return _cols[x];

            var selfWidth = this.width;
            var vals = _.filter(this.cells, function(val, idx) {
                return idx % selfWidth === x;
            });

            var col = {
                values: function() {
                    return vals;
                }
            };

            _cols[x] = col;
            return col;
        }

    });
}

module.exports = Grid;
