<?php 

	include 'conn.php';

	$uid = $_POST["uid"];
	$cons = "SELECT * FROM profiles WHERE uid='".$uid."'";

	$result = $conn->query($cons);
	if ($result->num_rows > 0) {
		echo 1;
	}else { 
		echo 2;
	}
 ?>