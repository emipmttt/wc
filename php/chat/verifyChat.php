<?php

header("Content-Type: text/html;charset=utf-8");
	include '../conn.php';

	$uid = $_POST['uid'];

	$sql = "SELECT * FROM messages WHERE (uid2 = '".$uid."') AND (viewed='0') ORDER BY id DESC";
	$result = $conn->query($sql);
	$row = $result->fetch_assoc();

	if ($result->num_rows > 0) { 

		echo 1;

	} else if ($result->num_rows == 0) {
		echo 2;
	}
 ?>
