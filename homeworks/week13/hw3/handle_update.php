<?php
	require_once('./conn.php');
	require_once('./utils.php');
	
	$id = $_GET['id'];

	if( !isset($_GET['page'])){
		$page = 1;
	} else {
		$page = intval($_GET['page']);
	}

	if (isset($_POST['content']) &&
		!empty($_POST['content'])){
			$content = $_POST['content'];
			$stmt = $conn->prepare("UPDATE `joan8975_comments`
			SET `content` = ?
			WHERE `id` =  ?");
			$stmt->bind_param("ss", $content, $id);
			$result = $stmt->execute();
			if($result) {
				?>
				<script>
				window.location.href = "./index.php?page=<?= $page ?>#<?= $id ?>";
				</script>
				<?php
			} else {
				print_message('錯誤請重試', './index.php');
			}
	} else {
		print_message('請輸入內容！', './index.php');
	}
?>