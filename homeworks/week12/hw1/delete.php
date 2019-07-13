<?php
	require_once('./conn.php');
	require_once('./utils.php');
	$id = $_GET['id'];
	if(!isset($_GET['page'])){
		$page = 1;
	} else {
		$page = intval($_GET['page']);
	}

	$sql = "DELETE FROM `joan8975_comments` WHERE `id` = " . $id;
	$result = $conn->query($sql);
	if($result){
		print_message('刪除成功', './index.php?page=' . $page);
	}
	else {
		print_message('錯誤請重試', './index.php');
	}
?>
