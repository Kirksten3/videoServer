<?php
	function call($controller, $action){
		
		require_once('controllers/' . $controller . '_controller.php');
		
		switch($controller){
			case 'video':
				$controller = new VideoController();
			break;
		}
		
		$controller->{ $action }();
	}
	
	$controllers = array('video' => ['home', 'video', 'error', 'search']);
	
	if (array_key_exists($controller, $controllers)) {
		if (in_array($action, $controllers[$controller])) {
			call($controller, $action);
		}
		else{
			call('video', 'error');
		}
	}
	else{
		call('video','error');
	}

?>