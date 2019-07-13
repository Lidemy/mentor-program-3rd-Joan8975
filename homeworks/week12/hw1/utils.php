<?php
	function print_message($mes, $redirect){
		echo '<script>';
		echo "alert('" . $mes . "');";
		echo "window.location = '" . $redirect . "'";
		echo '</script>';
	}
	function setSessionId($conn, $username){
		$myuid = uniqid();
		$sql = "DELETE FROM `joan8975_users_certificate`WHERE username = '$username'";
		$conn->query($sql);
		$session = "INSERT INTO `joan8975_users_certificate`(`session_id`,`username`) VALUES('$myuid','$username')";
		$conn->query($session);
		setcookie("session_id", $myuid, time()+3600*24);
	}
	function getUserBySessionId($conn, $sessionId){
		if (isset($sessionId) && !empty($sessionId)){
			$sql = "SELECT `username` FROM `joan8975_users_certificate` WHERE `session_id` = '$sessionId'";
			$result = $conn->query($sql);
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