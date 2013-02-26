require.config({
    urlArgs : "bust=" + (new Date()).getTime()
});

require(
[
    'jquery', 
    'lifegame'
], 
function(
    $, 
    LifeGame
) {

    var lifeGame = new LifeGame();
    console.log( "The new life game has a board of:" );
    console.log( JSON.stringify( lifeGame.board ) );
    console.log( "The next state for cell 1, 2 is:" );
    console.log( lifeGame.getNextCellState( 1, 2 ) );
    console.log( "The next board is:" );
    console.log( JSON.stringify( lifeGame.getNextBoard() ) );
    console.log( "About to visualize the board." );
    lifeGame.initializeDisplay( $('#lifeVisualization') );
    setInterval( lifeGame.nextGeneration.bind( lifeGame ), 1000 );
//    setInterval
    
/*
    var matrix = new Matrix( 5, 5 );
    //matrix.initializeRandomIntegers( 0, 1 );
    var testSequence = "0100010011110010100010001";
    matrix.scan( function( cell, i, j ) {
        var index = i * 5 + j;
        matrix.set( i, j, parseInt(testSequence[index]) );
    } );
    console.log( "The test matrix looks like:" );
    console.log( JSON.stringify( matrix ) );
*/
/*
    console.log( "The neighbors of 4,4 look like:" );
    var neighbors = matrix.getNeighbors( 4, 4 );
    console.log( JSON.stringify( neighbors ) );
    console.log( "The neighbors of 0,1 look like:" );
    neighbors = matrix.getNeighbors( 0, 1 );
    console.log( JSON.stringify( neighbors ) );
    console.log( "The neighbors of 1,4 look like:" );
    neighbors = matrix.getNeighbors( 1, 4 );
    console.log( JSON.stringify( neighbors ) );
    console.log( "The neighbors of 4, 1 look like:" );
    neighbors = matrix.getNeighbors( 4, 1 );
    console.log( JSON.stringify( neighbors ) );
    console.log( "The neighbors of 1, 0 look like:" );
    neighbors = matrix.getNeighbors( 1, 0 );
    console.log( JSON.stringify( neighbors ) );
*/
/*
    console.log( "The number of cells in state 1 are:" );
    console.log( matrix.countCells( 1 ) );
    console.log( "The number of cells in state 0 are:" );
    console.log( matrix.countCells( 0 ) );
*/               
});