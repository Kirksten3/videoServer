<?php
	//opens directory and looks for file, also generates html for file if found
	//NOTE potentially use glob to search through files
	function checkDirectory(){
		$files = scandir('movies/');
		sort($files);
		foreach($files as $file){
			if($file != "." && $file != ".." && checkFileType($file)){
				theButtonizer($file);
			}
		}
	}
	
	//returns bool, for matching .mp4, .avi, or .mkv
	function checkFileType($item){
		if (strpos($item, '.mp4') !== FALSE){
			return TRUE;
		}
		if (strpos($item, '.avi') !== FALSE){
			//CHANGE TO TRUE WHEN SUPPORT IS UPDATED
			return FALSE;
		}
		if (strpos($item, '.mkv') !== FALSE){
			//CHANGE TO TRUE WHEN SUPPORT IS UPDATED
			return FALSE;
		}
		return FALSE;
	}
	
	//returns an array of [0]: width, [1]: height
	function getVideoResolution($moviePath){
		$output = shell_exec("exiftool " . loadFileName($moviePath) . " | grep 'Image Size'");
		$split = explode(": ", $output);
		
		//resolution[0] = width, [1] = height
		$resolution = explode('x',$split[1]);
		return $resolution;
	}
	
	//takes a movie name and returns it properly escaped
	function loadFileName($moviePath){
		$newPath = "";
		$splitTitle = explode(" ", $moviePath);
		foreach($splitTitle as $section){
			
			//replace ' ' with "\ " so the terminal gets the right characters
			$newPath = $newPath . $section . "\\ ";
		}
		$newPath = substr($newPath, 0, -2);
		
		//have to switch to the new directory
		return "movies/" . $newPath;
	}
	
	function removeExtension($movieTitle){
		return substr($movieTitle,0,-4);
	}
	
	//echos out a button based off the string provided
	function theButtonizer($string){
		//always remove extension for the title
		$stringTitle = removeExtension($string);
		echo "<button value='$string' name='movie' type='button' class='btn btn-default filmSelect'>$stringTitle</button>";
		return 0;
	}
	
	function search($string){
		$files = scandir('movies/');
		sort($files);
		$splitString = explode(' ',$string);
		foreach($files as $file){
			if (!checkFileType($file)){
				continue;
			}
			
			//exact match
			if ($file == $string){
				theButtonizer($file);
				continue;
			}
			
			//case-insensitive match
			if (strtolower($file) == strtolower($string)){
				theButtonizer($file);
				continue;
			}

			//split string match and split string case insensitive
			foreach($splitString as $item){
				if (strpos($file,$item) !== FALSE){
					theButtonizer($file);
					continue;
				}
				if (strpos(strtolower($file),strtolower($item)) !== FALSE){
					theButtonizer($file);
					continue;
				}
			}
			//maybe at some point split each word in string up and see if it is in file
		}
	}
?>