<?php
	require_once('./conn.php');
	require_once('./utils.php');
	require_once('./check_login.php');
	$content = $_POST['content'];
	$parent_id = $_POST['parent_id'];

	if( !isset($_GET['page'])){
		$page = 1;
	} else {
		$page = intval($_GET['page']);
	}



	if (isset($_POST['content']) &&
		!empty($_POST['content'])){
			$sql = "INSERT INTO `joan8975_comments`(`username`, `content`, `parent_id`) VALUES ('$userName','$content',$parent_id)";
			$result = $conn->query($sql);

			if($result) {
				print_message('刪除成功', './index.php?page=' . $page);
				header('Location: ./index.php?page='. $page . '#' . $parent_id);
			} else {
				print_message('錯誤請重試', './index.php');
			}
	} else {
		print_message('請輸入內容！', './index.php');

	}
?>