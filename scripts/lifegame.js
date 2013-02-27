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

    var LifeGame = function( numRows, numColumns, testSequence ) {
        var self = this;
        if ( !numRows ) {
            numRows = 5;
        }
        if ( !numColumns ) {
            numColumns = 5;
        }
        self.board = new Matrix( numRows, numColumns );
        if ( testSequence ) {
            self.board.initializeFromTestSequence( testSequence );
        } else {
            self.board.initializeRandomIntegers( 0, 1 );
        }
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

        getStatus : function( i, j ) {
            if ( this.board.get( i, j ) == ALIVE ) {
                return 'alive';
            } else if ( this.board.get( i, j ) == DEAD ) {
                return 'dead';
            }
        },

        initializeDisplay : function(insertionPoint) {
            var table = $('<table>');
            var row;
            var cell;
            var status;
            for ( var i = 0; i < this.board.numRows; i++ ) {
                row = $('<tr>');
                table.append( row );
                for ( var j = 0; j < this.board.numColumns; j++ ) {
                    
                    cell = $('<td id="' + this.getCellId( i, j ) + '">');
                    cell.text( this.board.get( i, j ) );
                    cell.addClass( this.getStatus( i, j ) );
                    row.append( cell );
                }
            }
            insertionPoint.append( table );
        },

        updateDisplay : function() {
            var self = this;
            self.board.scan( function( cell, i, j ) {
                var status = self.getStatus( i, j );
                var domElement = $( '#' + self.getCellId( i, j ) );
                domElement.attr( 'class', status ).text( self.board.get( i, j ) );
            } );
        },

        isAllDead : function() {
            if ( this.board.countCells( ALIVE ) == 0 ) {
                return true;
            }
            return false;
        }
    } );

    return LifeGame;

} );