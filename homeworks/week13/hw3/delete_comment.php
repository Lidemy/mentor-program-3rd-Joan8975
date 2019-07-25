<?php
	require_once('./conn.php');
	require_once('./utils.php');
	require_once('./check_login.php');
	$id = $_POST['id'];
	if( !isset($_GET['page'])){
		$page = 1;
	} else {
		$page = intval($_GET['page']);
	}

	if (isset($_POST['id']) &&
		!empty($_POST['id'])){
			$stmt = $conn->prepare("DELETE FROM `joan8975_comments` WHERE `id` = ? or `parent_id` = ?");
			$stmt->bind_param('ss', $id, $id);
			$result = $stmt->execute();
			if($result) {	
				echo json_encode(array(
					'result' => 'success',
					'message' => '刪除成功'
				));
			} else {
				echo json_encode(array(
					'result' => 'failure',
					'message' => '錯誤請重試！'
				));
			}
	} else {
		echo json_encode(array(
			'result' => 'failure',
			'message' => '錯誤請重試！'
		));

	}
?>