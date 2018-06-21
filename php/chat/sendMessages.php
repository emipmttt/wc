<?php 

header("Content-Type: text/html;charset=utf-8");
	include '../conn.php';

	$myUid = $_POST['myUid'];
	$message = $_POST['message'];
	$uidP = $_POST['uidP'];


		$sql = "INSERT INTO messages (uid1,uid2,messages) VALUES ('".$myUid."','".$uidP."','".$message."')";
		if ($conn->query($sql) === TRUE) {
		  echo 1;
		} else {
			echo "Error: " . $sql . " " . $conn->error;
		}



 ?>