<?php
	require_once('./conn.php');
	require_once('./print_message.php');
	$content = $_POST['content'];

	$sessionId = $_COOKIE['session_id'];
	$sql = "SELECT u.username, c.session_id
	FROM `joan8975_users` as u
	LEFT JOIN `joan8975_users_certificate` as c ON u.username = c.username WHERE `session_id` = '$sessionId'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			$userName = $row['username'];
		}
	}

	if (isset($_POST['content']) &&
		!empty($_POST['content'])){
			$sql = "INSERT INTO `joan8975_comments`(`username`, `content`) VALUES ('$userName','$content')";
			$result = $conn->query($sql);

			if($result) {
				header('Location: ./index.php');
			} else {
				print_message('錯誤請重試', './index.php');
			}
	} else {
		print_message('請輸入內容！', './index.php');

	}
?>