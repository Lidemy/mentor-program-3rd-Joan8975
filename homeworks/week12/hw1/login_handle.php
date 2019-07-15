<?php
	require_once('./conn.php');
	require_once('./utils.php');
	
	if (isset($_POST['username']) &&
		isset($_POST['password']) &&
		!empty($_POST['username']) &&
		!empty($_POST['password'])){
			$username = $_POST['username'];
			$password = $_POST['password'];
			$stmt = $conn->prepare("SELECT u.username, u.password
			FROM `joan8975_users` as u
			LEFT JOIN `joan8975_users_certificate` as c ON u.username = c.username
			WHERE u.username = ?");
			$stmt->bind_param("s", $username);
			$stmt->execute();
			$result = $stmt->get_result();
			if(!$result) {
				print_message('帳號或密碼錯誤！', './login.php');
				exit();
			}
			if($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					if(password_verify($password, $row['password'])) {
						setSessionId($conn, $username);
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