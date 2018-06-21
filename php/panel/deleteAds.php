<?php 

include '../conn.php';

$id = $_POST['id'];


$sql = "DELETE FROM ads WHERE id='".$id."' ";

	if ($conn->query($sql) === TRUE) {
	  echo 1;
	} else {
		echo "Error: " . $sql . " " . $conn->error;
	}

 ?>