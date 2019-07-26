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
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>
<body>
		<nav class="navigation">
			<div class="bar">本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼</div>
			<div class="nav_right">
				<?php
					if ($username) {
						echo'<div class="welcome">Hello, ' . getNickname($conn, $username) . '</div>';
						echo '<a href="./logout.php" class="txt btn btn-outline-info" >登出</a>';
					} else {
						echo '<a href="./register.php" class="txt btn btn-outline-info">註冊</a>';
						echo '<a href="./login.php" class="txt btn btn-outline-info">登入</a>';
					}
				?>
			</div>
			<div class="clearfix"></div>
		</nav>
		<div class="wrapper">
			<div class="title">Comments</div>
			<form class="mes_form" method="POST" action="./add_handle.php" >
				<input type="hidden" value="0" name="parent_id">
				<img src="./user.png" class="preview_img">
				<?php
					if ($username) {
						echo '<textarea name="content" class="message_txt" placeholder="留言⋯⋯" style="resize:none;width:390px; height:150px"></textarea>';
						echo '<button class="mes_send btn btn-info" type="submit">發佈</button>';
					} else {
						echo '<textarea disabled name="content" class="message_txt" placeholder="您需要登入後才可以留言" style="resize:none;width:377px; height:150px"></textarea>';
					}
				?>
				<div class="clearfix"></div>
			</form>
			<!-- 分頁 -->
			<?php include('templates/pagination.php')?> 
			<!-- 留言列表 -->
			<div class="comment_group">
				<?php		
					if(isset($_GET['id'])){ //點編輯按鈕會透過連結傳遞 id， 此處用來判斷是否進入編輯模式
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
							?>
							<div class='comment'>
								<div class="anchor"  id="<?= $row['id'] ?>">#</div>
								<img src='./user.png' class='preview_img'>
								<p class='nickname_display'><?= escapeChars($row['nickname']) ?></p>
								<p class='time'><?= escapeChars($row['created_at']) ?></p>
								<div class='clearfix'></div>
								<?php
								if ($row['id'] === $ID){ //點編輯按鈕會同時得到 id ，進入自己的 comments 編輯模式
									?>
									<form method="POST" action="./handle_update.php?page=<?= $page ?>&id=<?= $row['id'] ?>">
										<textarea name="content" class="edit_txt" style="resize:none;width:460px; height:150px"><?= escapeChars($row['content']) ?></textarea>
										<button class='edit btn btn-outline-info' type="submit" >更新</button>
										<a href='./index.php?page=<?= $page ?>#<?= $row['id']?>' class='edit btn btn-outline-info' >取消</a>
									</form>
									<?php
								} else {//自己 & 他人的 comments
									?>
									<p class='text'><?= escapeChars($row['content']) ?></p>
									<?php
									if ($row['username'] === $username){// 判斷是否為自己的 comments，會出現編輯以及刪除按鈕
										?>
										<a href='./index.php?page=<?= $page ?>&id=<?= $row['id']?>#<?= $row['id']?>' class='edit btn btn-outline-info' >編輯</a>
										<input type="submit" class='delete btn btn-outline-danger' value='刪除' data_id='<?= $row['id']?>'></input>
										<?php
									}
								}
								?>
								<?php include('templates/sub_comment.php')?> 
							</div>
							<?php 
						}
					}
				?>
			</div>
		</div>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<script>
		$(document).ready(function(e) {
			//新增主留言與子留言
			$('.wrapper').on('submit', 'form', function(e){ 
				const content = $(e.target).find('textarea[name=content]').val();
				const parentId = $(e.target).find('input[name=parent_id]').val();
			
				if (parentId >= 0) { //針對可獲取 parentId 的 form 停止默認行為
					e.preventDefault();
				}else { //其他 form（更新留言）的執行行為不變 
					return;
				}
				$('textarea[name=content]').val('');
				$.ajax({
					type: 'POST',
					url: 'add_handle.php',
					data: {
						content: content,
						parent_id: parentId
					},
					success: function(resp) { //json_encode 後的值帶入 resp
						var res = JSON.parse(resp); //再解開 JSON 格式
						// console.log('res.id='+res.id);
						// console.log(res.username);
						if (res.result === 'success') { //如果得到主留言成功結果，執行以下
							$('.comment_group').prepend(`
							<div class='comment'>
								<div class='anchor' id='${res.id}'>#</div>
								<img src='./user.png' class='preview_img'>
								<p class='nickname_display'>${res.nickname}</p>
								<p class='time'>${res.created_at}</p>
								<p class='text'>${content}</p>
								<div class='clearfix'></div>
								<a href='./index.php?page=<?= $page ?>&id=${res.id}' class='edit btn btn-outline-info'>編輯</a>
								<input type="submit" class='delete btn btn-outline-danger' data_id= '${res.id}' value='刪除'></input>
								<div class="sub_comments" comment_id='${res.id}'>
								</div>
								<div class="add_sub_comment">
									<form  method="POST" action="./add_handle.php">
										<input type="hidden" value="${res.id}" name="parent_id">
										<p class="sub_title">新增留言</p>
										<textarea name="content" class="sub_message_txt" placeholder="留言⋯⋯" style="resize:none;width:388px; height:100px"></textarea>
										<button class="mes_send btn btn-info" type="submit">發佈</button>
										<div class="clearfix"></div>
									</form>
								</div>
							</div>
							`)
						} else if (res.result === 'sub_success') { //如果得到子留言成功結果，執行以下
							var commentId = res.parent_id;
							// $("#"+commentId)
							$("div[comment_id='"+commentId+"']").append(`
							<div class="sub_comment_author">
								<img src='./user.png' class='preview_img'>
								<p class='sub_nickname_display'>${res.nickname}</p>
								<p class='sub_time'>${res.created_at}</p>
								<p class='sub_text'>${content}</p>
								<div class='clearfix'></div>
								<input type="submit" class='delete btn btn-outline-danger' value='刪除' data_id= '${res.id}'></input>
							</div>`)
						} else{
							alert(res.message);
						}
					}
				})
			})
			//刪除主留言與子留言
			$('.comment_group').on('click', '.delete', function(e) {
				const id = $(e.target).attr('data_id');
				// alert(id);
				if(!confirm('是否確定要刪除?')) return
				$.ajax({
					method: "POST",
					url: "delete_comment.php",
					data: { 
						id 
					}
				}).done(function(resp) {
					$(e.target).parent().hide(200);
					var res = JSON.parse(resp);
					alert(res.message);
					// const subComment = $(e.target).parent('.sub_comment_author');
					// console.log(subComment);
					// if (subComment.length === 0) {//主留言
					// 	$(e.target).parent().hide(100);
					// } else {
					// 	$(e.target).parent().hide(100);
					// }
				}).fail(function() {
					alert('刪除失敗！')
				});
			})
		})
	</script>
</body>
</html>