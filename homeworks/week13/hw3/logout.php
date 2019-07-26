<?php
	session_start();
	session_destroy();
	// setcookie("session_id", '', time()+3600*24);
	header('Location: ./index.php');
?>