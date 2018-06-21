<?php 

include 'conn.php';

$myUid = $_POST['myUid'];
$uidProfile = $_POST['uidProfile'];


			$sql = "INSERT INTO notifications (uidSen,uidRes,type,viewed,url) VALUES ('".$myUid."','".$uidProfile."','friend','0','profile.html?u=".$myUid."')";
			if ($conn->query($sql) === TRUE) {
				echo 1;
			} else {
				echo "Error: " . $sql . " " . $conn->error;
			}

 ?>