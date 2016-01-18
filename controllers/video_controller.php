<?php
	class VideoController {
		public function home(){
			require_once('views/video/home.php');
		}
		public function video(){
			require_once('views/video/video.php');
		}
		public function error(){
			require_once('views/video/error.php');
		}
		public function search(){
			require_once('views/video/search.php');
		}
		public function movies(){
			require_once('views/video/movies.php');
		}
	}
?>