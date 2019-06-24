<?php
	require_once('./conn.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>註冊頁面</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<nav class="navigation">
		<p class="bar">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</p>
		<div class="nav_left">
			<a href="./index.php">返回首頁</a>
		</div>
		<div class="nav_right">
			<a href="./register.php">註冊</a>
			<a href="./login.php">登入</a>
		</div>
		<div class="clearfix"></div>
	</nav>
	<div class="login">
		<form class="login_form" method="POST" action="./register_handle.php">
			<div class="username">
				<p>帳號</p>
				<textarea name="username" placeholder="請輸入帳號" style="resize:none;width:377px; height:30px"></textarea>
			</div>
			<div class="password">
				<p>密碼</p>
				<textarea name="password"  placeholder="請輸入密碼" style="resize:none;width:377px; height:30px"></textarea>
			</div>
			<div class="nickname">
				<p>暱稱</p>
				<textarea name="nickname" placeholder="請輸入暱稱" style="resize:none;width:377px; height:30px"></textarea>
			</div>
			<button class="login_send" type="submit">提交</button>
		</form>
	</div>
</body>
</html>