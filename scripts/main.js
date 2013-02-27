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

//    var lifeGame = new LifeGame( 5, 5, "0100010011110010100010001" );
    var lifeGame = new LifeGame( 20, 20 );
    lifeGame.initializeDisplay( $('#lifeVisualization') );
    var evolution = setInterval( function() {
        lifeGame.nextGeneration();
        if ( lifeGame.isAllDead() ) {
            clearInterval( evolution );
        }
    }, 1000 );
});