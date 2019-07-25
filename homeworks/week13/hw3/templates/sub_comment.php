<?php
	require_once('./check_login.php');
?>
<div class="sub_comments">
	<?php
	$id = $row['id'];
	$stmt_sub = $conn->prepare("SELECT m.content, m.created_at, m.username, m.id, u.nickname
	FROM `joan8975_comments` as m
	LEFT JOIN `joan8975_users` as u 
	ON m.username = u.username  
	WHERE m.parent_id = ?
	ORDER BY m.created_at ASC");
	$stmt_sub->bind_param("s", $id);
	$stmt_sub->execute();
	$result_sub = $stmt_sub->get_result();

	if ($result_sub) {
		while($row_sub = $result_sub->fetch_assoc()) {
			if ($row_sub['username'] === $row['username']){//留言是原 po ，背景色灰色。
			?>
			<div class="sub_comment_author">
				<img src='./user.png' class='preview_img'>
				<p class='sub_nickname_display'><?=  escapeChars($row_sub['nickname'])  ?></p>
				<p class='sub_time'><?= escapeChars($row_sub['created_at']) ?></p>
				<p class='sub_text'><?= escapeChars($row_sub['content']) ?></p>
				<div class='clearfix'></div>
				<?php
				if ($row_sub['username'] === $username){
					?>
					<input type="hidden" value="<?= $row_sub['id']?>" name="id"></input>
					<input type="submit" class='delete btn btn-outline-danger' value='刪除' data_id='<?= $row_sub['id']?>'></input>
					<?php
				}
				?>
			</div>
			<?php
			} else{//留言不是原 po ，背景色白色
			?>
			<div class="sub_comment">
				<img src='./user.png' class='preview_img'>
				<p class='sub_nickname_display'><?=  escapeChars($row_sub['nickname'])  ?></p>
				<p class='sub_time'><?= escapeChars($row_sub['created_at']) ?></p>
				<p class='sub_text'><?= escapeChars($row_sub['content']) ?></p>
				<div class='clearfix'></div>
				<?php
				if ($row_sub['username'] === $username){
					?>
					<input type="hidden" value="<?= $row_sub['id']?>" name="id"></input>
					<input type="submit" class='delete btn btn-outline-danger' value='刪除' data_id='<?= $row_sub['id']?>'></input>
					<?php
				}
				?>
			</div>
			<?php
			}
		}
	}
	?>
</div>
<div class="sub_comments" comment_id='<?= $row['id'] ?>'></div>
<div class="add_sub_comment">
	<form  method="POST" action="./add_handle.php?page=<?= $page ?>">
		<input type="hidden" value="<?= $row['id'] ?>" name="parent_id"></input>
		<p class="sub_title">新增留言</p>
		<?php
			if ($username) {
				echo '<textarea name="content" class="sub_message_txt" placeholder="留言⋯⋯" style="resize:none;width:388px; height:100px"></textarea>';
				echo '<button class="mes_send btn btn-info" type="submit">發佈</button>';
			} else {
				echo '<textarea disabled name="content" class="sub_message_txt" placeholder="您需要登入後才可以留言" style="resize:none;width:388px; height:100px"></textarea>';
			}
		?>
		<div class="clearfix"></div>
	</form>
</div>

