//handles redirect back to home page on home button click and clears navbar text
$('#home').click(function(){
	$('#headerText').text('');
	window.location.href = "?controller=video&action=home";
});

//handles selection of chromecast or local video play
$('.filmSelect').on('click', function(){
	$('#selectedMovie').attr('value', $(this).val());
	$('#selectionModal').modal({show: false});
	$('#selectionModal').modal('show');
});


