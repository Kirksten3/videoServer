<div id="videoContainer" class="container" style="background-color:rgba(0,0,0,0.75);">		
	<div class="row" style="padding-bottom:15px;padding-top:15px;">
		<div id="videoRowContainer" class="col-md-2">
			<?php
				//require_once('helpers/phpHelper.php');
				//$resolution = getVideoResolution($_POST['movie']);
			?>
			<input type="hidden" id="width" value="<?php //echo $resolution[0]; ?>" />
			<input type="hidden" id="height" value="<?php //echo $resolution[1]; ?>" />
			<input type="hidden" id="title" value="<?php //echo removeExtension($_POST['selectedFilm']); ?>" />
			<input type="hidden" id="fullFilm" value="<?php echo $_POST['selectedMovie'];?>" />
			<input type="hidden" id="howToPlay" value="<?php
				if (isset($_POST['local'])) {
					echo "local";
				}
				else {
					echo "chromecast";
				}
			?>" />
			
			<!-- style tag centers video -->
			<!--
			<video id="videoDiv" class="video-js" controls preload="auto" width="600<?php //echo $resolution[0]; ?>" height="400<?php //echo $resolution[1]; ?>" data-setup="{}" style="float:none;margin:0 auto;">
				<source src="movies/<?php echo $_POST['movie']; ?>" type='video/mp4'>
				<p class="vjs-no-js">
					To view this video please enable JavaScript.
				</p>
			</video> -->
		</div>
	</div>
</div>
<footer id="footer"></footer>

<!-- helper for loading video -->
<script src="scripts/videoHelper.js"></script>
