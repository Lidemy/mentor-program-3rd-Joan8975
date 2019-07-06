<?php
	if (isset($_COOKIE['username']) && !empty($_COOKIE['username'])) {
		$username = $_COOKIE['username'];
	} else (
		$username = null
	)
?>