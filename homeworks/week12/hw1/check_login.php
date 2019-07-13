<?php
	require_once('./conn.php');
	require_once('./utils.php');
	$sessionId = $_COOKIE['session_id'];
	$userName = getUserBySessionId($conn, $_COOKIE['session_id']);
?>
