<?php 

include '../conn.php';

$uid = $_POST['uid'];

$sql = "SELECT * FROM profiles WHERE type='1' AND uid = '".$uid."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) { 
	echo 1;
} else if ($result->num_rows == 0) {
	echo 2;
}

 ?>