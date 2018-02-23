<?php
class DataClasses{
	function saveImage($id,$file){
		$date = new DateTime();
		$time = $date->getTimestamp();
		$filename = $id."_".$time.'.rnr';
		$file = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file));

        $handle = fopen('../images/profile/'.$filename, 'w+');
        if(fwrite($handle, $file) && fclose($handle)){
			return $filename;
        }
		else{
			return 0;
		}
	}

	function saveProductImage($id,$file){
		$date = new DateTime();
		$time = $date->getTimestamp();
		$filename = $id."_".$time.'.rnr';
		$file = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file));

        $handle = fopen('../images/products/'.$filename, 'w+');
        if(fwrite($handle, $file) && fclose($handle)){
			return $filename;
        }
		else{
			return 0;
		}
	}

	function saveIcon($file){
		$date = new DateTime();
		$time = $date->getTimestamp();
		$filename = "category_{$time}.rnr";
		$file = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file));

        $handle = fopen('../images/icon/'.$filename, 'w+');
        if(fwrite($handle, $file) && fclose($handle)){
			return $filename;
        }
		else{
			return 0;
		}
	}

	function saveBrand($file){
		$date = new DateTime();
		$time = $date->getTimestamp();
		$filename = "brand_{$time}.rnr";
		$file = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $file));

        $handle = fopen('../images/brand/'.$filename, 'w+');
        if(fwrite($handle, $file) && fclose($handle)){
			return $filename;
        }
		else{
			return 0;
		}
	}
}

?>