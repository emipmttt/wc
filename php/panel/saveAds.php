<?php 

include '../conn.php';

$url = $_POST['url'];
$img = $_POST['img'];
$title = $_POST['title'];

$sql = "INSERT INTO ads (title,url,img) VALUES ('".$title."','".$url."','".$img."') ";

	if ($conn->query($sql) === TRUE) {
	  echo 1;
	} else {
		echo "Error: " . $sql . " " . $conn->error;
	}

 ?>