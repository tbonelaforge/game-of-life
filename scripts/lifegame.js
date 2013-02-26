define(
[
    'underscore',
    'matrix',
    'jquery'
],
function(
    _,
    Matrix,
    $
) {
    
    var ALIVE = 1;
    var DEAD  = 0;

    var LifeGame = function( numRows, numColumns ) {
        var self = this;
        if ( !numRows ) {
            numRows = 5;
        }
        if ( !numColumns ) {
            numColumns = 5;
        }
        self.board = new Matrix( numRows, numColumns );
        //this.board.initializeRandomIntegers( 0, 1 );
        var testSequence = "0100010011110010100010001";
        self.board.scan( function( cell, i, j ) {
            var index = i * 5 + j;
            self.board.set( i, j, parseInt(testSequence[index]) );
        } );
        return self;
    };

    _.extend( LifeGame.prototype, {
        getNextCellState : function( i, j ) {
            var currentState = this.board.get( i, j );
            var neighbors = this.board.getNeighbors( i, j );
            var numberOfLivingNeighbors = neighbors.countCells( ALIVE );
            if ( currentState == ALIVE ) {
                if ( numberOfLivingNeighbors < 2 ) {
                    return DEAD; // Under-population.
                } else if ( numberOfLivingNeighbors > 3 ) {
                    return DEAD; // Over-crowding.
                } else {
                    return ALIVE; // Survival.
                }
            } else { // Cell is DEAD.
                if ( numberOfLivingNeighbors == 3 ) {
                    return ALIVE; // Reproduction.
                } else {
                    return DEAD;
                }
            }
        },

        getNextBoard : function() {
            var self = this;
            var nextBoard = new Matrix( this.board.numRows, this.board.numColumns );
            self.board.scan( function( cell, i, j ) {
                var nextCellState = self.getNextCellState( i, j );
                nextBoard.set( i, j, nextCellState );
            } );
            return nextBoard;
        },

        nextGeneration : function() {
            this.board = this.getNextBoard();
            this.updateDisplay();
        },

        getCellId : function( i, j ) {
            return this.board.numRows * i + j;
        },

        initializeDisplay : function(insertionPoint) {
            var table = $('<table>');
            for ( var i = 0; i < this.board.numRows; i++ ) {
                var row = $('<tr>');
                table.append( row );
                for ( var j = 0; j < this.board.numColumns; j++ ) {
                    
                    var cell = $('<td id="' + this.getCellId( i, j ) + '">');
                    cell.text( this.board.get( i, j ) );
                    row.append( cell );
                }
            }
            insertionPoint.append( table );
        },

        updateDisplay : function() {
            var self = this;
            self.board.scan( function( cellValue, i, j ) {
                $( '#' + self.getCellId( i, j )  ).text( cellValue );
            } );
        }
    } );

    return LifeGame;

} );