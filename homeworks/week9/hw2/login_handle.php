<?php
	require_once('./conn.php');
	require_once('./print_message.php');
	$username = $_POST['username'];
	$password = $_POST['password'];
	if (isset($_POST['username']) &&
		isset($_POST['password']) &&
		!empty($_POST['username']) &&
		!empty($_POST['password'])){
			$sql = "SELECT * from `users` where `username` = '$username' and `password` = '$password'";
			$result = $conn->query($sql);
			if(!$result) {
				print_message('錯誤請重試', './login.php');
				exit();
			}

			if($result->num_rows > 0) {
				setcookie("username", $username, time()+3600*24);
				print_message('登入成功！', './index.php');
			} else {
				print_message('帳號或密碼錯誤！', './login.php');
			}
	} else {
		print_message('請輸入帳號或密碼！', './login.php');

	}
?>