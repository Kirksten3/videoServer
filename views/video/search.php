<div class="container" style="background-color:rgba(0,0,0,0.75);">
	<div class="row">
		<div>
			<span>Search for: </span>
			<span><?php echo $_POST['search']; ?></span>
		</div>
	</div>
	<div class="row">
		<form action="?controller=video&action=video" method="post">
		<?php 
			require_once('helpers/phpHelper.php');
			search($_POST['search']);
		?>
		</form>
	</div>
</div>
