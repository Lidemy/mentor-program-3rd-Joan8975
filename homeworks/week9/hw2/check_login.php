<?php
	if (isset($_COOKIE['username']) && !empty($_COOKIE['username'])) {
		$checkLogin = $_COOKIE['username'];
	} else (
		$checkLogin = null
	)
?>