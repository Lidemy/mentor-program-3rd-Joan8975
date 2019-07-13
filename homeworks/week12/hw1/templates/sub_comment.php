<?php
	require_once('./check_login.php');
?>
<div class="sub_comments">
<?php
$id = $row['id'];
$sql_sub = "SELECT m.content, m.created_at, m.username, m.id, u.nickname
FROM `joan8975_comments` as m
LEFT JOIN `joan8975_users` as u 
ON m.username = u.username  
WHERE m.parent_id = $id
ORDER BY m.created_at ASC";
$result_sub = $conn->query($sql_sub);

if ($result_sub) {
	while($row_sub = $result_sub->fetch_assoc()) {
		if ($row_sub['username'] === $row['username']){
		?>
		<div class="sub_comment_author">
			<img src='./user.png' class='preview_img'>
			<p class='sub_nickname_display'><?= $row_sub['nickname'] ?></p>
			<p class='sub_time'><?= $row_sub['created_at'] ?></p>
			<p class='sub_text'><?= htmlspecialchars($row_sub['content'], ENT_QUOTES, 'utf-8') ?></p>
			<div class='clearfix'></div>
			<?php
			if ($row_sub['username'] === $userName){
				?>
				<form method="POST" action="./delete_comment.php?page=<?= $page ?>">
					<input type="hidden" value="<?= $row_sub['id']?>" name="id">
					<input type="submit" class='sub-delete' value='刪除'></input>
				</form>
				<?php
			}
			?>
		</div>
		<?php
		} else{
		?>
		<div class="sub_comment">
			<img src='./user.png' class='preview_img'>
			<p class='sub_nickname_display'><?= $row_sub['nickname'] ?></p>
			<p class='sub_time'><?= $row_sub['created_at'] ?></p>
			<p class='sub_text'><?= htmlspecialchars($row_sub['content'], ENT_QUOTES, 'utf-8') ?></p>
			<div class='clearfix'></div>
			<?php
			if ($row_sub['username'] === $userName){
				?>
				<form method="POST" action="./delete_comment.php?page=<?= $page ?>">
					<input type="hidden" value="<?= $row_sub['id']?>" name="id">
					<input type="submit" class='sub-delete' value='刪除'></input>
				</form>
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
<div class="add_sub_comment">
<form  method="POST" action="./add_handle.php?page=<?= $page ?>">
	<div class="anchor"  id="<?= $row['id'] ?>">#</div>
	<input type="hidden" value="<?= $row['id'] ?>" name="parent_id">
	<p class="sub_title">新增留言</p>
	<?php
		if ($sessionId) {
			echo '<textarea name="content" class="sub_message_txt" placeholder="留言⋯⋯" style="resize:none;width:377px; height:100px"></textarea>';
			echo '<button class="mes_send" type="submit">發佈</button>';
		} else {
			echo '<textarea disabled name="content" class="sub_message_txt" placeholder="您需要登入後才可以留言" style="resize:none;width:377px; height:100px"></textarea>';
		}
	?>
	<div class="clearfix"></div>
</form>
</div>
