// Global Variables
var gWrapper, midCircle, circleSize, expCircleSize, songs, buttons, bWrapper, linerText, linerLabel, bWidth, bHeight;

//===========================================
// Resizes the whole page to fit the window
//===========================================
function resizeBody() {
    var songsWidth, songsHeight, titleHeight;

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

    songs.css({
        fontSize: (songsHeight/5),
    });

    titleHeight = bHeight/6;
    $('#page-title').css( {
        height: (titleHeight*5/6),
        fontSize: (titleHeight*2/3),
        paddingTop: (titleHeight/6)
    });

    bWrapper.css( {
        height: titleHeight,
        top: (titleHeight*5),
    });

    buttons.css( {
        height: (titleHeight*2/3),
        width: (titleHeight*2/3),
        top: (titleHeight/6) ,
    });

    $('.song-text').each( function() {
        $(this).css( "top", (songsHeight - $(this).height())/2 );
    });

    linerLabel.css({
        top: (bHeight - linerLabel.height())/2,
        left: (bWidth - linerLabel.width())/2
    });

    repositionCircle();
}


//===========================================
// Resizes and centers the circle
//===========================================
function repositionCircle() {
    var bWidth, bHeight, cDiameter, setTop, setLeft, diff;

    bWidth = $(window).width() - 70;
    bHeight = $(window).height() - 70;

    cDiameter = midCircle.width();
    setTop = (bHeight - cDiameter)/2;
    setLeft = (bWidth - cDiameter)/2;

    midCircle.css({
        top: setTop,
        left: setLeft
    });

    diff = (expCircleSize - cDiameter)/2;

    linerText.css({
        top: -diff,
        left: -diff,
    });
}

//===========================================
// Runs when the page is initialized
//===========================================
function initPage() {
    midCircle.css({
        height: circleSize,
        width: circleSize,
    });

    linerText.hide();
    linerText.css({
        width: expCircleSize - 200,
    });

    resizeBody();
    setTimeout( resizeBody , 50 );
}


//===========================================
// Toggles the middle circle
//===========================================
function circleToggle() {
    var circleOff;
    circleOff = (expCircleSize - circleSize)/2;

    if( !midCircle.hasClass('locked') )
    {
        midCircle.addClass('locked');

        if( midCircle.hasClass('expanded') )
        {
            midCircle.animate({
                height: circleSize,
                width: circleSize,
                top: (bHeight - circleSize)/2,
                left: (bWidth - circleSize)/2
            }, 1000);
            linerText.animate({
                top: 0-circleOff,
                left: 0-circleOff,
            }, 1000);
            setTimeout( function(){ linerText.fadeOut(500); }, 1000);
            setTimeout( function(){ linerLabel.fadeIn(500); }, 1500);
            midCircle.removeClass('expanded');
        } else {
            midCircle.animate({
                height: expCircleSize,
                width: expCircleSize,
                top: (bHeight - expCircleSize)/2,
                left: (bWidth - expCircleSize)/2
            }, 1000);
            linerText.animate({
                top: 0,
                left: 0,
            }, 1000);
            setTimeout( function(){ linerLabel.fadeOut(500); }, 1000);
            setTimeout( function(){ linerText.fadeIn(500); }, 1500);
            midCircle.addClass('expanded');
        }

        setTimeout( function(){ midCircle.removeClass('locked'); }, 2100);
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
    linerLabel = $('#liner-notes-label');
    bWidth = $(window).width() - 70;
    bHeight = $(window).height() - 70;
    circleSize = 200;
    expCircleSize = 600;

    initPage();

    // When they resize the window, resize the body!
    $(window).resize( resizeBody );

    // When they click the circle, toggle the circle
	midCircle.click( circleToggle );

});
