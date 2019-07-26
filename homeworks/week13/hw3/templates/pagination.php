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

	echo "<div class='page'>";
	echo "<ul>";
	for ($i = 1; $i <= $total_page; $i++) {
		echo "<li class='" .isActive($i ,$page). "'>";
			echo "<a href='./index.php?page=$i' class='txt'>$i</a>";
		echo "</li>";
	}	
	echo "</ul>";
	echo "</div>";
?>