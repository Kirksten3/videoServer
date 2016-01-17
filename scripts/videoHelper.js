//globals
var screenHeight;
var screenWidth;
var aspectRatio;

//store screen width and height in globals, get from php shell script
function getScreenSize(){
	screenHeight = $('#height').attr('value');
	screenWidth = $('#width').attr('value');
	aspectRatio = screenWidth / screenHeight;
	return 0;
}

//set video size so it doesn't overlap container
function setFilmSize(){
	var div = $('#videoDiv');
	var containerWidth = $('#videoContainer').width();
	var containerHeight = $('#videoContainer').height();

	screenWidth = containerWidth;
	screenHeight = screenWidth / aspectRatio;

	//div.css('height', screenHeight);
	//div.css('width', screenWidth);
	return 0;
}

//sets title of film in the #headerText <p> tag
function setMovieTitle(){
	var title = $('#title').attr('value');
	$('#headerText').text('Watching: ' + title);
}

//loads the video if LOCAL is selected
function loadVideo(){
	var videoHolder = document.getElementById('videoRowContainer');
	setFilmSize();
	var movie = document.getElementById('fullFilm').getAttribute('value');
	var video = "<video id='videoPlayer' class='video-js vjs-default-skin' controls preload='auto' \
		width='" + screenWidth + "' height='" + screenHeight + "' data-setup='{}' style='\
		float:none;margin:0 auto;'><source src='movies/" + movie + "' type='video/mp4'></video>";
	alert(video);
	videoHolder.innerHTML = video;
}

// $(window).resize(function(){
	// setVideoDiv();
// });

//loads the video if chromecast is selected
function loadChromecast() {
	mediaURL = 'movies/' + document.getElementById('fullFilm').getAttribute('value');
	//setTimeout(launchApp(), 2000);
	var $item = $('#videoRowContainer');
	$item.append("<button id='play' type='button' style='float:left;' class='btn btn-primary' onclick='launchApp();'><span class='glyphicon glyphicon-play'></span>&nbsp;</button>");
	$item.append("<button id='stop' type='button' style='float:left;' class='btn btn-primary' onclick='stopMedia();'><span class='glyphicon glyphicon-stop'></span>&nbsp;</button>");
}

function determinePlayback() {
	var playback = document.getElementById('howToPlay').getAttribute('value');
	if(playback == 'local'){
		getScreenSize();
		setMovieTitle();
		loadVideo();
	}
	else {
		loadChromecast();
	}
}

//on ready function
$(function(){
	determinePlayback();
});
