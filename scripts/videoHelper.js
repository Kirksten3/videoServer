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
	videoHolder.innerHTML = video;
}

// $(window).resize(function(){
	// setVideoDiv();
// });

//loads the video if chromecast is selected
function loadChromecast() {
	mediaURL = 'movies/' + document.getElementById('fullFilm').getAttribute('value');
	loadChromecastPanel();
}

//loads chromecast playback panel
function loadChromecastPanel() {
	var $container = $('#videoRowContainer');
	$container.append("<div id='playbackPanel' class='container-fluid'></div>");
	var $playPanel = $('#playbackPanel');
	$playPanel.append("<button id='launch' type='button' class='btn btn-default chromecast-panel-element' onclick='launchApp();'>Launch Film</button>");
	$playPanel.append("<button id='play' type='button' class='btn btn-default chromecast-panel-element' onclick='playMedia();'><span class='glyphicon glyphicon-play'></span></button>");
	$playPanel.append("<button id='stop' type='button' class='btn btn-default chromecast-panel-element' onclick='stopMedia();'><span class='glyphicon glyphicon-stop'></span></button>");
	$playPanel.append("<button id='volume' type='button' onmouseover='volumeTag();' onmouseout='hideVolume();' class='btn btn-default chromecast-panel-element'>\
		<input id='volInput' min='1' max='100' step='1' type='range' value='50' \
		onmouseup='setReceiverVolume(this.value/100,false);updateVolume();' /></button>");
	
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
