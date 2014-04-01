var _    = require('lodash')
  , Grid = require('./grid');

var Game = function(size) {

    size = size || 4;

    _.assign(this, {
        grid: new Grid(size, size)
    });
};

_.assign(Game.prototype, {
    slideLeft: function() {

    },
    slideRight: function() {

    },
    slideUp: function() {
        var self = this;
        _.forEach(_.range(this.grid.width), function(n) {
            var row = self.grid.col(n);
            rowVals = _.compact(row.values());
            rowVals.length = self.grid.width;
            row.set(rowVals);
        });
    },
    slideDown: function() {

    }
});

module.exports = Game;
