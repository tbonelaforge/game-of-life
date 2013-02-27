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
    var lifeGame = new LifeGame( 20, 40 );
    lifeGame.initializeDisplay( $('#lifeVisualization') );
    var evolution = null;
    var evolutionState = 'stopped';
    $( '#start_evolution' ).on( 'click', function() {
        if ( evolutionState == 'stopped' ) {
            lifeGame.nextGeneration();
            evolution = setInterval( function() {
                lifeGame.nextGeneration();
                if ( lifeGame.isAllDead() ) {
                    clearInterval( evolution );
                    evolutionState = 'stopped';
                }
            }, 1000 );
            evolutionState = 'started';
        }
    } );
    

    $( '#stop_evolution' ).on( 'click', function() {
        if ( evolutionState == 'started' ) {
            clearInterval( evolution );
            evolutionState = 'stopped';
        }
    } );

});