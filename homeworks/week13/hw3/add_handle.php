<?php
	require_once('./conn.php');
	require_once('./utils.php');
	require_once('./check_login.php');
	$content = $_POST['content'];
	$parent_id = $_POST['parent_id'];

	$stmt = $conn->prepare("INSERT INTO `joan8975_comments`(`username`, `content`, `parent_id`) VALUES (?,?,?)");
	$stmt->bind_param("sss", $username, $content, $parent_id);
	$result = $stmt->execute();
	if($result) {
		if ($parent_id === '0') {
			$last_id = $conn->insert_id;
			$stmt = $conn->prepare("SELECT * FROM `joan8975_comments`
			WHERE username = ?
			ORDER BY created_at DESC");
			$stmt->bind_param("s", $username);
			$stmt->execute();
			$result= $stmt->get_result();
			$row = $result->fetch_assoc();
			$created_at = $row['created_at'];
			$username = $row['username'];
			$nickname = getNickname($conn, $username);
				if (isset($_POST['content']) &&
					!empty($_POST['content'])){
						$arr = array('result' => 'success','id' => $last_id, 'nickname' => $nickname, 'created_at' => $created_at, 'username' => $username);
						echo json_encode($arr);
				} else {
					echo json_encode(array(
						'result' => 'failure',
						'message' => '請輸入內容！'
					));
				}
		} else if ($parent_id !== '0') {
			if (isset($_POST['content']) && !empty($_POST['content'])){
				$last_id = $conn->insert_id;
				$sql = "SELECT * FROM `joan8975_comments`
				WHERE parent_id != 0
				ORDER BY created_at DESC";
				$result = $conn->query($sql);
				$row = $result->fetch_assoc();
				$nickname = getNickname($conn, $username);
				$created_at = $row['created_at'];

				$arr = array('result' => 'sub_success','id' => $last_id, 'nickname' => $nickname, 'created_at' => $created_at, 'parent_id' => $parent_id, 'username' => $username);
				echo json_encode($arr);
			} else {
				echo json_encode(array(
					'result' => 'failure',
					'message' => '請輸入內容！'
				));
			}
		}
		else {
			echo json_encode(array(
				'result' => 'failure',
				'message' => '錯誤請重試！'
			));
		}
	}
?>