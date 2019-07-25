<?php
	function escapeChars($Chars) {
		return htmlspecialchars($Chars, ENT_QUOTES, 'UTF-8');
	}
	function print_message($mes, $redirect){
		echo '<script>';
		echo "alert('" . $mes . "');";
		echo "window.location = '" . $redirect . "'";
		echo '</script>';
	}
	function getNickname($conn, $username) {
		if (isset($_SESSION['username'])) {
			$stmt = $conn->prepare("SELECT `nickname` FROM `joan8975_users` WHERE `username` = ?");
			$stmt->bind_param("s", $username);
			$stmt->execute();
			$result = $stmt->get_result();
			if($result->num_rows > 0) {
				$row = $result->fetch_assoc();
				return escapeChars($row['nickname']);
			} else{
				return  NULL;
			}
		}
	}
?>