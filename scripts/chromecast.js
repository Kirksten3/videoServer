//global variables
var currentMediaSession = null;
var session = null;
var storedSession = null;
var mediaCurrentTime = 0;
var timer = null;
var mediaURL = null;
var currentVolume = 0.5;

//This determines if the chromecast api is available
window['__onGCastApiAvailable'] = function(loaded, errorInfo){
	if (loaded) {
		initializeCastApi();
	} else {
		console.log(errorInfo);
	}
};

function initializeCastApi() {
	var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
	
	
	var sessionRequest = new chrome.cast.SessionRequest(applicationID);
	var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
	chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

//initialization success callback
//COME BACK TO LATER
function onInitSuccess() {
	console.log('init success');
	launchApp();
	// storedSession = JSON.parse(localStorage.getItem('storedSession'));
	// if (storedSession) {
		// var dateString = storedSession.timestamp;
		// var now = new Date().getTime();
// 		
		// if (now - dateString < SESSION_IDLE_TIMEOUT) {
			// document.getElementById
		// }
	// }
}

//error call back for initialization
function onError(e) {
	console.log('Error' + e);
}

//generic success callback
function onSuccess(message) {
	console.log(message);
}

//callback on success for stopping app
function onStopAppSuccess() {
	console.log('Session stopped');
	//change cast icon in here too...
}

function sessionListener(e) {
	console.log('New session ID: ' + e.sessionId);
	session = e;
	if (session.media.length != 0) {
		onMediaDiscovered('sessionListener', session.media[0]);
	}
	session.addMediaListener(onMediaDiscovered.bind(this, 'addMediaListener'));
	session.addUpdateListener(sessionUpdateListener.bind(this));
}

function sessionUpdateListener(isAlive) {
	if (!isAlive) {
		session = null;
	}
	if (timer) {
		clearInterval(timer);
	}
	//this is for updating time in the movie
	// else {
		// timer = setInterval(updateCurrentTime.bind(this), PR)
	// }
}

//checks to see if a receiver can be found
function receiverListener(e) {
	if (e === 'available') {
		console.log('receiver found');
	}
	else {
		console.log('receiver list empty');
	}
}

//launches app and request session
function launchApp() {
	console.log('launching app...');
	chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
	if (timer) {
		clearInterval(timer);
	}
}

//callback for success on requestSession call
function onRequestSessionSuccess(e) {
	console.log('session success: ' + e.sessionId);
	saveSessionID(e.sessionId);
	session = e;
	session.addUpdateListener(sessionUpdateListener.bind(this));
	if (session.media.length != 0) {
		onMediaDiscovered('onRequestSession', session.media[0]);
	}
	session.addMediaListener(onMediaDiscovered.bind(this, 'addMediaListener'));
	loadMedia();
}

//callback on launch error
function onLaunchError() {
	console.log('launch error');
}

//save session ID into local storage for sharing
function saveSessionID(sessionId) {
	if (typeof(Storeage) != 'undefined') {
		console.log('session id saved');
		var object = {id: sessionId, timestamp: new Date().getTime()};
		localStorage.setItem('storedSession', JSON.stringify(object));
	}
}

//stop app/session
function stopApp() {
	session.stop(onStopAppSuccess, onError);
	if (timer) {
		clearInterval(timer);
	}
}

//loads media that has been specified
function loadMedia() {
	if (!session) {
		console.log('no session');
		return;
	}
	
	console.log('loading media: ' + mediaURL);
	var mediaInfo = new chrome.cast.media.MediaInfo('http://10.0.0.163/' + mediaURL);
	mediaInfo.contentType = 'video/mp4';

	mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
 	mediaInfo.metadata.metadataType = chrome.cast.media.MetadataType.GENERIC;

	var tempTitle = mediaURL.substr(7);
	tempTitle = tempTitle.slice(0, -4);
	mediaInfo.metadata.title = tempTitle;
	
	var request = new chrome.cast.media.LoadRequest(mediaInfo);
	request.autoplay = true;
	request.currentTime = 0;
	console.log('session status in load media: ' + session.status);
	
	//switch glyphicon and remove launch
	$('#play > span').removeClass('glyphicon-play');
	$('#play > span').addClass('glyphicon-pause');
	
	session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
}

//callback for success on loading media
// how = info string from callback
// mediaSession = media Session object
function onMediaDiscovered(how, mediaSession) {
	console.log('HOW: ' + how);
	console.log('new media session ID: ' + mediaSession.mediaSessionId);
	currentMediaSession = mediaSession;
	currentMediaSession.addUpdateListener(onMediaStatusUpdate);
	mediaCurrentTime = currentMediaSession.currentTime;
}

//callback on media success
function onMediaSuccess(){
	console.log('media load success');
}

//callback on media loading error
function onMediaError(e) {
	console.log('media load error ' + JSON.stringify(e));
}

//get media status initiated by sender when necessary
function getMediaStatus() {
	if (!session || !currentMediaSession) {
		return;
	}
	
	currentMediaSession.getStatus(null, mediaCommandSuccessCallback.bind(this, 'got media status'), onError);
}

//callback for media status event
function onMediaStatusUpdate(isAlive) {
	if (!isAlive) {
		currentMediaTime = 0;
	}
	//updates html to media changes
	// else {
		// if (currentMediaSession.playerState == 'PLAYING') {
			// if (progress)
		// }
	// }
}

//update progress bar...
// function updateCurrentTime() {
	// //do stuff
// }

//play media
function playMedia() {
	if (!currentMediaSession) {
		return;
	}
	
	if (timer) {
		clearInterval(timer);
	}
	
	var playPause = $('#play > span');
	if(playPause.hasClass('glyphicon-play')){
		playPause.removeClass('glyphicon-play');
		playPause.addClass('glyphicon-pause');
		currentMediaSession.play(null, mediaCommandSuccessCallback.bind(this, 'playing started for ' + currentMediaSession.sessionId), onError);
	}
	else {
		playPause.removeClass('glyphicon-pause');
		playPause.addClass('glyphicon-play');
		currentMediaSession.pause(null, mediaCommandSuccessCallback.bind(this, 'paused ' + currentMediaSession.sessionId), onError);
	}
	
}

function setReceiverVolume(level, mute) {
	if (!session) {
		return;
	}
	
	//if mute is false
	if (!mute) {
		session.setReceiverVolumeLevel(level, mediaCommandSuccessCallback.bind(this, 'media set-volume done'), onError);
		currentVolume = level;
	}
	
	else {
		session.setReceiverMuted(true, mediaCommandSuccessCallback.bind(this, 'media set-volume done'), onError);
	}
}

function stopMedia() {
	if (!currentMediaSession) {
		return;
	}
	
	currentMediaSession.stop(null, mediaCommandSuccessCallback.bind(this, 'stopped ' + currentMediaSession.sessionId), onError);
	if (timer) {
		clearInterval(timer);
	}
}

function mediaCommandSuccessCallback(info) {
	console.log(info);
}



