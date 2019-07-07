<?php
	require_once('./conn.php');
	require_once('./print_message.php');
	if (isset($_POST['username']) &&
		isset($_POST['password']) &&
		isset($_POST['nickname']) &&
		!empty($_POST['username']) &&
		!empty($_POST['password']) &&
		!empty($_POST['nickname'])){
			$username = $_POST['username'];
			$password = $_POST['password'];
			$password = password_hash($password, PASSWORD_DEFAULT);
			$nickname = $_POST['nickname'];
			$sql = "INSERT INTO `joan8975_users`(`username`, `password`, `nickname`) VALUES('$username','$password','$nickname')";
			$result = $conn->query($sql);

			if($result) {
				$myuid = uniqid();
				$session = "INSERT INTO `joan8975_users_certificate`(`session_id`,`username`) VALUES('$myuid','$username')";
				if($conn->query($session)){
					setcookie("session_id", $myuid, time()+3600*24);
					print_message('註冊成功！', './index.php');
					}
			} else {
				print_message('這個帳號有人用囉！請重新輸入', './register.php');
			}
	} else {
		print_message('請輸入帳號密碼或暱稱！', './register.php');
	}
?>

