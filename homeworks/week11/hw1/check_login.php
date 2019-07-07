<?php
	if (isset($_COOKIE['session_id']) && !empty($_COOKIE['session_id'])) {
		$sessionId = $_COOKIE['session_id'];
		$sql = "SELECT `joan8975_users_certificate`.username
		FROM `joan8975_users_certificate` WHERE `session_id` = '$sessionId'";
		$result = $conn->query($sql);
		if($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
			$userName = $row['username'];
			}
		}
	} else (
		$sessionId = null
	)
?>
