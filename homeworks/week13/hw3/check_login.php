<?php
	session_start();
	require_once('./conn.php');
	require_once('./utils.php');
	if(isset($_SESSION['username'])){
		$username = $_SESSION['username'];
	}else{
		$username = null;
	}
?>
