<?php 
error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);

header("Content-Type: text/html;charset=utf-8");

	include '../conn.php';

	$myUid = $_POST['myUid'];
	$uidP = $_POST['uidP'];

	$cons = "SELECT * FROM messages WHERE (uid1 = '".$myUid."' AND uid2 = '".$uidP."') OR (uid1 = '".$uidP."' AND uid2 = '".$myUid."')";
	$result = $conn->query($cons);
	

	if ($result->num_rows > 0) {

			$obj;

			while ($row = $result->fetch_assoc()) {
				$uidMessage = $row['uid1'];
				$message = $row['messages'];
				echo "<div class='{$uidMessage}'>{$message}</div>";
			}
		} else {
			echo 0;
		}


 ?>