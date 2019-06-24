<?php
	function print_message($mes, $redirect){
		echo '<script>';
		echo "alert('" . $mes . "');";
		echo "window.location = '" . $redirect . "'";
		echo '</script>';
	}
?>