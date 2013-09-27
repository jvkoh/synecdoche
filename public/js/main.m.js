// Global Variables
var gWrapper, midCircle, circleSize, expCircleSize, songs, buttons, bWrapper;

//===========================================
// Sets the song for a given jPlayer
//===========================================
function initJPlayer( num , file ) {
    // initialize the player
    $('#jquery_jplayer_'+num).jPlayer({
        ready: function() {
            $(this).jPlayer("setMedia", {
                mp3: file,
            });
        },
        cssSelectorAncestor: '#jp_container_' + num,
        supplied: 'mp3',
        swfPath: '/js/libs',
        volume: 1,
    });
}

//===========================================
// JQuery Bindings!
//===========================================
$(document).ready( function() {
    // Set Constants
    gWrapper = $('#content-wrapper');
    midCircle = $('#liner-notes');
    songs = $('.song');
    buttons = $('.picture-button');
    bWrapper = $('#buttons-container');
    circleSize = 200;
    expCircleSize = 700;

    initPage();

    // Initialize jPlayers
    var i;
    for( i = 0 ; i < 4 ; i++ )
    {
        initJPlayer( i , 'music/song' + i + ".mp3" );
    }

    // When they resize the window, resize the body!
    $(window).resize( resizeBody );

    // When they click the circle, toggle the circle
	midCircle.click( circleToggle );

    //---------------------------
    // On a given song-click
    //---------------------------
    $('.song').click( function() {
        
        var num = parseInt( $(this).data('num') );
        var thisPlayer = $('#jquery_jplayer_' + num );
        
        if( $(this).hasClass("playing") )
        {
            thisPlayer.jPlayer("pause");
            $(this).removeClass("playing");
        } else {
            thisPlayer.jPlayer("pauseOthers");
            $('.song').removeClass("playing");
            thisPlayer.jPlayer("play");
            $(this).addClass("playing");
        }

    });


    //---------------------------
    // When a song ends, play the next one
    //---------------------------
    $('.jp').bind( $.jPlayer.event.ended + '.next', function() {
        
        var thisContainer = $(this).data('interface');
        $('#'+thisContainer).removeClass("playing");

        var nextPlayer = $(this).next();
        if( nextPlayer )
        {
            nextPlayer.jPlayer("play");
            var nextContainer = nextPlayer.data('interface');
            $("#"+nextContainer).addClass("playing");
        }
    });


    //---------------------------
    // When a song ends, leave the song filled in
    //---------------------------
    $('.jp').bind( $.jPlayer.event.ended + '.leaveFilled', function() {
        var thisContainer = $('#'+$(this).data('interface'));
        thisContainer.children('.progress').width('100%');
    });
});
