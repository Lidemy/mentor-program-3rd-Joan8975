<?php
	require_once('./conn.php');
	require_once('./utils.php');
	require_once('./check_login.php');
	$id = $_POST['id'];
	// $parent_id = $_POST['parent_id'];
	if( !isset($_GET['page'])){
		$page = 1;
	} else {
		$page = intval($_GET['page']);
	}



	if (isset($_POST['id']) &&
		!empty($_POST['id'])){
			$sql = "DELETE FROM `joan8975_comments` WHERE `id` = $id or `parent_id` = $id";
			$result = $conn->query($sql);

			if($result) {		
				print_message('刪除成功', './index.php?page=' . $page);
				
				// print_message('刪除成功', './index.php');
			} else {
				print_message('錯誤請重試', './index.php');
			}
	} else {
		print_message('錯誤請重試', './index.php');

	}
?>