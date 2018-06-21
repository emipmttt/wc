<?php 



include '../conn.php';

$uid = $_POST['uid'];
$myUid = $_POST['myUid'];


		$sql = "UPDATE messages SET viewed ='1' WHERE (uid1 = '".$uid."' OR uid2 = '".$uid."') AND (uid1 = '".$myUid."' OR uid2 = '".$myUid."')";
		if ($conn->query($sql) === TRUE) {
					
			echo 1;

		} else {
			echo "Error: " . $sql . " " . $conn->error;
		}

 ?>