<?php 

include '../conn.php';

$uidInput = $_POST['uidInput'];
$selectAdmin = $_POST['selectAdmin'];

	$sql = "UPDATE profiles SET type='".$selectAdmin."' WHERE uid='".$uidInput."'";

	if ($conn->query($sql) === TRUE) {
		echo 1;
	} else {
	    echo "Error deleting record: " . $conn->error;
	}

?>