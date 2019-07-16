<?php
	require_once('./conn.php');
	require_once('./utils.php');
	if(isset($_COOKIE['session_id'])){
		$sessionId = $_COOKIE['session_id'];
		$userName = getUserBySessionId($conn, $_COOKIE['session_id']);
	}else{
		$sessionId = null;
		$userName = null;
	}
?>
