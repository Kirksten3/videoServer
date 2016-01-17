<!DOCTYPE html>
<html data-cast-api-enabled="true">
	<head>
		<!-- video.js css DEFAULT-->
		<link href="http://vjs.zencdn.net/5.4.4/video-js.css" rel="stylesheet">
		
		<!-- videohub.css -->
		<link rel="stylesheet" href="style/videohub.css">
		
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="style/bootstrap.css">
		
		<!-- jQuery library -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		
		<!-- Latest compiled JavaScript -->
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
		
		<!-- load video.js DEFAULT-->
		<script type="text/javascript" src="http://vjs.zencdn.net/5.4.4/video.js"></script>
		
		<!-- Chromecast Sender API -->
		<script type="text/javascript" src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"></script>
		
		<!-- local chromecast JS -->
		<script type="text/javascript" src="scripts/chromecast.js"></script>
	
		<nav class="navbar navbar-inverse navbar-fixed">
			<div class="container-fluid">
				<ul class="nav navbar-nav">
					<li class="extra-paddingLR"><button id="home" type="button" class="btn btn-default navbar-btn">Home</button></li>
					<li class="extra-paddingLR"><button id="moviesNav" type="button" class="btn btn-default navbar-btn">Movies</button></li>
					<li class="extra-paddingLR"><button id="tvNav" type="button" class="btn btn-default navbar-btn">TV Shows</button></li>
					<li class="extra-paddingLR">
						<form class="navbar-form" action="?controller=video&action=search" method="post">
							<div class="form-group">
								<input type="text" class="form-control" name="search" placeholder="Search for a movie here">
							</div>
							<button id="navSearch" type="submit" class="btn btn-default">Search</button>
						</form>
					</li>
				</ul>
				
				
				
				<!-- <button id="musicNav" type="button" class="btn btn-default navbar-btn">Music</button> -->
				
				
				<p id="headerText" class="navbar-text" style="float:right;"></p>
			</div>
			
		</nav>
	
	</head>
	
	<body style="background-image: url('content/background.jpg')">
		
		<?php require_once('routes.php'); ?>
	</body>
	
	<script src="scripts/eventHandlers.js"></script>
</html>