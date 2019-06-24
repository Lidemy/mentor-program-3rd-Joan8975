<?php
	require_once('./conn.php');
	require_once('./print_message.php');
	$content = $_POST['content'];
	$cookie =  $_COOKIE['username'];
	if (isset($_POST['content']) &&
		!empty($_POST['content'])){
			$sql = "INSERT INTO `joan8975_comments`(`username`, `content`) VALUES ('$cookie','$content')";
			$result = $conn->query($sql);

			if($result) {
				header('Location: ./index.php');
				// print_message('發佈成功！', './index.php');
			} else {
				print_message('錯誤請重試', './index.php');
			}
	} else {
		print_message('請輸入內容！', './index.php');

	}
?>