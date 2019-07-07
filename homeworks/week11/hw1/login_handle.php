<?php
	require_once('./conn.php');
	require_once('./print_message.php');
	if (isset($_POST['username']) &&
		isset($_POST['password']) &&
		!empty($_POST['username']) &&
		!empty($_POST['password'])){
			$username = $_POST['username'];
			$password = $_POST['password'];
			$sql = "SELECT u.username, u.password, c.session_id
			FROM `joan8975_users` as u
			LEFT JOIN `joan8975_users_certificate` as c ON u.username = c.username
			WHERE u.username = '$username'";
			$result = $conn->query($sql);
			if(!$result) {
				print_message('帳號或密碼錯誤！', './login.php');
				exit();
			}
			if($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					if(password_verify($password, $row['password'])) {
						$sessionId = $row['session_id'];
						setcookie("session_id", $sessionId, time()+3600*24);
						print_message('登入成功！', './index.php');
					}else {
						print_message('帳號或密碼錯誤！', './login.php');
					}
				}
			} else {
				print_message('帳號或密碼錯誤！', './login.php');
			}
	} else {
		print_message('請輸入帳號或密碼！', './login.php');
	}
?>