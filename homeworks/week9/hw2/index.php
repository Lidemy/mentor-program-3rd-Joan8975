<?php
	require_once('./conn.php');
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
				if ($checkLogin) {
					echo'<a href ="javascript:;">Hello, ' . $_COOKIE['username'] . '</a>';
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
			<img src="./user.png" class="preview_img">
			<?php
				if ($checkLogin) {
					echo '<textarea name="content" class="message_txt" placeholder="留言⋯⋯" style="resize:none;width:377px; height:150px"></textarea>';
					echo '<button class="mes_send" type="submit">發佈</button>';
				} else {
					echo '<textarea  disabled name="content" class="message_txt" placeholder="您需要登入後才可以留言" style="resize:none;width:377px; height:150px"></textarea>';
				}
			?>
			<div class="clearfix"></div>
		</form>
		<div class="comment_group">
			<?php
				$sql = "SELECT m.content, m.created_at, u.nickname 
				FROM `joan8975_comments` as m
				LEFT JOIN `joan8975_users` as u ON m.username = u.username ORDER BY m.created_at DESC";

				$result = $conn->query($sql);

				if ($result) {//可以跟你說有幾筆資料
					while($row = $result->fetch_assoc()) {	//"$result->fetch_assoc()"＝可以拿到一筆資料,$row = true/ false
					echo "<div class='comment'>";
					echo 	"<img src='./user.png' class='preview_img'>";
					echo 	"<p class='nickname_display'>" . $row['nickname'] . "</p>";
					echo 	"<p class='time'>" . $row['created_at'] . "</p>";
					echo 	"<p class='text'>" . $row['content'] . "</p>";
					echo 	"<div class='clearfix'></div>";
					echo "</div>";
					}
				}
			?>
		</div>
	</div>
</body>
</html>