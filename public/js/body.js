// Global Variables
var gWrapper, midCircle, circleSize, expCircleSize, songs, buttons, bWrapper, linerText;

//===========================================
// Resizes the whole page to fit the window
//===========================================
function resizeBody() {
    var bWidth, bHeight, songsWidth, songsHeight, titleHeight;

    // Main Block dimensions
    bWidth = $(window).width() - 70;
    bHeight = $(window).height() - 70;

    // Set main block size
    gWrapper.width( bWidth );
    gWrapper.height( bHeight );

    // Song Block dimensions
    songsWidth = Math.ceil(bWidth/2);
    songsHeight = Math.ceil(bHeight/3);

    // Set song block size
    songs.width( songsWidth );
    songs.height( songsHeight );
    // Set the song progress height
    $('.progress').height( songsHeight );
    $('.top-song').css( {
        top: Math.ceil(songsHeight/2)
    });
    $('.bot-song').css( {
        top: Math.ceil(songsHeight*3/2)
    });
    $('.right-song').css( {
        left: songsWidth
    });

    songs.each( function() {
        $(this).css({
            'font-size': ($(this).height()/5) + 'px'
        });
    });

    titleHeight = bHeight/6;
    $('#page-title').css( {
        'height': (titleHeight*5/6) + 'px',
        'font-size': (titleHeight*2/3) + 'px',
        'padding-top': (titleHeight/6) + 'px'
    });

    bWrapper.css( {
        'height': titleHeight + 'px',
        'top': (titleHeight*5) + 'px',
    });

    buttons.css( {
        'height': (titleHeight*2/3) + 'px',
        'width': (titleHeight*2/3) + 'px',
        'top': (titleHeight/6) + 'px' ,
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
    var bWidth, bHeight, cDiameter, setTop, setLeft, diff;

    bWidth = $(window).width();
    bHeight = $(window).height();

    cDiameter = midCircle.width();
    setTop = (bHeight - 70 - cDiameter)/2;
    setLeft = (bWidth - 70 - cDiameter)/2;

    midCircle.css({
        top: setTop + 'px',
        left: setLeft + 'px'
    });

    diff = (expCircleSize - circleSize)/2;

    linerText.css({
        top: -diff + 'px',
        left: -diff + 'px',
        width: expCircleSize - 200
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
        linerText.animate({
            top: 0-circleOff + 'px',
            left: 0-circleOff + 'px'
        }, 1000);
    } else {
        midCircle.addClass('expanded');
        midCircle.animate({
            height: expCircleSize + 'px',
            width: expCircleSize + 'px',
            top: '-=' + circleOff + 'px',
            left: '-=' + circleOff + 'px'
        }, 1000);
        linerText.animate({
            top: 0,
            left: 0
        }, 1000);
    }
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
    linerText = $('#liner-notes-text');
    circleSize = 200;
    expCircleSize = 600;

    initPage();

    // When they resize the window, resize the body!
    $(window).resize( resizeBody );

    // When they click the circle, toggle the circle
	midCircle.click( circleToggle );

});
