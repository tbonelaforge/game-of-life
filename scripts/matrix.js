define(
[
    'underscore',
],
function(
    _
) {

    var Matrix = function( numRows, numColumns ) {
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.cells = [];
        for ( var i = 0; i < numRows; i++ ) {
            this.cells[i] = [];
            for ( var j = 0; j < numColumns; j++ ) {
                this.cells[i][j] = null;
            }
        }
    };

    _.extend( Matrix.prototype, {
        get : function( i, j ) {
            return this.cells[i][j];
        },
        set : function( i, j, value ) {
            this.cells[i][j] = value;
        },
        scan : function( processor ) {
            for ( var i = 0; i < this.numRows; i++ ) {
                for ( var j = 0; j < this.numColumns; j++ ) {
                    var cell = this.cells[i][j];
                    processor( cell, i, j );
                }
            }
        },

        initializeFromTestSequence : function( testSequence ) {
            var self = this;

            self.scan( function( cell, i, j ) {
                var index = i * self.numColumns + j;
                self.set( i, j, parseInt(testSequence[index]) );
            } );            
        },
        
        initializeRandomIntegers : function( lowerBound, upperBound ) {
            var self = this;
            var span = upperBound - lowerBound;

            self.scan( function( cell, i, j ) {
                var randomInteger = lowerBound;
                randomInteger += Math.floor( Math.random() * ( span + 1 ) );
                self.cells[i][j] = randomInteger;
            } );
        },

        getNeighbors : function( i, j ) {
            var neighbors = new Matrix( 3, 3 );
            for ( var rowDelta = -1; rowDelta <= 1; rowDelta++ ) {
                var x = i + rowDelta;
                var neighborRow = rowDelta + 1;
                for ( var columnDelta = -1; columnDelta <= 1; columnDelta++ ) {
                    var y = j + columnDelta;
                    var neighborColumn = columnDelta + 1;
                    if ( 0 <= x && x < this.numRows &&
                         0 <= y && y < this.numColumns ) {
                        var value = this.cells[x][y];
                        neighbors.set( neighborRow, neighborColumn, value );
                    } else {
                        neighbors.set( neighborRow, neighborColumn, null );
                    }
                }
            }
            neighbors.set( 1, 1, null );
            return neighbors;
        },

        countCells : function( targetState ) {
            var self = this;
            var count = 0;
            self.scan( function( cell, i, j ) {
                if ( cell != null && cell == targetState ) {
                    count++;
                }
            } );
            return count;
        }
    } );

    return Matrix;

});