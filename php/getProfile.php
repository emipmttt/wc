<?php 

	include 'conn.php';

	$uid = $_POST["uid"];
	$cons = "SELECT * FROM profiles WHERE uid='".$uid."'";

	$result = $conn->query($cons);
	$row = $result->fetch_assoc();

	echo json_encode($row);


 ?>