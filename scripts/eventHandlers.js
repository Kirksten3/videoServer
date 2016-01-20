//handles redirect back to home page on home button click and clears navbar text
$('#home').click(function(){
	$('#headerText').text('');
	window.location.href = "?controller=video&action=home";
});

//handles redirect for movies button in navbar
$('#moviesNav').click(function(){
	location.href = '?controller=video&action=movies';	
});

//handles selection of chromecast or local video play
$('.filmSelect').on('click', function(){
	$('#selectedMovie').attr('value', $(this).val());
	$('#selectionModal').modal({show: false});
	$('#selectionModal').modal('show');
});

function volumeTag() {
	var volumePos = $('#volume').position();
	//alert(volumePos);
	var div = $('#hoverBox');
	div.show();
	div.html('Volume: ' + $('#volInput').val());
	//alert($('#volInput').val());
	div.css({top: volumePos.top - 40, left: volumePos.left + 4, position:'absolute'});
}

function updateVolume() {
	var item = $('#hoverBox');
	item.html('Volume: ' + $('#volInput').val());
}

function hideVolume() {
	var div = $('#hoverBox');
	div.hide();
}

$('.filmSelect').on('hover', function(){
	//figure something out
});

$(function(){
	//hide the volume hover box for chromecast
	$('#hoverBox').hide();
});
