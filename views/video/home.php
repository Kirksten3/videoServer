<div class="container">
	<form id='videoSelection' action="?controller=video&action=video" method="post">
	<div class="panel panel-default">
		<div class="panel-heading">
			<p class="text-center" style="color:#ffffff;">Pick a Movie!</p>
		</div>
		<div class="panel-body">
			
			<?php
				require('helpers/phpHelper.php') ;
				checkDirectory();
			?>
			<input type='hidden' id='selectedMovie' name='selectedMovie' value='' />
		</div>
	</div>
	<div id="selectionModal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			
			<div class="modal-content">
				<div class="modal-header">
					<button class='close' type="button" data-dismiss='modal'>&times;</button>
					<h4 class="modal-title">Content Play Selection</h4>
				</div>
				<div class="modal-body">
					<p>Would you prefer to play the content locally or via chromecast?</p>
				</div>
				<div class="modal-footer">
					<button name='local' type="submit" class="btn btn-primary">Local</button>
					<button name='chromecast' type="submit" class="btn btn-primary">Chromecast</button>
				</div>
			</div>
			
		</div>
	</div>
	</form>
</div>