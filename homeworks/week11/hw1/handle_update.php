<?php
	require_once('./conn.php');
	require_once('./print_message.php');
	
	$id = $_GET['id'];
	if( !isset($_GET['page'])){
		$page = 1;
	} else {
		$page = intval($_GET['page']);
	}

	if (isset($_POST['content']) &&
		!empty($_POST['content'])){
			$content = $_POST['content'];
			$sql = "UPDATE `joan8975_comments`
			SET `content` = '$content'
			WHERE `id` =  $id ";
			$result = $conn->query($sql);
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