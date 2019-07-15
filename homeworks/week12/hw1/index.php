<?php
	require_once('./conn.php');
	require_once('./utils.php');
	require_once('./check_login.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>留言板版</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<nav class="navigation">
		<p class="bar">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
		<div class="nav_right">
			<?php
				if ($sessionId) {
					echo'<a href ="javascript:;">Hello, ' . $userName . '</a>';
					echo '<a href="./logout.php">登出</a>';
				} else {
					echo '<a href="./register.php">註冊</a>';
					echo '<a href="./login.php">登入</a>';
				}
			?>
		</div>
		<div class="clearfix"></div>
	</nav>
	<div class="container">
		<div class="title">
			<p>Comments</p>
		</div>
		<form class="mes_form" method="POST" action="./add_handle.php">
			<input type="hidden" value="0" name="parent_id">
			<img src="./user.png" class="preview_img">
			<?php
				if ($sessionId) {
					echo '<textarea name="content" class="message_txt" placeholder="留言⋯⋯" style="resize:none;width:377px; height:150px"></textarea>';
					echo '<button class="mes_send" type="submit">發佈</button>';
				} else {
					echo '<textarea disabled name="content" class="message_txt" placeholder="您需要登入後才可以留言" style="resize:none;width:377px; height:150px"></textarea>';
				}
			?>
			<div class="clearfix"></div>
		</form>
		<!-- 分頁 -->
	<?php
		$pages_count = "SELECT COUNT(id) FROM `joan8975_comments` WHERE parent_id = 0 ";
		$pages_result = $conn->query($pages_count);
		$pages_row = $pages_result->fetch_assoc();
		
		
		$limit = 20;
		$total_page = ceil($pages_row['COUNT(id)']/$limit);


		if( !isset($_GET['page'])){
			$page = 1;
		} else {
			$page = intval($_GET['page']);
		}

		function isActive($num, $page) {
			if($page === $num) return 'active';
		}

		echo "<div class='pagination'>";
		echo "<ul>";
		for ($i = 1; $i <= $total_page; $i++) {
			echo "<li class='" .isActive($i ,$page). "'>";
				echo "<a href='./index.php?page=$i'>$i</a>";
			echo "</li>";
		}	
		echo "</ul>";
		echo "</div>";
	?>
		<!-- 留言列表 -->
		<div class="comment_group">
			<?php		
				if(isset($_GET['id'])){
					$ID = $_GET['id'];
				}else{
					$ID = null;
				}

				$sql = "SELECT m.content, m.created_at, m.username, m.id, u.nickname
				FROM `joan8975_comments` as m
				LEFT JOIN `joan8975_users` as u 
				ON m.username = u.username  
				WHERE m.parent_id = 0
				ORDER BY m.created_at DESC
				LIMIT " . ($page-1)*$limit . ", $limit ";
				$result = $conn->query($sql);

				if ($result) {
					while($row = $result->fetch_assoc()) {
						if ($row['id'] === $ID){
							//自己的 comments 編輯模式
							?>
							<div class="comment">
								<form  method="POST" action="./handle_update.php?page=<?= $page ?>&id=<?= $row['id'] ?>#<?= $row['id'] ?>">
									<div class="anchor"  id="<?= $row['id'] ?>">#</div>
									<img src='./user.png' class='preview_img'>
									<p class='nickname_display'><?= $row['nickname'] ?></p>
									<p class='time'><?= $row['created_at'] ?></p>
									<textarea name="content" class="edit_txt" style="resize:none;width:449px; height:150px"><?= htmlspecialchars($row['content'], ENT_QUOTES, 'utf-8') ?></textarea>
									<div class='clearfix'></div>
									<button  class='edit' type="submit" >更新</button>
									<form method="POST" action="./delete_comment.php?page=<?= $page ?>">
										<input type="hidden" value="<?= $row['id']?>" name="id">
										<a href='./index.php?page=<?= $page ?>#<?= $row['id'] ?>' class='edit' ' >取消</a>
										<input type="submit" class='delete' value='刪除'></input>
									</form>
								</form>
								
								<?php include('templates/sub_comment.php')?>
							</div>
							<?php
						} else {					
							//自己 ＆ 其他人的 comments
							?>
							<div class='comment'>
								<img src='./user.png' class='preview_img'>
								<p class='nickname_display'><?= $row['nickname'] ?></p>
								<p class='time'><?= $row['created_at'] ?></p>
								<p class='text'><?= htmlspecialchars($row['content'], ENT_QUOTES, 'utf-8') ?></p>
								<div class='clearfix'></div>
								<?php
								// 自己的 comments
								if ($row['username'] === $userName){
									?>
									<form method="POST" action="./delete_comment.php?page=<?= $page ?>">
										<input type="hidden" value="<?= $row['id']?>" name="id">
										<a href='./index.php?page=<?= $page ?>&id=<?= $row['id']?>#<?= $row['id']?>' class='edit' >編輯</a>
										<input type="submit" class='delete' value='刪除'></input>
									</form>
									<?php
								}
								?>
								<?php include('templates/sub_comment.php')?>
							</div>
							<?php 
						}
					}
				 }
			?>
		</div>
	</div>



</body>
</html>