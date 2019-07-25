<?php
	require_once('./conn.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>登入頁面</title>
	<link rel="stylesheet" href="./style.css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
	<?php include_once('templates/nav.php')?> 
	<div class="login">
		<form class="login_form" method="POST" action="./login_handle.php">
			<div class="form-group">
				<div class="username">
				<label>帳號</label>
					<input name="username" placeholder="請輸入帳號" class="form-control" ></input>
				</div>
			</div>
			<div class="form-group">
				<div class="password">
					<label>密碼</label>
					<input name="password"  placeholder="請輸入密碼" class="form-control" ></input>
				</div>
			</div>
			<button class="login_send btn btn-info" type="submit">提交</button>
		</form>
	</div>
</body>
</html>