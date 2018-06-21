<?php 

include 'conn.php';

$uid = $_POST['uid'];

$sql = "SELECT * FROM notifications WHERE uidRes='".$uid."' AND viewed='0'";
$result = $conn->query($sql);

if ($result->num_rows > 0) { 
	echo 1;
} else if ($result->num_rows == 0) {
	echo 2;
}

 ?>