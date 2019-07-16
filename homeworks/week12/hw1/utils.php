<?php
	function print_message($mes, $redirect){
		echo '<script>';
		echo "alert('" . $mes . "');";
		echo "window.location = '" . $redirect . "'";
		echo '</script>';
	}
	function setSessionId($conn, $username){
		$myuid = uniqid();
		$stmt_delete = $conn->prepare("DELETE FROM `joan8975_users_certificate`WHERE username = ?");
		$stmt_delete->bind_param("s", $username);
		$stmt_delete->execute();
		$stmt_insert = $conn->prepare("INSERT INTO `joan8975_users_certificate`(`session_id`,`username`) VALUES(?,?)");
		$stmt_insert->bind_param("ss", $myuid, $username);
		$stmt_insert->execute();
		setcookie("session_id", $myuid, time()+3600*24);
	}
	function getUserBySessionId($conn, $sessionId){
		if (isset($sessionId) && !empty($sessionId)){
			$stmt = $conn->prepare("SELECT `username` FROM `joan8975_users_certificate` WHERE `session_id` = ?");
			$stmt->bind_param("s", $sessionId);
			$stmt->execute();
			$result = $stmt->get_result();
			if($result->num_rows > 0) {
				$row = $result->fetch_assoc();
				return $row['username'];
			} else{
				return  NULL;
			}
		} else {
			$sessionId = null;
		}
	}
?>