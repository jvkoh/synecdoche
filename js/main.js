// Global Variables
var gWrapper, midCircle, circleSize, expCircleSize, songs;

//===========================================
// Resizes the whole page to fit the window
//===========================================
function resizeBody() {
    var bWidth, bHeight, songsWidth, songsHeight, titleHeight;

    // Main Block dimensions
    bWidth = $(window).width();
    bHeight = $(window).height();
    // Set main block size
    gWrapper.width( bWidth - 70 );
    gWrapper.height( bHeight - 70 );

    // Song Block dimensions
    songsWidth = (bWidth - 70)/2 + 2;
    songsHeight = (bHeight - 70)/3 + 2;

    // Set song block size
    songs.width( songsWidth );
    songs.height( songsHeight );
    // Set the song progress height
    $('.progress').height( songsHeight );
    $('.top-song').css( {
        top: songsHeight/2
    });
    $('.bot-song').css( {
        top: songsHeight*3/2
    });
    $('.right-song').css( {
        left: songsWidth
    });

    songs.each( function() {
        $(this).css({
            'font-size': ($(this).height()/5) + 'px'
        });
    });

    titleHeight = (bHeight - 70)/6;
    $('#page-title').css( {
        'height': (titleHeight*5/6) + 'px',
        'font-size': (titleHeight*2/3) + 'px',
        'padding-top': (titleHeight/6) + 'px'
    });

    $('.song-text').each( function() {
        $(this).css({
            top: (songsHeight - $(this).height())/2
        });
    });


    repositionCircle();
}


//===========================================
// Resizes and centers the circle
//===========================================
function repositionCircle() {
    var bWidth, bHeight, cDiameter, setTop, setLeft;

    bWidth = $(window).width();
    bHeight = $(window).height();

    cDiameter = midCircle.width();
    setTop = (bHeight - 70 - cDiameter)/2;
    setLeft = (bWidth - 70 - cDiameter)/2;

    midCircle.css({
        top: setTop + 'px',
        left: setLeft + 'px'
    });
}

//===========================================
// Runs when the page is initialized
//===========================================
function initPage() {
    midCircle.css({
        height: circleSize + 'px',
        width: circleSize + 'px',
    });
    resizeBody();
}


//===========================================
// Toggles the middle circle
//===========================================
function circleToggle() {
    var circleOff;
    circleOff = (expCircleSize - circleSize)/2;

    if( midCircle.hasClass('expanded') )
    {
        midCircle.removeClass('expanded');
        midCircle.animate({
            height: circleSize + 'px',
            width: circleSize + 'px',
            top: '+=' + circleOff + 'px',
            left: '+=' + circleOff + 'px'
        }, 1000);
    } else {
        midCircle.addClass('expanded');
        midCircle.animate({
            height: expCircleSize + 'px',
            width: expCircleSize + 'px',
            top: '-=' + circleOff + 'px',
            left: '-=' + circleOff + 'px'
        }, 1000);
    }
}

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
    });
}

//===========================================
// JQuery Bindings!
//===========================================
$(document).ready( function() {
    // Set Constants
    gWrapper = $('#content-wrapper');
    midCircle = $('#mid-circle');
    songs = $('.song');
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
